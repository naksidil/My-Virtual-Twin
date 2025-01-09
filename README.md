Gereksinimler

- Visual Studio
- Python (3.9 veya üzeri sürüm)
- FastAPI ve Uvicorn kütüphaneleri (Kurulum talimatları aşağıda verilmiştir)

Kurulum ve Çalıştırma

1. Virtual Twin Kodlarını İndirin
- Virtual Twin projesine ait dosyaları bilgisayarınıza indirin ve Visual Studio ile açın.

2. API Dosyalarını İndirin
- API projesine ait dosyaları bilgisayarınıza indirin. API, projenin arka plan işlemlerini desteklemek için gereklidir.

3. Python Ortamını Ayarlayın
- API dosyalarını çalıştırmadan önce gerekli Python kütüphanelerini yüklemeniz gerekir:

Terminalinizi açın ve API dosyalarının bulunduğu klasöre gidin:

cd C:\Users\aktur\OneDrive\Masaüstü\FastAPI_Project\API

Gerekli kütüphaneleri yüklemek için aşağıdaki komutu çalıştırın:

pip install fastapi uvicorn

4. API'yi Çalıştırın
a. Terminalden Çalıştırma

API klasörüne gidin (daha önce belirtilen gibi cd komutunu kullanarak):

cd C:\Users\aktur\OneDrive\Masaüstü\FastAPI_Project\API

API'yi başlatmak için şu komutu çalıştırın:

uvicorn api:app --host 0.0.0.0 --port 8000

uvicorn: API'yi çalıştıran sunucu.

api:app: api.py dosyasındaki app nesnesini çalıştırır.

b. Çalıştırma Sonucu

API başarıyla çalıştığında, terminalde aşağıdaki mesajı görürsünüz:

Uvicorn running on http://127.0.0.1:8000

Bu, API'nin yerel makinenizde çalıştığını gösterir. Tarayıcınızda http://127.0.0.1:8000 adresine giderek API'yi test edebilirsiniz.

5. Virtual Twin Kodlarını Çalıştırın

Visual Studio'da Virtual Twin projesini açın.

API'nin çalıştığından emin olduktan sonra Visual Studio'daki kodunuzu çalıştırın.

Notlar

Eğer farklı bir port veya host kullanıyorsanız, bu adresi projenizin yapılandırmasında güncellemeyi unutmayın.

Hata alırsanız terminal çıktısını kontrol edin ve eksik kütüphaneleri yükleyin.
