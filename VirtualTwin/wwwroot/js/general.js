$(function () {

	//#region Aside Dropdown
	var speed = 300;
	$(".mainBox > p").on("click", function () {
		if ($(this).hasClass("active")) return;
		$(".mainBox > div").slideUp(speed);
		$(".mainBox > div > div").slideUp(speed);
		$(this).next("div").slideDown(speed).css("display", "flex");
		$(".mainBox > p").removeClass("active");
		$(".mainBox > div > p").removeClass("active");
		$(this).addClass("active");
	});
	$(".mainBox > div > p").on("click", function () {
		if ($(this).hasClass("active")) return;
		$(".mainBox > div > div").slideUp(speed);
		$(this).next("div").slideDown(speed).css("display", "flex");
		$(".mainBox > div > p ").removeClass("active");
		$(this).addClass("active");
	});
	//#endregion

	//#region Header
	$("#Notification").on("click", function (e) {
		e.stopPropagation();
		$("#NotificationBox").fadeToggle();
		$("#ProfileBox").fadeOut(200);

	});
	$("#NotificationBox > h5 > i").on("click", function () {
		$("#NotificationBox").fadeToggle();
	});
	$("#NotificationBox").on("click", function (e) {
		e.stopPropagation();
	});



	$("#Profile").on("click", function (e) {
		e.stopPropagation();
		$("#ProfileBox").fadeToggle();
		$("#NotificationBox").fadeOut(200);
	});
	$("#ProfileBox").on("click", function (e) {
		e.stopPropagation();
	});

	$("body").on("click", function (e) {
		$("#NotificationBox").fadeOut(200);
		$("#ProfileBox").fadeOut(200);

	});


	//#endregion

	//#region Aside Close Btn
	$("body").append(`<div id="ResponsiveAsideBackground"></div>`);

	let available = true;
	let availableResponsive = true;

	$("#Bar").on("click", function () {
		if (window.innerWidth > 992) { // Ekran genişliği kontrolü
			if (available) {
				$("aside").css({ width: "0", padding: "5px 0" });
				$("header").css("width", "100vw");
				$("main").css({ width: "100vw", "margin-left": "0" });
				$("#Bar").css({ "left": "16px" });
				$("#Bar > i").css({
					transform: "rotate(180deg)",
					opacity: "0"
				});
				$("#Bar > img").css({
					transform: "rotate(0deg)",
					opacity: "1"
				});

				available = false;
			}
			else {
				$("aside").css({ width: "60px", padding: "5px" });
				$("header").css("width", "calc(100vw - 60px)");
				$("main").css({ width: "calc(100vw - 60px)", "margin-left": "60px" });

				$("#Bar").css({ "left": "72px" });

				$("#Bar > i").css({
					transform: "rotate(0deg)",
					opacity: "1"
				});

				$("#Bar > img").css({
					transform: "rotate(-180deg)",
					opacity: "0"
				});

				available = true;
			}
		} else {
			if (availableResponsive) {
				$("aside").css("left", "0");
				$("#Bar > i").css({ transform: "rotate(0deg)", opacity: "1" });
				$("#Bar > img").css({ transform: "rotate(-180deg)", opacity: "0" });
				$("#Bar").css("left", "211px");
				$("#ResponsiveAsideBackground").css({ "pointer-events": "auto", "opacity": "1" })
				$("body").css("overflow-y", "hidden");
				availableResponsive = false;	
			}
			else {
				$("aside").css("left", "-250px");
				$("#Bar > i").css({ transform: "rotate(180deg)", opacity: "0" });
				$("#Bar > img").css({ transform: "rotate(0deg)", opacity: "1" });
				$("#Bar").css("left", "5px");
				$("#ResponsiveAsideBackground").css({ "pointer-events": "none", "opacity": "0" })
				$("body").css("overflow-y", "auto");
				availableResponsive = true;
			}

		}
	});

	$("#ResponsiveAsideBackground").on("click", function () {
		$(this).css({ "pointer-events": "none", "opacity": "0" })
		$("aside").css("left", "-250px");
		$("#Bar > i").css({ transform: "rotate(180deg)", opacity: "0" });
		$("#Bar > img").css({ transform: "rotate(0deg)", opacity: "1" });
		$("#Bar").css("left", "5px");
		$("body").css("overflow-y", "auto");
		availableResponsive = true;

	})
	//#endregion

	//#region FormImage

	$('.formImage > div:last-of-type > input').on('change', function () {
		const input = $(this);
		const files = this.files;
		const formImage = input.parent().prev();

		// Tüm ikonları gizle
		formImage.find('i').hide();
		formImage.find('img').hide();

		// Seçilen her dosya için işlem yap
		for (let i = 0; i < files.length; i++) {
			const file = files[i];
			const reader = new FileReader();

			reader.onload = function (e) {
				const fileExtension = file.name.split('.').pop().toLowerCase();

				if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(fileExtension)) {
					formImage.find('img').attr('src', e.target.result).show();
					formImage.find('i.fa-image').hide();
				} else if (['xls', 'xlsx'].includes(fileExtension)) {
					formImage.find('i.fa-file-excel').show();
				} else if (fileExtension === 'pdf') {
					formImage.find('i.fa-file-pdf').show();
				} else if (['doc', 'docx'].includes(fileExtension)) {
					formImage.find('i.fa-file-word').show();
				} else if (['txt', 'csv'].includes(fileExtension)) {
					formImage.find('i.fa-file-lines').show();
				} else {
					formImage.find('i.fa-file').show();
				}
			};

			reader.readAsDataURL(file); //base 64
		}
	});



	//#endregion

	//#region Password
	$("label.password > i").on("click", function () {
		if ($(this).hasClass("fa-eye-slash")) {
			$(this).removeClass("fa-eye-slash");
			$(this).addClass("fa-eye");
			$(this).next("input").attr("type", "text");
		} else {
			$(this).addClass("fa-eye-slash");
			$(this).removeClass("fa-eye");
			$(this).next("input").attr("type", "password");
		}
	})
	//#endregion 

	//#region Selec2

	$('.selectBox').select2({
		placeholder: "Seçim yapınız",
		allowClear: true,
		closeOnSelect: false,
		language: {
			noResults: function () {
				return "Sonuç bulunamadı.";
			},
			searching: function () {
				return "Aranıyor...";
			}
		}
	});

	//#endregion

	//#region DataTable 
	const table = $('#DataTable').DataTable({
		scrollX: true,
		"language": {
			"url": "https://cdn.datatables.net/plug-ins/1.10.25/i18n/Turkish.json",
			search: ' ',
			searchPlaceholder: "Ara",
			paginate: {
				next: ' İleri',
				previous: 'Geri '
			}
		},
		"stateSave": true,
		buttons: [
			{
				extend: 'excelHtml5',
				className: 'custom-excel'
			},
			{
				extend: 'print',
				className: 'custom-print',
				//autoPrint: false, // Sayfanın kapanmasını engeller
				customize: function (win) {
					// Yazdırılacak içerikte son sütunun gizlenmesi
					$(win.document.body).find('table').find('tr').each(function () {
						// Son hücreyi (son sütun) gizle
						$(this).find('td:last, th:last').css('display', 'none');
					});

					$(win.document.head).append(`
                    <style>
                        h1 {
                            text-align: center;
                            font-size: 20px;
                            margin-bottom: 20px;
                        }
                        table {
                            border-collapse: collapse;
                            width: 100%;
                        }
                        table th, table td {
                            border: 1px solid #e7e7e7;
                            padding: 5px;
                            text-align: center;
                        }
                    </style>
                `);
				}
			}
		]
	});

	// Butonları tetiklemek için eventler
	$('#ExcelExport').on('click', function () {
		table.button('.custom-excel').trigger();
	});
	$('#PrintTable').on('click', function () {
		table.button('.custom-print').trigger();
	});



	//#endregion

	//#region General Popup

	function openPopup(selector, id = null) {
		const popup = id ? $(`${selector}[data-id="${id}"]`) : $(selector);
		popup.show().addClass('active');
	}

	function closePopup(popup) {
		popup.find('div').addClass('closing');
		setTimeout(() => {
			popup.hide().removeClass('active');
			popup.find('div').removeClass('closing');
		}, 200);
	}

	$('.openPopupDetail').on('click', function () {
		const popupId = $(this).data('id');
		openPopup('.popup-detail', popupId);
	});

	$('.deletePopup').on('click', function () {
		const popupId = $(this).data('id');
		openPopup('.popup-delete', popupId);
	});

	$('.closePopupDetail').on('click', function () {
		const popup = $(this).closest('.popup-detail');
		closePopup(popup);
	});

	$('.confirmDelete').on('click', function () {
		closePopup($('.popup-delete'));
	});

	$('.cancelDelete').on('click', function () {
		closePopup($('.popup-delete'));
	});




	//#endregion

	//#region Refresh

	$('#Refresh').on("click", function () {
		window.location.reload(true);
	});


	//#endregion

	//#region Theme
	$('#Theme').on("click", function () {
		$("body").toggleClass("darkMode lightMode");
		if ($("body").hasClass("darkMode")) localStorage.setItem("theme", "darkMode");
		else localStorage.setItem("theme", "lightMode");
	});
	//#endregion

	//#region Loading
	$("#SpinnerContainer").fadeOut();
	//#endregion

	//#region Action 

	$(".action > i").on("click", function (e) {
		e.stopPropagation();
		var tr = $(this).closest("tr");
		var allRows = tr.parent().find("tr");
		let currentDiv = $(this).next("div");

		// Eğer toplam `tr` sayısı 4'ten küçükse `horizontal` sınıfını ekle
		if (allRows.length < 4) {
			currentDiv.addClass("horizontal");
		} else {
			currentDiv.removeClass("horizontal");
		}

		// Eğer toplam `tr` sayısı 3'ten büyükse ve son 2 satırdaysa `last` sınıfını ekle
		if (allRows.length > 3 && allRows.index(tr) >= allRows.length - 2) {
			currentDiv.addClass("last");
		} else {
			currentDiv.removeClass("last");
		}

		$(".action > i").css({
			"background": "",
			"color": "var(--title-color)"
		});

		$(this).css({
			"background": "var(--dg-blue)",
			"color": "var(--dark-white)"
		});

		if (currentDiv.is(":visible")) {
			currentDiv.fadeOut(200).css("display", "flex");
		} else {
			$(".action > div").fadeOut(200);
			currentDiv.fadeIn(200).css("display", "flex");
		}
	});

	$("body").on("click", function () {
		$(".action > div").fadeOut(200);
		$(".action > i").css({
			"background": "",
			"color": "var(--title-color)"
		});
	});


	//#endregion

})