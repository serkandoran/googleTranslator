<template>
  <div>

    <div class="container">
      <div class="header">
        <div @click="openSelectMenuTranslating()" class="top-left">
          <span style="color:blue">{{translating}}</span>
          <i class="fa-solid fa-angle-down"></i>
        </div>
        <span id="ar"><i class="fa-solid fa-arrow-right-arrow-left"></i></span>
        <div @click="openSelectMenuWillBeTranslated()" class="top-right">
          <span style="color:blue">{{willBeTranslated}}</span>
          <i class="fa-solid fa-angle-down"></i>
        </div>
      </div>
      <div class="torso">
        <textarea id="text-area" type="text" v-model="mydata"></textarea>
        <div class="output">{{returnedData}}</div>
      </div>
      <div @click="translate()" class="cevir">TRANSLATE</div>
    </div>

    <div class="select-menu" :style="{'display':selectMenuDisplay}">
      <div class="select-menu-header">
        <input class="search" type="text" v-model="searchedCountry">
        <i @click="selectMenuClose()" class="fa-solid fa-xmark"></i>
      </div>
      <div class="countries">
        <span @click="getCountry(country,index)" v-for="(country,index) in filtered" :key="index">
          {{country}}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data(){
    return{
      mydata:'',
      returnedData:'',
      countries:{
        ab:'Abkhazian',
        aa:'Afar',
        af:'Afrikaans',
        ak:'Akan',
        sq:'Albanian',
        am:'Amharic',
        ar:'Arabic',
        an:'Aragonese',
        hy:'Armenian',
        as:'Assamese',
        av:'Avaric',
        ae:'Avestan',
        ay:'Aymara',
        az:'Azerbaijani',
        bm:'Bambara',
        ba:'Bashkir',
        eu:'Basque',
        be:'Belarusian',
        bn:'Bengali',
        bi:'Bislama',
        bs:'Bosnian',
        br:'Breton',
        bg:'Bulgarian',
        my:'Burmese',
        ca:'Catalan',
        ch:'Chamorro',
        ce:'Chechen',
        ny:'Chichewa',
        zh:'Chinese',
        cu:'Church Slavic',
        cv:'Chuvash',
        kw:'Cornish',
        co:'Corsican',
        cr:'Cree',
        hr:'Croatian',
        cs:'Czech',
        da:'Danish',
        dv:'Divehi',
        nl:'Dutch',
        dz:'Dzongkha',
        en:'English',
        eo:'Esperanto',
        et:'Estonian',
        ee:'Ewe',
        fo:'Faroese',
        fj:'Fijian',
        fi:'Finnish',
        fr:'French',
        fy:'Western Frisian',
        ff:'Fulah',
        gd:'Gaelic',
        gl:'Galician',
        lg:'Ganda',
        ka:'Georgian',
        de:'German',
        el:'Greek',
        kl:'Kalaallisut',
        gn:'Guarani',
        gu:'Gujarati',
        ht:'Haitian',
        ha:'Hausa',
        he:'Hebrew',
        hz:'Herero',
        hi:'Hindi',
        ho:'Hiri Motu',
        hu:'Hungarian',
        is:'Icelandic',
        io:'Ido',
        ig:'Igbo',
        id:'Indonesian',
        ia:'Interlingua',
        ie:'Interlingue',
        iu:'Inuktitut',
        ik:'Inupiaq',
        ga:'Irish',
        it:'Italian',
        ja:'Japanese',
        jv:'Javanese',
        kn:'Kannada',
        kr:'Kanuri',
        ks:'Kashmiri',
        kk:'Kazakh',
        km:'Central Khmer',
        ki:'Kikuyu',
        rw:'Kinyarwanda',
        ky:'Kirghiz',
        kv:'Komi',
        kg:'Kongo',
        ko:'Korean',
        kj:'Kuanyama',
        ku:'Kurdish',
        lo:'Lao',
        la:'Latin',
        lv:'Latvian',
        li:'Limburgan',
        ln:'Lingala',
        lt:'Lithuanian',
        lu:'Luba-Katanga',
        lb:'Luxembourgish',
        mk:'Macedonian',
        mg:'Malagasy',
        ms:'Malay',
        ml:'Malayalam',
        mt:'Maltese',
        gv:'Manx',
        mi:'Maori',
        mr:'Marathi',
        mh:'Marshallese',
        mn:'Mongolian',
        na:'Nauru',
        nv:'Navajo',
        nd:'North Ndebele',
        nr:'South Ndebele',
        ng:'Ndonga',
        ne:'Nepali',
        no:'Norwegian',
        nb:'Norwegian Bokmål',
        nn:'Norwegian Nynorsk',
        ii:'Sichuan Yi',
        oc:'Occitan',
        oj:'Ojibwa',
        or:'Oriya',
        om:'Oromo',
        os:'Ossetian',
        pi:'Pali',
        ps:'Pashto',
        fa:'Persian',
        pl:'Polish',
        pt:'Portuguese',
        pa:'Punjabi',
        qu:'Quechua',
        ro:'Romanian',
        rm:'Romansh',
        rn:'Rundi',
        ru:'Russian',
        se:'Northern Sami',
        sm:'Samoan',
        sg:'Sango',
        sa:'Sanskrit',
        sc:'Sardinian',
        sr:'Serbian',
        sn:'Shona',
        sd:'Sindhi',
        si:'Sinhala',
        sk:'Slovak',
        sl:'Slovenian',
        so:'Somali',
        st:'Southern Sotho',
        es:'Spanish',
        su:'Sundanese',
        sw:'Swahili',
        ss:'Swati',
        sv:'Swedish',
        tl:'Tagalog',
        ty:'Tahitian',
        tg:'Tajik',
        ta:'Tamil',
        tt:'Tatar',
        te:'Telugu',
        th:'Thai',
        bo:'Tibetan',
        ti:'Tigrinya',
        to:'Tonga',
        ts:'Tsonga',
        tn:'Tswana',
        tr:'Turkish',
        tk:'Turkmen',
        tw:'Twi',
        ug:'Uighur',
        uk:'Ukrainian',
        ur:'Urdu',
        uz:'Uzbek',
        ve:'Venda',
        vi:'Vietnamese',
        vo:'Volapük',
        wa:'Walloon',
        cy:'Welsh',
        wo:'Wolof',
        xh:'Xhosa',
        yi:'Yiddish',
        yo:'Yoruba',
        za:'Zhuang',
        zu:'Zulu',
      },
      searchedCountry:'',
      selectMenuDisplay:'none',
      countryCode:'',
      translating:'English',
      willBeTranslated:'Turkish',
      translatingCode:'en',
      willBeTranslatedCode:'tr',
      translateFlag:null
    }
  },
  methods:{
    getCountry(country,code){
      Object.entries(this.countries)
      .forEach((ars)=>{
        if(ars[1] === country){
          this.selectMenuDisplay = 'none'
          if(this.translateFlag){
            this.translating = country
            this.translatingCode = ars[0]
            console.log(this.translatingCode+this.willBeTranslatedCode);
          }else{
            this.willBeTranslated = country
            this.willBeTranslatedCode = ars[0]
            console.log(this.translatingCode+this.willBeTranslatedCode);
          }
        }
      })
    },
    selectMenuClose(){
      this.selectMenuDisplay = 'none'
    },
    openSelectMenuTranslating(){
      this.selectMenuDisplay = 'block'
      this.translateFlag = true
    },
    openSelectMenuWillBeTranslated(){
      this.selectMenuDisplay = 'block'
      this.translateFlag = false
    },
    translate(){
      axios.post('http://localhost:3000/',{
        text: this.mydata,
        targetCode:this.translatingCode,
        sourceCode:this.willBeTranslatedCode
      }).then((res)=>{
        this.returnedData = res.data
      })
    }
  },
  computed:{
    filtered(){
      return Object.values(this.countries)
      .filter((country)=>{
        return country.toLowerCase().match(this.searchedCountry)
      })
    }
  }
}
</script>

