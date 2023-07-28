const express = require('express');
const router = express.Router();
const db_kedungjati = require('../database/connection');
const multer = require('multer');





// routes
// halaman client
router.get('/', (req, res) => {
    // res.render('index', {layout: 'include/main-layout', title: 'Desa Kedungjati'});
    db_kedungjati.query('SELECT * FROM galeri_desa', (error, resultsGaleri) => {
        if (error) throw error;
        db_kedungjati.query('SELECT * FROM kepaladesa', (error, resultsKepaladesa) => {
            if (error) throw error;
            db_kedungjati.query('SELECT * FROM organisasi_desa', (error, resultsOrganisasi) => {
                if (error) throw error;

                res.render('index', {
                    layout: 'include/main-layout',
                    title: 'Desa Kedungjati',
                    galeri: resultsGaleri,
                    kepala_desa: resultsKepaladesa,
                    organisasi: resultsOrganisasi
                });
            });
        });
    })
})
router.get('/visimisi', (req, res) => {
    db_kedungjati.query('SELECT * FROM visi', (error, resultsVisi) => {
        if (error) throw error;
        
        db_kedungjati.query('SELECT * FROM misi', (error, resultsMisi) => {
            if (error) throw error;

            res.render('visimisi', {
                layout: 'include/main-layout',
                title: 'Visi Misi Desa',
                visi: resultsVisi,
                misi: resultsMisi
            }); 
        });
    });
});
router.get('/profilkades',(req,res) => {
    db_kedungjati.query('SELECT * FROM kepaladesa', (error, resultsKepaladesa) => {
        if (error) throw error;
        db_kedungjati.query('SELECT * FROM riwayatpendidikankades', (error, resultsrpkades) => {
            if (error) throw error;
            db_kedungjati.query('SELECT * FROM pekerjaankades', (error, resultsrppkades) => {
                if (error) throw error;
                
                res.render('profilkades', {
                    layout: 'include/main-layout',
                    title: 'Profil Kepala Desa',
                    kepala_desa: resultsKepaladesa,
                    rpkades: resultsrpkades,
                    rppkades: resultsrppkades
                });
            });
        });
    });
});
router.get('/profilpedes',(req,res) => {
    // select perangkatdesa from database where jabatan = 'Sekretaris Desa'
    db_kedungjati.query('SELECT * FROM perangkatdesa WHERE detail_jabatan = "sekretaris"', (error, resultsSekdes) => {
        if (error) throw error;
        // select perangkatdesa from database where detail jabatan = 'kasi'
        db_kedungjati.query('SELECT * FROM perangkatdesa WHERE detail_jabatan = "Kasi"', (error, resultsKasi) => {
            if (error) throw error;
            // select perangkatdesa from database where detail jabatan = 'kadus'
            db_kedungjati.query('SELECT * FROM perangkatdesa WHERE detail_jabatan = "Kadus"', (error, resultsKadus) => {
                if (error) throw error;
                // select perangkatdesa from database where detail jabatan = 'kaur'
                db_kedungjati.query('SELECT * FROM perangkatdesa WHERE detail_jabatan = "Kaur"', (error, resultsKaur) => {
                    if (error) throw error;

                    res.render('profilpedes', {
                        layout: 'include/main-layout',
                        title: 'Profil Pejabat Desa',
                        sekdes: resultsSekdes,
                        kasi: resultsKasi,
                        kadus: resultsKadus,
                        kaur: resultsKaur
                    });
                });
            });
        });
    });
});
router.get('/sejarahdesa', (req,res) => {
    res.render('sejarahdesa', {layout: 'include/main-layout', title: 'Sejarah Desa'});
});
router.get('/petadesa', (req,res) => {
    res.render('petadesa', {layout: 'include/main-layout', title: 'Peta Desa'});
})
router.get('/budayadesa', (req,res) => {
    res.render('budayadesa', {layout: 'include/main-layout', title: 'Budaya Desa'});
})
router.get('/infrastrukturdesa', (req,res) => {
    res.render('infrastrukturdesa', {layout: 'include/main-layout', title: 'Infrastruktur Desa'});
})
router.get('/galeridesa', (req,res) => {
    res.render('galeridesa', {layout: 'include/main-layout', title: 'Galeri Desa'});
})
router.get('/potensidesa', (req,res) => {
    res.render('potensidesa', {layout: 'include/main-layout', title: 'Potensi Desa'});
})
router.get('/pembangunandesa', (req,res) => {
    res.render('pembangunandesa', {layout: 'include/main-layout', title: 'Pembangunan Desa'});
})

