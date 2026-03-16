function xepLoai(diem) {
    if (diem >= 8.5) {
  return "Giỏi";
    } else if (diem >= 7) {
    return "Khá";
    } else if (diem >= 5) {
  return "Trung bình";
    } else {
    return "Yếu";
}
}
  function tinhDiemTrungBinh(ds) {
    if (ds.length === 0) return 0;
    const tong = ds.reduce((sum, sv) => sum + sv.diem, 0);
    return (tong / ds.length).toFixed(2);
}
const dsSinhVien = [];
    const tbody = document.getElementById('ds');
    const thongke = document.getElementById('thongke');
    const hten = document.getElementById('hten');
    const diem = document.getElementById('diem');
    const btnThem = document.getElementById('them');
function renderTable() {
  tbody.innerHTML = '';

  if (filteredStudents.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5">Không có kết quả</td></tr>';
    return;
  }

  filteredStudents.forEach((sv, i) => {

    const tr = document.createElement('tr');

    if (sv.diem < 5) tr.classList.add('yeu');

    tr.innerHTML = `
      <td>${i + 1}</td>
      <td>${sv.hten}</td>
      <td>${sv.diem}</td>
      <td>${xepLoai(sv.diem)}</td>
      <td><button data-index="${i}" class="xoa">Xóa</button></td>
    `;

    tbody.appendChild(tr);

  });

}
    function themSV() {
        const ten = hten.value.trim();
        const d = parseFloat(diem.value);
        if (!ten) {
          alert('Họ tên không được để trống!');
          hten.focus();
          return;
        }
        if (isNaN(d) || d < 0 || d > 10) {
          alert('Điểm phải là số từ 0 đến 10!');
          diem.focus();
          return;
        }
        dsSinhVien.push({ hten: ten, diem: d });
        hten.value = '';
        diem.value = '';
        hten.focus();
        applyFilters();
      }

      btnThem.addEventListener('click', themSV);

      diem.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
          themSV();
        }
      });
      tbody.addEventListener('click', function(e) {
        if (e.target.classList.contains('xoa')) {
          const idx = +e.target.getAttribute('data-index');
          dsSinhVien.splice(idx, 1);
          applyFilters();
        }
      });
      let filteredStudents=[];
      let sortAsc=true;
      const searchInput=document.getElementById('timkiem');
      const loc = document.getElementById('loc');
      const sortDiem=document.getElementById('sortDiem');
      function applyFilters(){
        const keyword = searchInput.value.trim().toLowerCase();
        const loai = loc.value;
        filteredStudents = dsSinhVien.filter(sv => {
          const matchName = sv.hten.toLowerCase().includes(keyword);
          const matchLoai = loai === 'all' || xepLoai(sv.diem) === loai;
          return matchName && matchLoai;
        });
        filteredStudents.sort((a,b)=>{
        return sortAsc?a.diem-b.diem:b.diem-a.diem;
      });
      renderTable();
    }
      searchInput.addEventListener("input", applyFilters);
      loc.addEventListener("change", applyFilters);
      sortDiem.addEventListener("click", () => {
        sortAsc = !sortAsc;
        sortDiem.textContent = sortAsc ? "Điểm ▲" : "Điểm ▼";
        applyFilters();
});
applyFilters();