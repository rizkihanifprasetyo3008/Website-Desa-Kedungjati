const dashboard = document.getElementById("dashboard");
const profildesa = document.getElementById("profildesa");
const perangkatdesa = document.getElementById("perangkatdesa");
const pelayanan = document.getElementById("pelayanan");
const datadesa = document.getElementById("datadesa");

//   profile desa onclick event add class active
profildesa.addEventListener("click", () => {
  profildesa.classList.add("active");
  dashboard.classList.add("active");
  perangkatdesa.classList.remove("active");
  pelayanan.classList.remove("active");
  datadesa.classList.remove("active");
});
//  perangkat desa onclick event add class active
perangkatdesa.addEventListener("click", () => {
  perangkatdesa.classList.add("active");
  profildesa.classList.remove("active");
  dashboard.classList.add("active");
  datadesa.classList.remove("active");
  pelayanan.classList.remove("active");
});
//  pelayanan onclick event add class active
pelayanan.addEventListener("click", () => {
  pelayanan.classList.add("active");
  profildesa.classList.remove("active");
  dashboard.classList.add("active");
  datadesa.classList.remove("active");
  perangkatdesa.classList.remove("active");
});
// dashboard onclick event add class active
dashboard.addEventListener("click", () => {
  dashboard.classList.remove("active");
  profildesa.classList.remove("active");
  perangkatdesa.classList.remove("active");
  pelayanan.classList.remove("active");
  datadesa.classList.remove("active");
});
// data desa onclick event add class active
datadesa.addEventListener("click", () => {
  datadesa.classList.add("active");
  profildesa.classList.remove("active");
  dashboard.classList.add("active");
  perangkatdesa.classList.remove("active");
  pelayanan.classList.remove("active");
});


// agama lainnya

const agamaselect = document.getElementById("agama");
const additionalinput = document.getElementById("additional-input");
const agamalainnya = document.getElementById("agamalainnya");

agamaselect.addEventListener("change", function() {
  if (agamaselect.value == "lainnya") {
    additionalinput.style.display = "block";
    agamalainnya.setAttribute("required", "required");
  } else {
    additionalinput.style.display = "none";
    agamalainnya.removeAttribute("required");
  }
});


 // validasi form
//  deklarasi semua variabel yang dibutuhkan
    //  nama lengkap
 const nama_lengkap_box = document.getElementById("nama_lengkap_box");
 const input_nama_lengkap = document.getElementById("nama_perangkat");
 const validasi_nama_lengkap = document.getElementById("validasi_nama_lengkap");
 // jabatan
 const jabatan_box = document.getElementById("jabatan_box");
  const input_jabatan = document.getElementById("jabatan");
  const validasi_jabatan = document.getElementById("validasi_jabatan");
  // tanggal
  const tanggal_box = document.getElementById("tanggal_box");
  const input_tanggal = document.getElementById("tanggal_lahir");
  const validasi_tanggal = document.getElementById("validasi_tanggal");
  // tempat lahir
  const tempatlahir_box = document.getElementById("tempatlahir_box");
  const input_tempatlahir = document.getElementById("ttl");
  const validasi_tempatlahir = document.getElementById("validasi_tempatlahir");
  // jenis kelamin
  const jeniskelamin_box = document.getElementById("jeniskelamin_box");
  const input_jeniskelamin = document.getElementById("jeniskelamin");
  const validasi_jeniskelamin = document.getElementById("validasi_jeniskelamin");