const getdatabyid = (id) => {
    return new Promise((resolve, reject) => {
        // select from organisasi_desa where id = id
        db_kedungjati.query('SELECT * FROM organisasi_desa WHERE id = ?', [id], (error, results) => {
            if (error) reject(error);
            resolve(results[0]);
        });
    });
}

router.get('/organisasidesa', async (req,res) => {
    try{
      const id = req.query.id;
      const organisasi = await getdatabyid(id);

      res.render('organisasidesa', {layout: 'include/main-layout', title: 'Organisasi Desa', organisasi});
    }
    catch(error){
        console.log(error);
    }
})







// admin page
router.post('/login_admin', (req, res) => {
    const { username, password } = req.body;
  
    // Query the admin table to check if the username and password match
    const query = 'SELECT * FROM admin WHERE username = ? AND password = ?';
    db_kedungjati.query(query, [username, password], (err, results) => {
      if (err)  {
        console.error('Error executing the query:', err);
        res.send('<script>alert("An error occurred."); window.location="/login_admin";</script>');
        return;
      }
  
      if (results.length > 0) {
        req.session.IsLoggedIn = true;
        req.session.NamaAdmin = results[0].username;
         res.send('<script>alert("Login Admin Berhasil"); window.location="/index_admin";</script>');
      } else {
        // Authentication failed, show an alert and redirect back to the login page
        res.send('<script>alert("Username atau Password Salah."); window.location="/login_admin";</script>');
      }
    });
  });
// halaman admin
  router.get('/index_admin', (req, res) => {
    if (req.session.IsLoggedIn) {
      db_kedungjati.query('SELECT * FROM admin', (error, resultsAdmin) => {
        if (error) throw error;
        db_kedungjati.query('SELECT * FROM visi', (error, resultsVisi) => {
          if (error) throw error;
          db_kedungjati.query('SELECT * FROM misi', (error, resultsMisi) => {
            if (error) throw error;

            res.render('index_admin', {
              layout: 'include/main-layout-admin',
              title: 'Dashboard Admin',
              admin: resultsAdmin,
              visi: resultsVisi,
              misi: resultsMisi,
              NamaAdmin: req.session.NamaAdmin
            });
          });
        });
      });
    } else {
      res.redirect('/login_admin');
    }
  });
  router.post('/edit_visi' , (req,res) => {
    // edit visi if empty then failed
    const { visi } = req.body;
    if (visi == '') {
      res.send('<script>alert("Visi Desa Tidak Boleh Kosong."); window.location="/index_admin";</script>');
    } else {
      // edit visi
      const editQuery = 'UPDATE visi SET visi = ?';
      db_kedungjati.query(editQuery, [visi], (error, result) => {
        if (error) {
          console.error('Error executing the edit query:', error);
          // Handle the error appropriately, maybe display an error message to the user
          res.send('<script>alert("Gagal Mengedit Visi Desa."); window.location="/index_admin";</script>');
          return;
        }
        // visi edited successfully, redirect back to the 'index_admin' page or wherever you want
        res.send('<script>alert("Berhasil Mengedit Visi Desa."); window.location="/index_admin";</script>');
      });
    }
  });
  router.post('/edit_misi', (req, res) => {
    const { id, misi } = req.body;
  
    // Check if misi is an array and handle each misi item separately
    if (Array.isArray(misi)) {
      // Assuming that 'id' and 'misi' arrays have the same length and order
      for (let i = 0; i < misi.length; i++) {
        const currentMisi = misi[i];
        const currentId = id[i];
  
        if (currentMisi === '') {
          res.send('<script>alert("Misi Desa Tidak Boleh Kosong."); window.location="/index_admin";</script>');
          return; // Stop processing if any misi is empty
        } else {
          const editQuery = 'UPDATE misi SET misi = ? WHERE id = ?';
          db_kedungjati.query(editQuery, [currentMisi, currentId], (error, result) => {
            if (error) {
              console.error('Error executing the edit query:', error);
              res.send('<script>alert("Gagal Mengedit Misi Desa."); window.location="/index_admin";</script>');
              return;
            }
          });
        }
      }
  
      // All misi items edited successfully, redirect back to the 'index_admin' page or wherever you want
      res.send('<script>alert("Berhasil Mengedit Misi Desa."); window.location="/index_admin";</script>');
    } else {
      // Handle the case where misi is not an array (unexpected behavior)
      res.send('<script>alert("Data Misi tidak valid."); window.location="/index_admin";</script>');
    }
  });

