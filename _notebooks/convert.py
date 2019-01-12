from nbconvert import MarkdownExporter
import os

self_path = os.path.dirname(os.path.abspath(__file__))
src_path = os.path.join(self_path, 'src')
dist_path = os.path.join(self_path, 'dist')

files = [f for f in os.listdir(src_path) if os.path.isfile(os.path.join(src_path, f))]

print(os.listdir(src_path))

target_notebooks = list(map(
  lambda f: {
    'name': f,
    'path': os.path.join(src_path, f)
  },
  list(filter(
    lambda f: f.endswith('.ipynb') and not f.endswith('.draft.ipynb'),
    files
  ))
))

md_exporter = MarkdownExporter()
# md_exporter.template_file = 'basic'

for nb in target_notebooks:
  nb['body'], nb['resources'] = md_exporter.from_file(nb['path'])

  print(nb['resources'])

  pre, _ = os.path.splitext(nb['name'])
  nb['out_path'] = os.path.join(dist_path, pre + '.md')
  os.makedirs(dist_path, exist_ok=True)
  with open(nb['out_path'], 'w') as out:
    out.write(nb['body'])

