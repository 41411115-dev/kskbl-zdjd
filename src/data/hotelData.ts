import heroExterior from '../assets/images/hotel_hero_exterior_1790842594151.jpg';
import moviePromo from '../assets/images/movie_promo_david_loman_1790842604703.jpg';
import presidentialSuite from '../assets/images/room_presidential_suite_1790842624645.jpg';
import harborDeluxe from '../assets/images/room_harbor_deluxe_1790842706948.jpg';
import restaurantDining from '../assets/images/hotel_restaurant_dining_1790842639588.jpg';
import bossPortrait from '../assets/images/boss_chu_portrait_1790842679528.jpg';
import { Room } from '../types.ts';

export const HOTEL_IMAGES = {
  heroExterior,
  moviePromo,
  presidentialSuite,
  harborDeluxe,
  restaurantDining,
  bossPortrait,
};

export const HOTEL_INFO = {
  name: '豬哥亮小港國際大飯店',
  englishName: 'CHU KE-LIANG GRAND HOTEL KAOHSIUNG',
  bossTitle: '飯店董事長 / 台灣秀場萬秀之王',
  bossName: '豬哥亮 (Chu Ke-liang)',
  address: '高雄市小港區中山四路888號（鄰近高雄國際機場）',
  phone: '07-888-8888',
  email: 'service@chukeliang-grandhotel.com.tw',
  checkInTime: '15:00',
  checkOutTime: '12:00（會員禮遇延至 14:00）',
};

export const BOSS_GREETINGS = {
  headline: '諸位鄉親父老、兄弟姊妹大家好！我是豬哥亮！',
  speech:
    '「阮小港這間飯店，是我親自監工開的！鄰近高雄小港國際機場與高雄港，交通方便得要命！冷涼卡好～來阮飯店住宿，不只床好睡、冷氣夠涼、早餐有尚青的高雄海產粥，最要緊的是——每房我都送你免費《大尾鱸鰻3》首映電影票！讓大家歡喜看電影、笑嗨嗨大賺錢！加入會員閣享專屬88折，這款好康沒來住實在太可惜啦！」',
  tagline: '萬秀之王親自坐鎮 ‧ 高雄小港最接地氣的五星奢華',
};

export const MOVIE_PERK_DETAILS = {
  movieTitle: '《大尾鱸鰻3》(David Loman 3)',
  badge: '全房型住宿獨家贈送',
  ticketCountRule: '雙人房贈2張 · 四人家庭房與總統套房贈4張',
  estimatedValue: '價值 NT$700 ~ NT$1,400 起',
  partnerTheaters: ['高雄SKM Park草衙道威秀影城', '高雄大遠百威秀影城', '喜樂時代影城', '全台各大特約合作影城'],
  includedPerks: [
    '《大尾鱸鰻3》首映通用電影票兌換券（不限場次、假日可用）',
    '影城貴賓優先劃位通道與爆米花可樂優惠升級',
    '飯店每日定時專車接駁至 SKM Park 草衙道影城',
    '入住即贈「大尾鱸鰻金牌紀念明信片與招財開運伴手禮」',
  ],
};