router.get('/delete_admin', (req, res) => {
    if (req.session.IsLoggedIn) {
      // Get the admin ID from the query parameter
      const adminId = req.query.id;
      // Execute the database query to delete the admin
      const deleteQuery = 'DELETE FROM admin WHERE id = ?';
      db_kedungjati.query(deleteQuery, [adminId], (error, result) => {
        if (error) {
          console.error('Error executing the delete query:', error);
          // Handle the error appropriately, maybe display an error message to the user
          res.send('<script>alert("Gagal Menghapus Admin."); window.location="/index_admin";</script>');
          return;
        }
        // Admin deleted successfully, redirect back to the 'index_admin' page or wherever you want
        res.send('<script>alert("Berhasil Menghapus Admin."); window.location="/index_admin";</script>');
      });
    } else {
      // User is not logged in, redirect back to the login page
      res.redirect('/login_admin');
    }
  });
router.get('/deleteriwayatpendidikan', (req, res) => {
    if (req.session.IsLoggedIn) {
      // Get the admin ID from the query parameter
      const riwayatpendidikankadesId = req.query.id;
      // Execute the database query to delete the admin
      const deleteQuery = 'DELETE FROM riwayatpendidikankades WHERE id = ?';
      db_kedungjati.query(deleteQuery, [riwayatpendidikankadesId], (error, result) => {
        if (error) {
          console.error('Error executing the delete query:', error);
          // Handle the error appropriately, maybe display an error message to the user
          res.send('<script>alert("Riwayat Pendidikan Gagal Di Hapus."); window.location="/profildesa_admin";</script>');
          return;
        }
        // Admin deleted successfully, redirect back to the 'index_admin' page or wherever you want
        res.send('<script>alert("Riwayat Pendidikan Berhasil Di Hapus."); window.location="/profildesa_admin";</script>');
      });
    } else {
      // User is not logged in, redirect back to the login page
      res.redirect('/login_admin');
    }
  });
router.get('/deleteriwayatpekerjaan', (req, res) => {
    if (req.session.IsLoggedIn) {
      // Get the admin ID from the query parameter
      const riwayatpekerjaankadesId = req.query.id;
      // Execute the database query to delete the admin
      const deleteQuery = 'DELETE FROM pekerjaankades WHERE id = ?';
      db_kedungjati.query(deleteQuery, [riwayatpekerjaankadesId], (error, result) => {
        if (error) {
          console.error('Error executing the delete query:', error);
          // Handle the error appropriately, maybe display an error message to the user
          res.send('<script>alert("Riwayat Pekerjaan Gagal Di Hapus."); window.location="/profildesa_admin";</script>');
          return;
        }
        // Admin deleted successfully, redirect back to the 'index_admin' page or wherever you want
        res.send('<script>alert("Riwayat Pekerjaan Berhasil Di Hapus."); window.location="/profildesa_admin";</script>');
      });
    } else {
      // User is not logged in, redirect back to the login page
      res.redirect('/login_admin');
    }
  });
