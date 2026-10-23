# baogiado.github.io

Personal page của Bao (Billy) Do. HTML/CSS/JS thuần, không cần Jekyll hay build step.

```
index.html              Home: ảnh, hàng logo quá trình, tên và giới thiệu
projects.html           Projects
publications.html       Publications, 2 tab Journal articles / Conferences
news.html               News, nhóm theo năm
cv.html                 CV: đọc ngay trên trang, không bôi đen/copy/in được (vẽ bằng PDF.js trong assets/js/cv.js)
assets/js/data.js       Menu, các nút footer (SITE), publications và news: chỉ cần sửa file này khi cập nhật
assets/js/site.js       Dựng menu + footer cho mọi trang, render dữ liệu, tab, nút Cite/Copy, đổi theme sáng/tối
assets/css/site.css     Giao diện; màu nằm ở đầu file (--bar: thanh menu, --teal: màu logo YunTech, --yun: màu cam của chữ "Yun" cho các đường kẻ)
assets/img/logos/       Logo cho hàng timeline
assets/img/thumbs/      Ảnh thumbnail cho paper (không bắt buộc)
assets/cv/              Đặt file CV PDF ở đây
.nojekyll               Báo GitHub Pages bỏ qua Jekyll
```

## Cần làm trước khi push

- [x] `assets/cv/Bao_Do_CV.pdf`: file CV mà trang cv.html hiển thị. Khi cập nhật CV, thay file này bằng file mới cùng tên.
- [ ] `assets/img/logos/uit.png`: thêm logo UIT (nền trong suốt, vuông, khoảng 200×200). Chưa có file thì trang hiện chữ "UIT".
- [ ] `index.html`: điền năm học ở UIT (đang ghi `TODO – TODO`), kiểm tra lại năm bắt đầu ở YunTech (đang ghi 2025)
- [ ] `assets/js/data.js`: điền danh sách tác giả cho 4 bài đang ghi `TODO: author list` (PACLIC 2026, MAPR 2026, BIGS 2023, NICS 2022), viết theo dạng APA `"Họ, T. Đ."`
- [ ] `assets/js/data.js`: khi PACLIC có link chính thức, thêm `links: { paper: "...", code: "..." }` và đổi badge `To appear`

Tìm nhanh mọi chỗ còn thiếu: `grep -rn TODO .`

## Sửa menu hoặc nút ở footer

Mở `assets/js/data.js`, sửa `SITE.nav` (menu) hoặc `SITE.profiles` (các nút Email, Google Scholar, GitHub, LinkedIn, ORCID ở footer). Tên icon lấy ở https://icons.getbootstrap.com.

## Thêm paper hoặc tin mới

Mở `assets/js/data.js`, copy một object có sẵn rồi sửa. Bài tự vào đúng tab và đúng năm.
Màu badge đi theo hệ xếp hạng: `core`, `wos`, `sjr`, `abdc`, `scopus`; `note` là badge xám cho TREO, Workshop, Under review…

## Thêm một mốc vào hàng logo

Trong `index.html`, copy một `<li>` trong `<ol class="journey">`, bỏ logo vào `assets/img/logos/`.
Thứ tự: mới nhất bên trái. Mốc đang diễn ra thì thêm `class="now"`.

## Xem thử trên máy

```
python -m http.server 8000
```
rồi mở http://localhost:8000

## Thay trang Jekyll cũ

```
git checkout -b old-jekyll && git push origin old-jekyll   # giữ bản cũ trên một nhánh riêng
git checkout master
git rm -r -q .                                              # xoá file Jekyll cũ khỏi master
# copy toàn bộ nội dung folder này vào repo (nhớ cả file .nojekyll)
git add -A && git commit -m "Redesign personal page" && git push
```
GitHub Pages cập nhật sau khoảng 1 phút.