export const ROOMS_DATA: Room[] = [
  {
    id: 'room-presidential',
    name: '萬秀巨星總統套房',
    subtitle: 'Superstar Presidential Suite',
    category: 'suite',
    regularPrice: 13800,
    memberPrice: 12144, // 88折
    size: '38 坪 (125 m²)',
    bedType: '特大加寬獨立筒雙人床 (200x200cm)',
    maxGuests: 4,
    movieTickets: 4,
    image: presidentialSuite,
    view: '270度小港機場跑道全景與高雄港夕陽海景',
    description:
      '豬哥亮董事長專屬規格打造！擁有獨立影音劇院客房、私人紅酒Mini Bar、大理石雙人景觀按摩浴缸，推開落地窗即可俯瞰飛機起降與港灣壯闊落日。',
    highlights: [
      '免費贈送《大尾鱸鰻3》特等電影票 4 張',
      '私人奢華酒吧與極致音響環繞系統',
      '高雄國際機場/高鐵左營站 專車賓士免費接送',
      '尊享 270 度壯麗跑道起降與港灣暮色',
    ],
    amenities: [
      '獨立景觀按摩浴缸',
      '寶格麗奢華沐浴備品組',
      'Nespresso 膠囊咖啡機',
      '高規格 75 吋 QLED 劇院級電視',
      '24小時私人管家秘書服務',
      '每日萬秀傳奇海鮮百匯早餐4客',
    ],
  },
  {
    id: 'room-david-loman',
    name: '大尾鱸鰻出巡主題尊爵房',
    subtitle: 'David Loman VIP Themed Suite',
    category: 'suite',
    regularPrice: 7200,
    memberPrice: 6336, // 88折
    size: '22 坪 (72 m²)',
    bedType: '特大加大雙人床 (180x200cm)',
    maxGuests: 2,
    movieTickets: 2,
    image: moviePromo,
    view: '高雄小港市景與林蔭大道夜景',
    description:
      '全台唯一《大尾鱸鰻》電影主題尊爵套房！融入復古金牌秀場元素、霓虹電影海報藝術牆與經典真皮沙發，充滿歡樂熱鬧的台派霸氣風情。',
    highlights: [
      '免費贈送《大尾鱸鰻3》首映電影票 2 張',
      '贈送「大尾鱸鰻開運招財伴手禮禮盒」',
      '免費 Mini Bar 啤酒小食與黑松沙士無限暢飲',
      '延遲退房至 14:00（專屬尊榮禮遇）',
    ],
    amenities: [
      '復古摩登景觀泡澡浴缸',
      '戴森 (Dyson) 頂級吹風機',
      '免費光纖高速 WiFi 6',
      '65 吋 4K 智慧電視 (內建 Netflix / YouTube)',
      '雙人手沖咖啡濾掛體驗組',
      '萬秀特色早餐 2 客',
    ],
  },
  {
    id: 'room-harbor-deluxe',
    name: '小港海景豪華雙人客房',
    subtitle: 'Xiaogang Harbor Deluxe Room',
    category: 'deluxe',
    regularPrice: 4600,
    memberPrice: 4048, // 88折
    size: '16 坪 (52 m²)',
    bedType: '加大雙人床 (180x200cm) 或 雙單人床',
    maxGuests: 2,
    movieTickets: 2,
    image: harborDeluxe,
    view: '高雄港灣繁忙貨櫃輪與蔚藍海平線',
    description:
      '明亮典雅的高樓層景觀客房，以舒緩大地色調與溫潤木質構築，大片景觀窗讓您在晨曦中眺望港灣商船進出，體驗南台灣最迷人的海風與港都氣候。',
    highlights: [
      '免費贈送《大尾鱸鰻3》首映電影票 2 張',
      '港灣海景第一排無遮蔽開闊視野',
      '羽絨舒眠枕與五星級獨立筒床墊',
      '小港捷運站 (R3) 專屬免費穿梭接駁',
    ],
    amenities: [
      '乾濕分離獨立淋浴間與深泡浴缸',
      '茶籽堂天然植萃沐浴備品',
      '無噪音靜音環保冰箱',
      '人體工學商務辦公書桌與萬國插座',
      '萬秀特色早餐 2 客',
    ],
  },
  {
    id: 'room-family-quad',
    name: '港都家庭四人歡聚房',
    subtitle: 'Port City Family Quad Room',
    category: 'family',
    regularPrice: 6200,
    memberPrice: 5456, // 88折
    size: '20 坪 (66 m²)',
    bedType: '雙標準加大雙人床 (150x200cm x 2)',
    maxGuests: 4,
    movieTickets: 4,
    image: heroExterior,
    view: '小港林蔭公園與高雄市景',
    description:
      '專為全家出遊、三五好友同樂規劃的寬敞四人房！空間格局通透，附設家庭休閒沙發區與兒童備品貼心服務，入住全家四口每人一張大尾鱸鰻3電影票！',
    highlights: [
      '全家 4 人通通有！贈《大尾鱸鰻3》電影票 4 張',
      '寬敞 20 坪大空間，行李箱全開無障礙',
      '免費提供嬰兒床、消毒鍋、兒童澡盆（需預約）',
      '免費提供館內停車位 1 台',
    ],
    amenities: [
      '乾濕分離雙洗手台衛浴',
      '多功能休閒沙發區與家庭茶几',
      '快煮壺與台灣原片高山茶包',
      '兒童專屬備品牙刷組',
      '萬秀特色豐盛活力早餐 4 客',
    ],
  },
];

export const MEMBER_BENEFITS = [
  {
    title: '全房型即享 88 折優惠',
    desc: '會員登入預訂即享全館房型牌價 88 折起，免湊房數直接省，逢年過節皆可享優惠。',
    icon: 'Percent',
  },
  {
    title: '加碼贈《大尾鱸鰻3》特等電影票',
    desc: '會員專屬保證優先配票，每房享首映通用券，可至合作影城兌換觀影。',
    icon: 'Ticket',
  },
  {
    title: '小港國際機場/左營高鐵 免費接駁',
    desc: '預約入住即享小港機場 (3分鐘) 或左營高鐵站豪華商務專車免費來回接送一次。',
    icon: 'Car',
  },
  {
    title: '延遲退房至下午 14:00',
    desc: '不用急著趕著收行李，會員尊榮延後兩小時退房，睡飽吃好再出發。',
    icon: 'Clock',
  },
  {
    title: '海鮮百匯早餐免費加贈',
    desc: '享用高雄港現撈鮮魚湯、澎湃小卷米粉與中西美饌，會員免收一成服務費。',
    icon: 'UtensilsCrossed',
  },
  {
    title: '萬秀會員點數累積折抵',
    desc: '每筆消費 100 元累積 10 點，點數可直接折抵房費或兌換飯店聯名週邊商品。',
    icon: 'Award',
  },
];