router.get('/login_admin', (req, res) => {
  // add this check for redirecting the user to the dashboard if already logged in
  if (req.session.IsLoggedIn) {
    res.redirect('/index_admin');
    return;
  }
  res.render('login_admin', {
    layout: 'include/main-layout-login',
    title: 'Halaman Login Admin',
  });
});
// Create a new route for handling logout
router.get('/logout_admin', (req, res) => {
    // Destroy the session to log the user out
    req.session.destroy(err => {
      if (err) {
        console.error('Error destroying session:', err);
      }
      // Redirect the user back to the login page after logout
      res.redirect('/login_admin');
    });
  });
  router.post('/tambahadmin', (req, res) => {
    const { NamaAdmin, UsernameAdmin, PasswordAdmin} = req.body;
    
    const query = 'INSERT INTO admin (nama, username, password) VALUES (?, ?, ?)';
    db_kedungjati.query(query, [NamaAdmin, UsernameAdmin, PasswordAdmin], (error, result) => {
      if (error) {
        console.error('Error executing the query:', error);
        res.send('<script>alert("Gagal Menambahkan Admin."); window.location="/tambahadmin";</script>');
        return;
      }
      res.send('<script>alert("Berhasil Menambahkan Admin."); window.location="/index_admin";</script>');
    });
  });
router.get('/tambahadmin', (req,res) => {
    if (req.session.IsLoggedIn) {
        db_kedungjati.query('SELECT * FROM admin', (error, resultsAdmin) => {
          if (error) throw error;
          res.render('tambahadmin', {
            layout: 'include/main-layout-admin',
            title: 'Tambah Admin Baru',
            admin: resultsAdmin,
            NamaAdmin: req.session.NamaAdmin
          });
        });
      } else {
        // User is not logged in, redirect back to the login page
        res.redirect('/login_admin');
      }
    // res.render('tambahadmin', {layout : 'include/main-layout-admin', title: 'Tambah Admin'});
})

router.post('/tambahriwayatpendidikan', (req, res) => {
  const {riwayatpendidikan} = req.body;

  const query = 'INSERT INTO riwayatpendidikankades (pendidikan) VALUES (?)';
  db_kedungjati.query(query, [riwayatpendidikan], (error, result) => {
    if (error) {
      console.error('Error executing the query:', error);
      res.send('<script>alert("Gagal Menambahkan Riwayat Pendidikan."); window.location="/tambahriwayatpendidikan";</script>');
      return;
    }
    res.send('<script>alert("Riwayat pendidikan Berhasil Ditambahkan."); window.location="/profildesa_admin";</script>');
  });
});

router.get('/tambahriwayatpendidikan', (req,res) =>{
    if (req.session.IsLoggedIn) {
        db_kedungjati.query('SELECT * FROM admin', (error, resultsAdmin) => {
          if (error) throw error;
          res.render('tambahriwayatpendidikan', {
            layout: 'include/main-layout-admin',
            title: 'Tambah Riwayat Pendidikan',
            admin: resultsAdmin,
            NamaAdmin: req.session.NamaAdmin
          });
        });
      } else {
        // User is not logged in, redirect back to the login page
        res.redirect('/login_admin');
      }
})
router.post('/tambahriwayatpekerjaan', (req, res) => {
  const {riwayatpekerjaan} = req.body;

  const query = 'INSERT INTO pekerjaankades (pekerjaan) VALUES (?)';
  db_kedungjati.query(query, [riwayatpekerjaan], (error, result) => {
    if (error) {
      console.error('Error executing the query:', error);
      res.send('<script>alert("Gagal Menambahkan Riwayat Pekerjaan."); window.location="/tambahriwayatpekerjaan";</script>');
      return;
    }
    res.send('<script>alert("Riwayat Pekerjaan Berhasil Ditambahkan."); window.location="/profildesa_admin";</script>');
  });
});
router.get('/tambahriwayatpekerjaan', (req,res) =>{
  if (req.session.IsLoggedIn) {
      db_kedungjati.query('SELECT * FROM admin', (error, resultsAdmin) => {
        if (error) throw error;
        res.render('tambahriwayatpekerjaan', {
          layout: 'include/main-layout-admin',
          title: 'Tambah Riwayat Pekerjaan',
          admin: resultsAdmin,
          NamaAdmin: req.session.NamaAdmin
        });
      });
    } else {
      // User is not logged in, redirect back to the login page
      res.redirect('/login_admin');
    }
})
router.get('/perangkatdesa_admin', (req,res) => {
    if(req.session.IsLoggedIn){
        db_kedungjati.query('SELECT * FROM admin', (error, resultsAdmin) => {
            if (error) throw error;
            db_kedungjati.query('SELECT * FROM perangkatdesa', (error, resultsPerangkatDesa) => {
                if (error) throw error;
                res.render('perangkatdesa_admin', {
                    layout: 'include/main-layout-admin',
                    title: 'Perangkat Desa',
                    admin: resultsAdmin,
                    perangkatdesa: resultsPerangkatDesa,
                    NamaAdmin: req.session.NamaAdmin
                });
            });
        });
    }
})
router.get('/profildesa_admin', (req,res) => {
    if(req.session.IsLoggedIn) {
        db_kedungjati.query('SELECT * FROM admin', (error, resultsAdmin) => {
            if (error) throw error;
            db_kedungjati.query('SELECT * FROM riwayatpendidikankades' , (error, resultsRiwayatPendidikanKades) => {
                if (error) throw error;
                db_kedungjati.query('SELECT * FROM pekerjaankades' , (error, resultsRiwayatPekerjaanKades) => {
                    if (error) throw error;
                    db_kedungjati.query('SELECT * FROM kepaladesa', (error, resultsKepalaDesa) => {
                        if (error) throw error;

                        res.render('profildesa_admin', {
                            layout: 'include/main-layout-admin',
                            title: 'Profil Desa',
                            admin: resultsAdmin,
                            riwayatpendidikankades: resultsRiwayatPendidikanKades,
                            pekerjaankades: resultsRiwayatPekerjaanKades,
                            kepaladesa: resultsKepalaDesa,
                            NamaAdmin: req.session.NamaAdmin
                        });
                    });
                });
            });
        });
    } else {
        res.redirect('/login_admin');
    }
})