// agama
  const agama_box = document.getElementById("agama_box");
  const input_agama = document.getElementById("agama");
  const validasi_agama = document.getElementById("validasi_agama");
  // pendidikan
  const pendidikan_box = document.getElementById("pendidikan_box");
  const input_pendidikan = document.getElementById("pendidikan_terakhir");
  const validasi_pendidikan = document.getElementById("validasi_pendidikan");
  // alamat
  const alamat_box = document.getElementById("alamat_box");
  const input_alamat = document.getElementById("alamat_lengkap");
  const validasi_alamat = document.getElementById("validasi_alamat");
  
  const submit_button = document.getElementById("submit_button");

  // jenis jabatan
  const jenisjabatan_box = document.getElementById("jenisjabatan_box");
  const input_jenisjabatan = document.getElementById("detail_jabatan");
  const validasi_jenisjabatan = document.getElementById("validasi_jenisjabatan");

  // photo
  const photo2_box = document.getElementById("photo2_box");
  const input_photo = document.getElementById("photo");
  const validasi_photo = document.getElementById("validasi_photo");


  
  // function-function validasi
  function validasinama() {
    if (input_nama_lengkap.value == "" || input_nama_lengkap.value.match(/[0-9]/g)) {
    validasi_nama_lengkap.classList.add("active");
    nama_lengkap_box.classList.add("active");
  }
  else{
    validasi_nama_lengkap.classList.remove("active");
    nama_lengkap_box.classList.remove("active");
  }
}
function validasijabatan() {
  if (input_jabatan.value == "") {
    validasi_jabatan.classList.add("active");
    jabatan_box.classList.add("active");
  }
  else{
    validasi_jabatan.classList.remove("active");
    jabatan_box.classList.remove("active");
  }
}
function validasitempatlahir(){
  if (input_tempatlahir.value == "") {
    validasi_tempatlahir.classList.add("active");
    tempatlahir_box.classList.add("active");
  }
  else{
    validasi_tempatlahir.classList.remove("active");
    tempatlahir_box.classList.remove("active");
  }
}
function validasijeniskelamin(){
  var selectedoption = input_jeniskelamin.value;
  if (selectedoption == "--Pilih Jenis Kelamin--") {
    validasi_jeniskelamin.classList.add("active");
    jeniskelamin_box.classList.add("active");
  }
  else{
    validasi_jeniskelamin.classList.remove("active");
    jeniskelamin_box.classList.remove("active");
  }
}
function validasiagama(){
  var selectedagama = input_agama.value;
  if (selectedagama == "--Pilih Agama--") {
    validasi_agama.classList.add("active");
    agama_box.classList.add("active");
  }
  else{
    validasi_agama.classList.remove("active");
    agama_box.classList.remove("active");
  }
}
function validasipendidikan(){
  var selectedpendidikan = input_pendidikan.value;
  if (selectedpendidikan == "--Pilih Pendidikan--") {
    validasi_pendidikan.classList.add("active");
    pendidikan_box.classList.add("active");
  }
  else{
    validasi_pendidikan.classList.remove("active");
    pendidikan_box.classList.remove("active");
  }
}

function validasijenisjabatan(){
  var selectedjenisjabatan = input_jenisjabatan.value;
  if (selectedjenisjabatan == "--Pilih Jenis Jabatan--") {
    validasi_jenisjabatan.classList.add("active");
    jenisjabatan_box.classList.add("active");
  }
  else{
    validasi_jenisjabatan.classList.remove("active");
    jenisjabatan_box.classList.remove("active");
  }
}
function validasiphoto(){
  if (input_photo.value == "") {
    validasi_photo.classList.add("active");
    photo2_box.classList.add("active");
  }
  else{
    validasi_photo.classList.remove("active");
    photo2_box.classList.remove("active");
  }
}

// eksekusi function validasi
// add perangkat desa
  submit_button.addEventListener("click", function(e) {
    e.preventDefault();
    validasinama();
    validasijabatan();
    validasitempatlahir();
    validasijeniskelamin();
    validasiagama();
    validasipendidikan();
    validasijenisjabatan();
    validasiphoto();

  if(input_nama_lengkap != "" && input_jabatan != "" && input_tempatlahir != "" && input_jeniskelamin != "" && input_agama != "" && input_pendidikan != "" && input_jenisjabatan != "" && input_photo != ""){
    document.getElementById("form_perangkatdesa").submit();
  }
  });




