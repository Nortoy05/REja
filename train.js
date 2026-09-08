class Shop {
  constructor(non, lagmon, cola) {
    this.mahsulotlar = {
      non: non,
      lagmon: lagmon,
      cola: cola
    };
  }

  
  vaqtOl() {
    const hozir = new Date();
    const soat = hozir.getHours().toString().padStart(2, '0');
    const daqiqa = hozir.getMinutes().toString().padStart(2, '0');
    return `${soat}:${daqiqa}`;
  }

 
  qoldiq() {
    const vaqt = this.vaqtOl();
    const natija = `Hozir ${vaqt}da ${this.mahsulotlar.non}ta non, ${this.mahsulotlar.lagmon}ta lagmon va ${this.mahsulotlar.cola}ta cola mavjud!`;
    console.log(`[LOG] qoldiq() chaqirildi - ${vaqt}`);
    console.log(natija);
    return natija;
  }


  sotish(mahsulot, soni) {
    const vaqt = this.vaqtOl();
    console.log(`[LOG] sotish() chaqirildi - ${vaqt}`);

    if (!this.mahsulotlar.hasOwnProperty(mahsulot)) {
      console.log(`Xatolik: "${mahsulot}" degan mahsulot mavjud emas!`);
      return;
    }

    if (this.mahsulotlar[mahsulot] < soni) {
      console.log(`Xatolik: ${mahsulot} yetarli emas! Qolgani: ${this.mahsulotlar[mahsulot]}`);
      return;
    }

    this.mahsulotlar[mahsulot] -= soni;
    console.log(`${vaqt}da ${soni}ta ${mahsulot} sotildi.`);
  }

 
  qabul(mahsulot, soni) {
    const vaqt = this.vaqtOl();
    console.log(`[LOG] qabul() chaqirildi - ${vaqt}`);

    if (!this.mahsulotlar.hasOwnProperty(mahsulot)) {
      this.mahsulotlar[mahsulot] = 0;
    }

    this.mahsulotlar[mahsulot] += soni;
    console.log(`${vaqt}da ${soni}ta ${mahsulot} qabul qilindi.`);
  }
}


const shop = new Shop(4, 5, 2);

shop.qoldiq();


shop.sotish('non', 3);
shop.qabul('cola', 4);

shop.qoldiq();
