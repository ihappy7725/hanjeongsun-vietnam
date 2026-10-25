# 에셋 및 출처 관리

## 2026-10-26 홈·한국 제품 이미지 통일

내장 이미지 생성 도구로 홈 `assets/vietnam-four-hero-v3.webp` 1장과 한국 `assets/collection/*-pair-v3.webp` 6장을 제작했습니다. 기존 한국 제품의 속·색을 유지하고 베트남 승인 제품을 태그·크기·배치 기준으로 삼았습니다. 입력 사진과 최종 프롬프트는 `image-plan-20261026.json`, `IMAGE_PROMPTS_20261026.md`, 선택 결과는 `image-selected-20261026.json`입니다. PNG 원본은 `assets/collection/source/`, 재처리는 `scripts/prepare_images_20261026.py`입니다. 생성 컷은 실제 촬영 원본과 구분합니다. 기존 이미지 파일은 이력으로 보관합니다.

브랜드와 CONTACT에는 PDF 페이지 전체나 설명이 박힌 이미지 대신 `gallery/02,03,07.webp`와 `craft-dark.webp`의 사진 영역만 사용합니다. 브랜드 구성과 공식 문의 출처는 `BRAND_CONTACT_DESIGN.md`에 기록했습니다.

추가 메뉴 확정: 한국에서 쑥 생딸기를 제외해 베트남 4종·한국 6종으로 정리했습니다. 제외한 제품의 생성 원본은 이력으로 보관하며 고객용 제품 목록에는 표시하지 않습니다. 새 이미지 생성이나 남은 제품 사진의 변경은 없습니다.

## 확정 베트남 4종 — 2026-10-25

- 사용자 제공 JPG 8장(각 제품 포장·단면)을 수정 없이 `assets/collection/confirmed-20261025/`에 복사했습니다. 최신 제품 구성의 기준이며 이전의 5종·과일+잼 구상보다 우선합니다.
- 베트남은 망고스틴·망고 요거트·꿀 레드용과·두리안 4종입니다. 망고스틴은 첨부 단면의 요거트층을 유지하고, 용과는 잼 대신 첨부 사진의 호박색 꿀층을 기준으로 했습니다. 한국의 망고 요거트는 베트남으로 이동했습니다.
- 내장 이미지 생성 도구로 포장과 단면을 한 장면으로 담은 `assets/collection/*-pair-v2.webp` 4장을 제작했습니다. 1536×1024px, 선택용은 `*-thumb-v2.webp` 360×240px입니다.
- 새 홈 이미지 `assets/vietnam-four-hero-v2.webp`는 1448×1086px이며, 확정 단면 4장과 기존 홈 이미지의 나열 구도를 참조했습니다. PNG 원본은 `assets/collection/source/`입니다.
- 저널 원물 사진도 망고스틴·망고·레드용과·두리안만 담은 `assets/journal/tropical-fruits-v2.webp`로 별도 생성했습니다. PNG 원본은 `assets/journal/source/`입니다. 홈 제품 컷과 같은 이미지를 재사용하지 않습니다.
- 전체 6장 프롬프트와 기준은 `CONFIRMED_PRODUCT_IMAGE_PROMPTS.md`, 입력 매핑은 `confirmed-image-plan.json`, 선택 결과 경로는 `confirmed-generated-paths.json`, 웹 최적화는 `scripts/prepare_confirmed_images.py`입니다. 생성 이미지는 제공 사진 기반의 재구성 결과이며 실제 촬영 파일과 구분해 관리합니다.

## 다낭 선물 패키지 생성 이미지 — 2026-10-24

- 내장 이미지 생성 도구로 새 디자인 이미지 2장을 제작했습니다. 제공된 기존 패키지 이미지는 브랜드 소재·포장의 참고로 사용했습니다. 실제 제조·촬영 기록이 아닌 디자인 콘셉트 자료입니다.
- `assets/gifting/danang-gift-box-v1.webp`: 다낭 용다리와 연꽃 풍경이 그려진 상자와 6개의 한지 포장 제품.
- `assets/gifting/danang-bojagi-v1.webp`: 비취·옅은 금빛 한국식 보자기, 연꽃 장식과 다낭 풍경 카드.
- 두 웹 이미지는 1536×1024px, 생성 PNG 원본은 `assets/gifting/source/`, 최종 프롬프트는 `GIFTING_IMAGE_PROMPTS.md`에 보관합니다. 재처리 스크립트는 `scripts/prepare_gifting_images.py`입니다.
- 갤러리의 원본은 유지하고 `assets/gallery-layout.json`의 `visibleInset`에 측정한 흰 페이지 가장자리를 기록했습니다. `scripts/refine_gallery_and_world.py`로 갤러리를 재생성했다면 `python scripts/audit_gallery_edges.py`를 마지막에 실행해 표시 크롭을 갱신합니다.

