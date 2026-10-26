# 벤송점 로고 이미지 재생성 — 2026-10-26

현재 벤송점 사진을 편집 대상으로, `assets/heritage.webp` 상단의 실제 브랜드 마크를 글자 형태 참고로 사용합니다. 작은 크기와 벽과 비슷한 은은한 색을 유지하며 얇은 명조형 로고를 굵고 각진 브랜드 형태로 교정합니다. 인테리어·직원·구도·조명은 유지하는 방향입니다.

최종 적용 경로는 `assets/store-tourist.webp`이며 1376×768px와 WebP quality 90을 유지합니다. 생성 PNG 원본은 `assets/source/`에 보관합니다. 내장 이미지 생성 도구를 사용했습니다.

## 최종 생성 프롬프트

선택한 생성 결과는 `assets/source/store-tourist-v6.png`에 보존했습니다. `python scripts/prepare_bensong_v6.py`로 원본을 읽어 기존 1376×768px WebP 경로에 다시 적용할 수 있습니다. 기존 v5 PNG도 그대로 보관합니다.

적용 후 모바일에서 중앙 크롭 때문에 첫 글자가 잘리는 것도 확인했습니다. `section-rework.css`에서 벤송점 사진만 `object-position:25% center`로 표시해 로고가 프레임 안에 들어오도록 조정했습니다. 사진과 프레임의 크기는 유지합니다.

검증: 콘텐츠·DOM 1004개, 저널 115개, 스크롤 12개, Chrome 경험 370개·컬렉션 144개·브랜드/문의 337개 통과. 매장 캡처는 `artifacts/experience-shops-{1440|768|390}.png`입니다.

```text
Use case: precise-object-edit / identity-preserve. Edit reference image 1, the HANJUNGSUN Ben Song store interior. Reference image 2 is ONLY the exact brand-logotype identity reference (the bold black Chinese logotype at its top), NOT a reference for interior design. Produce a fresh photorealistic 1376x768 landscape photograph preserving reference 1's composition, camera angle, all interior architecture, two workers, clothing, shelves and white ceramics, gift boxes, glass rice-cake counter, paper lanterns, plants, daylight, arched doorway and street view. The only intended change is the small brand mark on the UPPER LEFT plaster wall. Remove the old thin serif/generic typeface mark and replace it with the actual bold, angular, compact, sans-serif-style HANJUNGSUN logotype from reference 2: EXACT THREE CHARACTERS '韓貞仙' on one horizontal line; directly below, exact widely spaced sans-serif 'HANJUNGSUN', with almost the same total width as the character line. Carefully preserve the distinct structure of each character, particularly 貞 and 仙. No Korean Hangul lettering, no Dragon Bridge drawing, no extra slogan or decorative mark. EXTREMELY IMPORTANT restrained scale and color: the ENTIRE mark including English must stay roughly within x=80..176 and y=185..242 of this 1376x768 image, similar tiny size to reference 1, NEVER a large store sign. Use a softly printed matte warm sand/taupe pigment only slightly darker than the beige plaster, very low contrast and nearly tone-on-tone, subtle like a quiet wall stamp. Match the existing faintness of reference 1, not the high contrast of reference 2. No dark bronze, no metallic letters, no black sign, no raised thick letters, no glow or backlight, no spotlight. Crisp correct shapes within that muted small mark; do not fake the spelling. Preserve all other scene details and realistic textures. Do not change staff identities, replace products, add watermark, border or extraneous text.
```