export const HOTEL_FACILITIES = [
  {
    name: '萬秀傳奇海鮮酒樓',
    tag: '美饌饗宴',
    desc: '由豬哥亮董事長欽點五星級國宴主廚掌杓，嚴選前鎮漁港每日現撈肥美龍蝦、澎湖紅蟳與港都古早味辦桌料理，體驗最接地氣的舌尖美味。',
    image: restaurantDining,
    hours: '11:30 - 14:00 / 17:30 - 21:30',
  },
  {
    name: '跑道星空景觀酒吧 (Sky Runway Lounge)',
    tag: '高空休閒',
    desc: '飯店頂樓 15 樓絕美露天酒吧，270度環景近距離飽覽小港機場客機起降劃破夜空，搭配招牌「大尾鱸鰻特調調酒」，氣氛浪漫滿分。',
    image: presidentialSuite,
    hours: '18:00 - 01:00',
  },
  {
    name: '鱸鰻時光迷你電影放映廳',
    tag: '影音娛樂',
    desc: '住客專屬免費放映廳，24小時輪播豬哥亮經典爆笑錄影帶秀、綜藝大集合與歷代電影精華，提供免費爆米花與古早味冬瓜檸檬。',
    image: moviePromo,
    hours: '24 小時開放',
  },
  {
    name: '萬秀水療三溫暖與景觀健身房',
    tag: '健康養生',
    desc: '配備進口泰諾健 (Technogym) 頂級心肺健身器材、冷熱雙溫水療按摩池與芬蘭檜木烤箱，讓您洗去旅途疲勞，元氣滿滿。',
    image: harborDeluxe,
    hours: '06:30 - 22:30',
  },
];

export const XIAOGANG_ATTRACTIONS = [
  {
    name: '高雄國際機場 (KHH)',
    distance: '車程 3 分鐘 / 步行 8 分鐘',
    desc: '國內外航班便捷樞紐，飯店提供 24 小時專屬穿梭接駁車服務。',
  },
  {
    name: 'SKM Park Outlets 草衙道 (含威秀影城)',
    distance: '車程 8 分鐘 / 捷運 1 站',
    desc: '南台灣首座美式露天 Outlet，設有國賓/威秀頂級影城，可直接使用贈送之《大尾鱸鰻3》電影票觀影！',
  },
  {
    name: '老爸休閒農場 & 機場咖啡賞機區',
    distance: '車程 7 分鐘',
    desc: '小港最著名的露天咖啡看飛機秘境，微風徐徐近距離感受飛機起降的轟鳴震撼。',
  },
  {
    name: '紅毛港文化園區 & 高港高字塔',
    distance: '車程 15 分鐘',
    desc: '欣賞大船入港、貨櫃巨輪與高雄第二港口最美落日，品嚐旋轉餐廳海鮮。',
  },
];

export const HOTEL_FAQS = [
  {
    q: '入住真的可以拿到免費的《大尾鱸鰻3》電影票嗎？',
    a: '真的！這是豬哥亮董事長特別交代給所有入住鄉親的見面禮！凡於本官網預訂任何房型，每房即贈送首映通用電影票兌換券（雙人房贈 2 張、四人房與總統套房贈 4 張），全台特約影城皆可使用，不限平假日！',
  },
  {
    q: '如何獲得會員專屬 88 折優惠？',
    a: '只要在本官網點擊「會員登入/免費加入」，輸入姓名與手機號碼即可在 3 秒內免費開通「萬秀金牌會員」，全館所有房型價格將自動切換為會員 88 折優惠價，訂房即可立即折抵！',
  },
  {
    q: '小港機場與捷運站接駁車如何預約？',
    a: '線上預訂完成後，您可以在備註填寫預計抵達時間或航班編號，或於抵達前 30 分鐘致電飯店櫃檯專線（07-888-8888），接駁專車將在小港機場國際航站 / 捷運小港站 (R3) 2號出口準時恭候。',
  },
  {
    q: '飯店有提供住客免費停車嗎？',
    a: '有的！本飯店備有 B1~B3 專屬地下室內平面停車場，配備 24 小時車牌辨識與電動車 (Tesla/Type 2) 充電樁，住宿期間房客皆可享無限次免費進出停車。',
  },
];