## 컬렉션 제품 컷 — 2026-10-24

- 내장 이미지 생성 도구로 ‘한지 포장 제품 + 같은 제품의 단면’ 구도 13종을 제작했습니다. 실제 제품 촬영 기록이 아닌 카탈로그 기반의 생성 이미지입니다. 한국 제품의 과일·앙금·요거트·떡 구성과 포장색을 기준으로 재제작했으며 원본 카탈로그와 픽셀·질감까지 동일한 복제본은 아닙니다.
- 한국 8종: 생딸기, 초코딸기, 쑥 생딸기, 생딸기 요거트, 통귤, 골드 파인애플, 망고 요거트, 멜론 요거트. 베트남 5종: 망고, 리치, 용과, 스타프루트, 두리안. 홍시·무화과는 이번 화면 목록에서 제외합니다.
- 베트남 제품은 각 과일의 과육 + 같은 과일의 잼 + 찹쌀피입니다. 요거트·우유 크림·팥앙금 층은 추가하지 않습니다. 사진만으로 실제 배합 비율이나 생산·공급을 검증했다고 주장하지 않습니다.
- 최종 이미지: `assets/collection/*-pair-v1.webp` (1536×1024px). 선택용 이미지: `assets/collection/*-thumb-v1.webp` (360×240px). PNG 원본: `assets/collection/source/`.
- 기준 자료: 제공된 `reference/33.png`, `34.png`, `35.png`, `36.png`. 선택 원본·정확한 프롬프트: `collection-image-plan.json`, `COLLECTION_IMAGE_PROMPTS.md`. 재생성: `scripts/prepare_collection_images.py`.
- 쑥·파인애플·스타프루트 태그는 생성 후 한글 오자를 별도로 교정했습니다. 최종 PNG 원본과 WebP를 일치시켰습니다.

## 저널 전용 생성 이미지 — 2026-10-24

내장 이미지 생성 도구로 서로 다른 장면 5장을 제작했습니다. 실제 수확 현장·다낭 촬영을 기록한 자료가 아닌 글의 분위기를 표현하는 생성 이미지입니다. 기존 홈페이지 사진을 재사용하지 않습니다.

| 저널 | 새 대표 이미지 | 콘셉트 |
|---|---|---|
| 계절을 빚는 마음 | `assets/journal/seasons-harvest-v1.webp` | 딸기를 수확하는 손길 |
| 다낭의 오후에, 한정선 | `assets/journal/danang-afternoon-v1.webp` | 한강과 용다리, 열대 나무 그늘 |
| 열대의 계절을 한 입에 | `assets/journal/tropical-fruits-v1.webp` | 망고·리치·두리안·용과·스타프루트 |
| 다낭을 담아 건네는 선물 | `assets/journal/gift-ritual-v1.webp` | 보자기의 매듭을 묶는 손길 |
| 한 입에서 시작되는 새로운 만남 | `assets/journal/new-encounters-v1.webp` | 바닷가에서 차를 나누는 만남 |

원본 PNG는 `assets/journal/source/`, 최종 프롬프트는 `JOURNAL_THUMBNAIL_PROMPTS.md`에 보관합니다. 1536×1024px WebP 5장 합계 약 1.26MB입니다. 각 홈 카드와 같은 글의 상세 대표 이미지에 연결했으며 본문 보조 사진은 유지합니다. `scripts/prepare_journal_thumbnails.py`로 원본에서 웹 에셋과 원본 데이터를 재생성한 뒤 `python scripts/prepare_journals.py`를 실행합니다.

## 최근 프레임·지도 수정

