from pathlib import Path
import json,re
root=Path(__file__).resolve().parent.parent
source=(root/'JOURNAL_DRAFTS_KO.md').read_text(encoding='utf-8')
entries=json.loads((root/'journal-translations.json').read_text(encoding='utf-8'))
sections=re.findall(r'## \d{2}\. (.*?)(?=\n## |\n---|\Z)',source,re.S)
assert len(sections)==5
for entry,section in zip(entries,sections):
    title,body=section.split('\n',1)
    body=body.split('**이미지 방향**')[0].strip()
    body=body.removeprefix('**카드 소개**').strip()
    parts=[p.strip() for p in body.split('\n\n') if p.strip()]
    entry['ko']={'title':title.strip(),'summary':parts[0],'paragraphs':parts[1:]}
    assert len(entry['ko']['paragraphs'])>=5
(root/'journal-data.js').write_text('export const journals = '+json.dumps(entries,ensure_ascii=False,indent=2)+';\n',encoding='utf-8')
print('Prepared five full-length journals in VI / KR / EN.')
