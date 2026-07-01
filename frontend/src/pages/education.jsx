import { Link } from "react-router-dom";

function Education() {
const news = [
  {
    title: "Cara Mengenali Berita Hoaks di Media Sosial",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
    link: "https://cekfakta.com"
  },
  {
    title: "7 Langkah Melakukan Fact Checking",
    image: "https://images.unsplash.com/photo-1496171367470-9ed9a91ea931",
    link: "https://turnbackhoax.id"
  },
  {
    title: "Waspada Deepfake dan Konten AI",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
    link: "https://turnbackhoax.id"
  },
  {
    title: "Cara Memastikan Media yang Dibaca Kredibel",
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c",
    link: "https://cekfakta.com"
  },
  {
    title: "Jangan Mudah Percaya Judul Provokatif",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
    link: "https://turnbackhoax.id"
  },
  {
    title: "Verifikasi Informasi Sebelum Membagikan",
    image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f",
    link: "https://cekfakta.com"
  }
];

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        
        <div className="text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-extrabold text-indigo-900 tracking-tight">
            Edukasi & Literasi Anti Hoaks
          </h1>
          <p className="text-sm md:text-base text-gray-500 mt-2">
            Mari tingkatkan kesadaran bersama dalam menyaring informasi kesehatan dan berita digital.
          </p>
        </div>

        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center">
          <div className="text-4xl md:text-5xl bg-indigo-50 p-4 rounded-xl text-indigo-600">
            🧐
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Apa Itu Hoaks?
            </h2>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
              Hoaks adalah informasi palsu atau menyesatkan yang sengaja disebarkan
              untuk memanipulasi opini publik, menciptakan kecemasan, atau memperoleh
              keuntungan tertentu. Di era digital, hoaks berkembang sangat cepat melalui
              media sosial dan aplikasi pesan instan, sehingga kemampuan verifikasi menjadi sangat krusial.
            </p>
          </div>
        </div>

       
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <span>📰</span> Referensi Berita & Artikel Edukasi
          </h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {news.map((item, index) => (
              <a
                key={index}
                href={item.link}
                target="_blank"
                rel="noreferrer"
                className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md hover:border-indigo-200 transition-all flex flex-col h-full"
              >
                <div className="overflow-hidden h-48 w-full bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <h4 className="font-semibold text-gray-800 text-sm md:text-base leading-snug group-hover:text-indigo-600 transition-colors line-clamp-2">
                    {item.title}
                  </h4>
                  <span className="text-xs text-indigo-500 font-medium mt-4 inline-flex items-center gap-1">
                    Kunjungi Sumber <span>↗</span>
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

       
        <div className="space-y-8 pt-6">
          
          
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <h2 className="text-2xl font-bold text-red-600 mb-6 flex items-center gap-2">
              <span>⚠️</span> Ciri-Ciri Konten Hoaks
            </h2>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
              {[
                { title: "Judul Sensasional", desc: "Menggunakan huruf kapital berlebihan, banyak tanda seru, atau kalimat clickbait yang memancing emosi." },
                { title: "Sumber Tidak Jelas", desc: "Tidak mencantumkan sumber resmi, nama institusi medis, atau pranala referensi primer yang valid." },
                { title: "Ajakan Menyebarkan", desc: "Memaksa atau memohon pembaca untuk segera membagikan pesan ulang (viral) tanpa verifikasi." },
                { title: "Konten Provokatif", desc: "Dirancang secara spesifik untuk memicu kemarahan, kepanikan massal, atau rasa takut berlebihan." },
                { title: "Tanggal Tidak Jelas", desc: "Menggunakan data, kasus, atau informasi lama yang dikemas ulang seolah-olah baru terjadi." },
                { title: "Tata Bahasa Buruk", desc: "Seringkali dijumpai banyak kesalahan ketik (typo), kalimat rancu, serta gaya bahasa tidak profesional." }
              ].map((ciri, i) => (
                <div key={i} className="bg-red-50/50 border border-red-100 rounded-xl p-5 hover:bg-red-50 transition-colors">
                  <h5 className="font-bold text-red-800 text-base">{ciri.title}</h5>
                  <p className="text-gray-600 text-xs md:text-sm mt-2 leading-relaxed">
                    {ciri.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <h2 className="text-2xl font-bold text-emerald-600 mb-6 flex items-center gap-2">
              <span>🛡️</span> Langkah Memverifikasi Informasi
            </h2>

            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
              {[
                { step: "1", title: "Cek Sumber Asli", desc: "Pastikan informasi berasal dari situs resmi kementerian, WHO, atau portal jurnal terakreditasi." },
                { step: "2", title: "Cari Berita Serupa", desc: "Bandingkan isi klaim berita dengan 2-3 portal berita kredibel nasional lainnya." },
                { step: "3", title: "Gunakan Fact-Checking", desc: "Gunakan platform cek fakta tepercaya seperti CekFakta.com atau Mafindo." },
                { step: "4", title: "Jangan Langsung Share", desc: "Saring dulu sebelum membagikan, tahan diri Anda meskipun informasinya terlihat menarik." }
              ].map((cara, i) => (
                <div key={i} className="bg-emerald-50/40 border border-emerald-100 rounded-xl p-5 hover:bg-emerald-50 transition-colors flex flex-col">
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-100 w-6 h-6 rounded-full flex items-center justify-center mb-3">
                    {cara.step}
                  </span>
                  <h5 className="font-bold text-gray-800 text-sm md:text-base">{cara.title}</h5>
                  <p className="text-gray-600 text-xs md:text-sm mt-1 leading-relaxed">
                    {cara.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          
          <div className="bg-gradient-to-r from-indigo-900 to-indigo-800 rounded-2xl p-6 md:p-8 text-white shadow-md">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span>💡</span> Tips Tambahan Membangun Literasi Digital
            </h2>
            <ul className="grid md:grid-cols-2 gap-3 text-sm text-indigo-100 list-inside list-disc">
              <li>Selalu bersikap skeptis & kritis terhadap berita bombastis.</li>
              <li>Edukasi orang tua dan grup keluarga terdekat mengenai bahaya hoaks.</li>
              <li>Manfaatkan chatbot pemeriksa fakta otomatis secara berkala.</li>
              <li>Laporkan konten hoaks ke kominfo atau fitur laporan media sosial.</li>
            </ul>
          </div>

          
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10 text-center space-y-4">
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800">
              Menemukan Berita Mencurigakan?
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm md:text-base">
              Gunakan sistem cerdas AI kami untuk menganalisis akurasi kebenaran teks berita secara kilat.
            </p>
            <div className="pt-2">
              <Link
                to="/analyze"
                className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm px-6 py-3 rounded-xl transition-all shadow-sm hover:shadow-md"
              >
                Mulai Analisis Berita 🔍
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Education;