- 갤러리 최종 원본 순서: `19,18,44,27,28,21,43,20,26,24,23,29.png`. 원본 전체를 확인하고 10:7 비율로 유지했습니다. 잘리는 구도를 개선하기 위해 03·08·09번 에셋을 교체했습니다.
- 프레임 전체 이미지와 source 매핑은 `assets/gallery-layout.json`, 검토 연락시트는 `reference/gallery-framing-audit.jpg`입니다.
- 세계지도는 Natural Earth 육지 데이터 https://www.naturalearthdata.com/downloads/110m-physical-vectors/110m-land/ 및 공식 저장소 `ne_110m_land.geojson`에서 변환했습니다. 국가 경계가 없는 외곽선만 사용하고 남극을 제외했습니다. 사용 지리 데이터는 `assets/world-land.geojson`에 보존했습니다.
- 이 변경은 `scripts/refine_gallery_and_world.py`로 재생성합니다. 이전 자료 준비 스크립트 뒤에 실행해야 최종 사진 선택과 세계지도 윤곽선이 유지됩니다.
- 사용자의 후속 요청으로 프로젝트·시연 안내를 화면에서 제거했습니다. 이 문서에 기록된 매장·주소·연락처·제품의 자료 성격은 동일하며, 가상 자료를 실제 운영 정보로 검증한 것은 아닙니다.

## 2026-10-24 조정

- 기존 한국 제품 4종을 원본 카탈로그에서 확대 없이 다시 추출했습니다. 강제 투명화와 재확대를 없애고 무손실 WebP로 저장했습니다. 실제 원본 컷 크기는 245~265px 수준이며, 화면에 더 작게 표시하는 것으로 개선했습니다. 자세한 한계와 교체안은 `COLLECTION_IMAGE_QUALITY.md`를 참조하세요.
- 패키징 영역에서는 `four-flavors.webp`를 제거하고 `gifting.webp`, `gift-table.webp` 두 장만 사용합니다. 파일 자체는 다른 자료 이력과 호환성을 위해 보관합니다.
- 저널 대표·보조 이미지는 `journal-data.js`에서 관리합니다. 제공 에셋의 실제 사진 부분과 프로젝트 콘셉트 이미지를 내용에 맞게 연결했습니다.

## 2026-10-23 교체 자료

- 새 `한정선 디자인 이미지.zip` 29개 파일을 연락시트로 확인. 사진만 있는 12개 파일을 `assets/gallery/01.webp`~`12.webp`로 최적화해 사용합니다. 사용 순서는 원본 `19, 18, 20, 27, 28, 21, 43, 44, 45, 24, 23, 29.png`입니다. 문구·도표·카탈로그 여백이 포함된 원본은 콜라주에서 제외했습니다.
- 새 `Gemini_Generated_Image_uwxfb2uwxfb2uwxf.zip`의 파일 5개를 확인. `assets/mango-cut.webp`, `lychee-cut.webp`, `durian-cut.webp`, `dragonfruit-cut.webp`, `starfruit-cut.webp`로 사용합니다. 제공 그림을 수정 생성하지 않고 같은 캔버스 크기로 맞춰 최적화했습니다. 원형으로 자르지 않고 전체 실루엣을 보존합니다.
- 베트남 지도는 Natural Earth 1:10m로 교체. https://www.naturalearthdata.com/downloads/10m-cultural-vectors/10m-admin-0-countries/ 및 해당 공식 저장소의 `ne_10m_admin_0_countries.geojson` 사용. 변환 경로는 `maps.json`, 사용한 베트남 지리 원본은 `vietnam-boundary.geojson`에 보존합니다. 세계지도는 기존 1:110m 유지.
- 자료 준비는 `scripts/prepare_revision_assets.py`로 수행했습니다. 원본 ZIP을 `reference/design-v2/`, `reference/vietnam-v2/`에 추출한 뒤 실행합니다. 기존 `prepare_assets.py`를 다시 실행하면 지도는 구버전으로 돌아가므로 이 수정 스크립트를 마지막에 실행해야 합니다.
- 사용자 요청에 따라 매장명·주소·운영시간은 가상 설정으로 구성했습니다. Lối Sen, Bến Sông, Vườn Nhiệt Đới, Lối Cọ는 프로젝트에서 만든 장소명이며 실제 위치를 검증한 자료가 아닙니다. 연락처는 `+84 (0)236 XXX 0101/0102` 예시 형식입니다. 하단 시연 안내에서 주소·연락처도 가상임을 명시합니다.

아래는 최초 구현 당시의 에셋 기록입니다. 이번 교체 자료가 같은 영역의 기존 기록에 우선합니다.

사용자가 제공한 파일을 본 프로젝트의 시연 목적으로 활용했습니다. 외부 공개 또는 상업 이용 전 브랜드·사진·폰트의 이용 권한을 확인해야 합니다.

## 제공 이미지