const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'assets/img/perangkatdesa');
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now(); // Use a timestamp instead of date string
    const fileExtension = file.originalname.split('.').pop();
    const fileName = timestamp + '-' + Math.random().toString(36).substring(7) + '.' + fileExtension;
    console.log('New filename:', fileName);
    cb(null, fileName);
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage: fileStorage, fileFilter: fileFilter });

router.post('/editprofildesa', upload.single('photo'), (req, res) => {
  const { nama, ttl, jeniskelamin, agama, alamat, pendidikan } = req.body;
  const imageFileName = req.file ? req.file.filename : null; // Get the uploaded image filename

  const query = 'UPDATE kepaladesa SET nama = ?, ttl = ?, jeniskelamin = ?, agama = ?, alamat = ?, pendidikan = ?, photo = ? WHERE id = 1';

  db_kedungjati.query(query, [nama, ttl, jeniskelamin, agama, alamat, pendidikan, imageFileName], (error, result) => {
    if (error) {
      console.error('Error executing the query:', error);
      res.send('<script>alert("Gagal Mengedit Profil Desa."); window.location="/profildesa_admin";</script>');
      return;
    }
    res.send('<script>alert("Profil Desa Berhasil Diedit."); window.location="/profildesa_admin";</script>');
  });
});


router.post('/add_perangkat_desa', upload.single('photo'), (req, res) => {
  const { nama_perangkat, detail_jabatan, jabatan, ttl, jeniskelamin, agama, pendidikan_terakhir} = req.body;
  const imageFileName = req.file ? req.file.filename : null; // Get the uploaded image filename

  const query = 'INSERT INTO perangkatdesa (nama_perangkat, detail_jabatan, jabatan, ttl, jeniskelamin, agama, pendidikan_terakhir, photo) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  db_kedungjati.query(query, [nama_perangkat, detail_jabatan, jabatan, ttl, jeniskelamin, agama, pendidikan_terakhir, imageFileName], (error, result) => {
    if (error) {
      console.error('Error executing the query:', error);
      res.send('<script>alert("Gagal Menambahkan Perangkat Desa."); window.location="/perangkatdesa_admin";</script>');
      return;
    }
    res.send('<script>alert("Perangkat Desa Berhasil Ditambahkan."); window.location="/perangkatdesa_admin";</script>');
  });
});
router.get('/deleteperangkatdesa' , (req,res) => {
    if(req.session.IsLoggedIn) {
        const { id } = req.query;
        const query = 'DELETE FROM perangkatdesa WHERE id = ?';
        db_kedungjati.query(query, [id], (error, result) => {
            if (error) {
                console.error('Error executing the query:', error);
                res.send('<script>alert("Gagal Menghapus Perangkat Desa."); window.location="/perangkatdesa_admin";</script>');
                return;
            }
            res.send('<script>alert("Perangkat Desa Berhasil Dihapus."); window.location="/perangkatdesa_admin";</script>');
        });
    } else {
        res.redirect('/login_admin');
    }
})