<style>
body{
  margin: 0;
}
.cevir{
  width: 80%;
  height: 30px;
  border: 1px solid gray;
  border-radius: 100vh;
  background: rgb(95, 133, 45);
  text-align: center;
  line-height: 30px;
  cursor: pointer;
  color: rgb(231, 231, 231);
}
.cevir:hover{
  background: rgb(125, 153, 89);
}
.fa-xmark{
  color: rgb(90, 90, 90);
  font-size: 25px;
  cursor: pointer;
}
.select-menu{
  width: 600px;
  height: 320px;
  background: rgb(216, 216, 216);
  position: absolute;
  inset: 0;
}
.countries{
  word-wrap: break-word;
  padding-left: 2rem;
  display: flex;
  flex-wrap: wrap;
  overflow-y: scroll;
  height: 230px;
  align-content: flex-start;
}
.countries>span{
  display: block;
  margin: 0;
  padding: 0;
  width: 27%;
  height: 2rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
  line-height: 30px;
  padding-left: 2rem;
}
.countries>span:hover{
  background: rgb(170, 170, 170);
  border-radius: 5px;
}
.search{
  width: 85%;
  background: transparent;
  border: 1px solid rgb(156, 156, 156);
  height: 35px;
  font-size: 1.1rem;
  border-radius: 10px;
}
.search:focus{
  outline: none;
}
.select-menu-header{
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.container{
  width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}
.top-left{
  border: 1px solid gray;
  height: 40px;
  width: 250px;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.top-right{
  border: 1px solid gray;
  height: 40px;
  width: 250px;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.header{
  display: flex;
  gap: 1rem;
  align-items: center;
}
.torso{
  display: flex;
  align-items: center;
}
#text-area{
  border: none;
  resize: none;
  height: 200px;
  width: 270px;
  font-size: 1.5rem;
}
#text-area:focus{
  outline: none;
}
.output{
  height: 170px;
  border-radius: 10px;
  width: 270px;
  background: rgb(247, 247, 247);
  word-wrap: break-word;
  overflow-y: scroll;
}
.output::-webkit-scrollbar{
  display: none;
}
</style>