| 파일 | 사용 영역 | 성격 |
|---|---|---|
| 단면.png | 히어로 | 베트남 현지화 제품 콘셉트 |
| 패키지.png | 갤러리, 패키징, 스토리 | 다낭 패키지 콘셉트 |
| 패키지&찹쌀떡.png | 갤러리, 패키징 | 현지화 연출 콘셉트 |
| 4가지맛.png | 패키징 슬라이드 | 현지화 포장 콘셉트 |
| 매장1.png | 관광지형 매장 | 제공된 AI 스타일 콘셉트 이미지, 실매장 사진으로 검증하지 않음 |
| 매장2.png | 백화점형 매장 | 제공된 AI 스타일 콘셉트 이미지, 실매장 사진으로 검증하지 않음 |
| 망고·리치·두리안·용과·스타.png | 베트남 제품 컬렉션 | 프로젝트 신제품 콘셉트, 실제 판매 제품 아님 |
| ZIP 4.png, 5.png | 제작 과정 | 기존 브랜드 레퍼런스 |
| ZIP 14.png, 16.png | 한국 매장, 직원 | 기존 브랜드 레퍼런스 |
| ZIP 33.png | 생딸기 제품 누끼 | 제공 카탈로그의 실제 기존 제품 소개 |
| ZIP 36.png | 무화과, 생딸기·망고 요거트 누끼 | 제공 카탈로그의 실제 기존 제품 소개 |
| ZIP 46.png | 선물 갤러리 | 기존 브랜드 패키지 레퍼런스 |

ZIP 전체 48개 이미지를 연락시트로 검토했습니다. `reference/`는 원본 보관 및 검토용이며 배포하지 않습니다. 최적화 WebP와 제품 누끼는 `assets/`에 있습니다. `prepare_assets.py`가 사용자의 원본 경로에서 재생성합니다. 제품 컷은 제공 카탈로그의 해상도를 따르므로 고해상도 원본으로 교체하면 품질이 개선됩니다.

## 폰트

- 제공 `fonts.css`의 ChosunIlboMyungjo, Pretendard 선언을 정리했습니다. 한국어 제목과 본문에 사용합니다.
- 원본의 `<style>`, `<uniquifier>`, `<weight>`는 CSS에서 유효하지 않아 제거했습니다.
- Playfair Display: 영문 장식 제목. Be Vietnam Pro: 베트남어와 UI. 두 서체 모두 Google Fonts 원본 파일을 로컬 저장했습니다.
- 성조 포함 베트남어 문장은 Be Vietnam Pro 또는 Playfair Display 전체 서체로 렌더링하며 성조 문자만 분리하는 범위 지정은 하지 않습니다.
- 폰트 출처: https://fonts.google.com/specimen/Be+Vietnam+Pro , https://fonts.google.com/specimen/Playfair+Display , 제공 CSS의 jsDelivr 프로젝트 링크. 배포 파일은 `assets/fonts.css`, `assets/fonts/`입니다.

## 지도

Natural Earth 1:110m 국가 경계 GeoJSON을 SVG 경로로 변환했습니다. 소스: https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_110m_admin_0_countries.geojson . Natural Earth 지리 데이터는 public domain입니다. 소형 화면의 개괄 지도이며 정밀한 행정·경계 안내용이 아닙니다.

다낭 마커는 도시 영역 강조용이며 두 실제 매장의 좌표를 뜻하지 않습니다. 세계지도는 한국(브랜드 본국), 베트남(가상 시나리오), 미래 비전(미확정)을 별도 색상·범례로 구분합니다.

## 공식 참고 자료

- 브랜드 철학 및 공식 채널: https://hanjungsun.co.kr/about , https://hanjungsun.co.kr/HOME
- 공식 Instagram 링크는 공식 홈페이지에서 확인한 https://www.instagram.com/han.jung.sun/ 을 사용했습니다.
- 파트너십은 공식 홈페이지 협업제안 링크 https://hanjungsun.co.kr/50 으로 연결합니다. 자동 문서 수집에서는 403으로 상세 내용을 확인하지 못했습니다.
- 구조·스크롤 레퍼런스: https://www.warabimochi-kamakura.com/ . 텍스트·페이지 구조를 확인했으며 브라우저 연결 부재로 실제 애니메이션은 직접 관찰하지 못했습니다. 일본 브랜드의 이미지·로고·문구는 사용하지 않았습니다.
- 뉴스는 브랜드 소개 출처 또는 프로젝트 에디토리얼이며 언론 보도로 가장하지 않습니다.