router.get('/add_perangkatdesa_admin', (req,res) => {
  // add session checker here
  if(req.session.IsLoggedIn) {
    res.render('add_perangkatdesa_admin', {layout : 'include/main-layout-admin', title: 'Tambah Perangkat Desa', NamaAdmin: req.session.NamaAdmin});
  } else {
    res.redirect('/login_admin');
  }
})

router.post('/edit_perangkatdesa', upload.single('photo'), (req, res) => {
  const { id, nama_perangkat, detail_jabatan, jabatan, ttl, jeniskelamin, agama, pendidikan_terakhir} = req.body;
  const imageFileName = req.file ? req.file.filename : null; // Get the uploaded image filename
  
  const query = 'UPDATE perangkatdesa SET nama_perangkat = ?, detail_jabatan = ?, jabatan = ?, ttl = ?, jeniskelamin = ?, agama = ?, pendidikan_terakhir = ?, photo = ? WHERE id = ?';
  db_kedungjati.query(query, [nama_perangkat, detail_jabatan, jabatan, ttl, jeniskelamin, agama, pendidikan_terakhir, imageFileName, id], (error, result) => {
    if (error) {
      console.error('Error executing the query:', error);
      res.send('<script>alert("Gagal Mengedit Perangkat Desa."); window.location="/perangkatdesa_admin";</script>');
      return;
    }
    res.send('<script>alert("Perangkat Desa Berhasil Diedit."); window.location="/perangkatdesa_admin";</script>');
  });
}); 


router.get('/edit_perangkatdesa_admin', (req,res) => {
  // add session checker here
  if(req.session.IsLoggedIn) {
    const id = req.query.id;
    const nama_perangkat = req.query.nama_perangkat;
    const detail_jabatan = req.query.detail_jabatan;
    const ttl = req.query.ttl;
    const jeniskelamin = req.query.jeniskelamin;
    const agama = req.query.agama;
    const pendidikan_terakhir = req.query.pendidikan_terakhir;
    const jabatan = req.query.jabatan;
    const photo = req.query.photo;
    
    res.render('edit_perangkatdesa_admin', {layout : 'include/main-layout-admin', title: 'Edit Perangkat Desa', id: id, nama_perangkat: nama_perangkat, detail_jabatan: detail_jabatan, ttl: ttl, jeniskelamin: jeniskelamin, agama: agama, pendidikan_terakhir: pendidikan_terakhir, jabatan: jabatan, photo: photo, NamaAdmin: req.session.NamaAdmin});
  } else {
    res.redirect('/login_admin');
  }
})


router.get('/tambahmisi', (req,res) => {
  // check session here
  if(req.session.IsLoggedIn) {
    res.render('tambahmisi', {layout : 'include/main-layout-admin', title: 'Tambah Misi', NamaAdmin: req.session.NamaAdmin});
  }
  else {
    res.redirect('/login_admin');
  }
})
router.post('/tambahmisidesa', (req,res) => {
  const { misi } = req.body;
  const query = 'INSERT INTO misi (misi) VALUES (?)';
  db_kedungjati.query(query, [misi], (error, result) => {
    if (error) {
      console.error('Error executing the query:', error);
      res.send('<script>alert("Gagal Menambahkan Misi."); window.location="/index_admin";</script>');
      return;
    }
    res.send('<script>alert("Misi Berhasil Ditambahkan."); window.location="/index_admin";</script>');
  });
});
router.get('/deletemisi' , (req,res) => {
    if(req.session.IsLoggedIn) {
        const { id } = req.query;
        const query = 'DELETE FROM misi WHERE id = ?';
        db_kedungjati.query(query, [id], (error, result) => {
            if (error) {
                console.error('Error executing the query:', error);
                res.send('<script>alert("Gagal Menghapus Misi."); window.location="/index_admin";</script>');
                return;
            }
            res.send('<script>alert("Misi Berhasil Dihapus."); window.location="/index_admin";</script>');
        });
    } else {
        res.redirect('/login_admin');
    }
})



module.exports = router;