"""Preview static presentations on localhost. Research and hidden files stay private."""
import argparse, base64, json
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import unquote, urlsplit
ROOT=Path(__file__).resolve().parents[2]
parser=argparse.ArgumentParser()
parser.add_argument('--port',type=int,default=8765)
parser.add_argument('--capture',action='store_true',help='Enable local artifact capture for authoring validation.')
args=parser.parse_args()
class Handler(SimpleHTTPRequestHandler):
    def __init__(self,*a,**kw): super().__init__(*a,directory=str(ROOT),**kw)
    def do_GET(self):
        parts=Path(unquote(urlsplit(self.path).path)).parts
        if any(p.startswith('.') or p=='research' for p in parts): self.send_error(404); return
        super().do_GET()
    def do_POST(self):
        if not args.capture or self.path!='/__capture': self.send_error(404); return
        origin=self.headers.get('Origin','')
        if origin and origin not in (f'http://127.0.0.1:{args.port}',f'http://localhost:{args.port}'):
            self.send_error(403); return
        length=int(self.headers.get('Content-Length','0'))
        if not 0<length<40_000_000: self.send_error(413); return
        try:
            body=json.loads(self.rfile.read(length))
            name=body['name']
            if not isinstance(name,str) or '/' in name or '\\' in name or not name.endswith(('.png','.pdf','.json')):
                raise ValueError('Unsupported artifact name')
            data=base64.b64decode(body['data'],validate=True)
            if name.endswith('.pdf'):
                if name!='mark-my-words.pdf' or not data.startswith(b'%PDF'): raise ValueError('Invalid PDF')
                target=ROOT/'workshops/ai-watermarking/exports'/name
            else:
                target=ROOT/'workshops/ai-watermarking/research/build'/name
            target.parent.mkdir(parents=True,exist_ok=True)
            target.write_bytes(data)
        except (ValueError,KeyError,TypeError): self.send_error(400); return
        self.send_response(200); self.send_header('Content-Type','application/json'); self.end_headers()
        self.wfile.write(json.dumps({'saved':name,'bytes':len(data)}).encode())
    def log_message(self,*a): pass
print(f'Preview: http://127.0.0.1:{args.port}/workshops/ai-watermarking/slides/',flush=True)
ThreadingHTTPServer(('127.0.0.1',args.port),Handler).serve_forever()
