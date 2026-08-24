// このファイルは自動生成です。手で編集しないこと。
// 再生成: bun run pipeline:derive（pipeline/derive-app-data.ts）
// 進捗（progress）は coverage.json と同じ実データから算出する。**手書きの数字は1つも無い。**
// 計画（plan）は pipeline/registry/roadmap.ts の内容をそのまま載せる（唯一の手書き）。

export interface RoadmapItem {
  title: string;
  status: "now" | "next" | "later";
  why: string;
  needs: string;
  ref?: string;
}

export const ROADMAP_PROGRESS = {
  "fullCount": 1,
  "budgetCount": 186,
  "muniCount": 1741,
  "prefCount": 47,
  "sourceCount": 1229,
  "fileCount": 2419,
  "archivedCount": 1092,
  "licenseOpen": 98,
  "licensePermission": 1021,
  "licenseUnverified": 110,
  "kessanRange": "R2〜R6（5年度）",
  "kofuBudgetRange": "R2〜R8（7年度）",
  "kofuBudgetYears": 7,
  "budgetDepth": [
    {
      "name": "新宿区",
      "code": "131041",
      "years": 26,
      "range": "H13〜R8（26年度）"
    },
    {
      "name": "文京区",
      "code": "131059",
      "years": 22,
      "range": "H16〜R8（22年度）"
    },
    {
      "name": "墨田区",
      "code": "131075",
      "years": 22,
      "range": "H17〜R8（22年度）"
    },
    {
      "name": "大田区",
      "code": "131113",
      "years": 19,
      "range": "H20〜R8（19年度）"
    },
    {
      "name": "いわき市",
      "code": "072044",
      "years": 18,
      "range": "H20〜R8（18年度）"
    },
    {
      "name": "市原市",
      "code": "122190",
      "years": 18,
      "range": "H21〜R8（18年度）"
    },
    {
      "name": "流山市",
      "code": "122203",
      "years": 18,
      "range": "H20〜R8（18年度）"
    },
    {
      "name": "八千代市",
      "code": "122211",
      "years": 18,
      "range": "H18〜R8（18年度）"
    },
    {
      "name": "港区",
      "code": "131032",
      "years": 18,
      "range": "H19〜R8（18年度）"
    },
    {
      "name": "世田谷区",
      "code": "131121",
      "years": 18,
      "range": "H21〜R8（18年度）"
    },
    {
      "name": "下関市",
      "code": "352012",
      "years": 18,
      "range": "H21〜R8（18年度）"
    },
    {
      "name": "高松市",
      "code": "372013",
      "years": 18,
      "range": "H21〜R8（18年度）"
    },
    {
      "name": "府中市",
      "code": "132063",
      "years": 17,
      "range": "H22〜R8（17年度）"
    },
    {
      "name": "練馬区",
      "code": "131202",
      "years": 16,
      "range": "H23〜R8（16年度）"
    },
    {
      "name": "茅ヶ崎市",
      "code": "142077",
      "years": 16,
      "range": "H21〜R8（16年度）"
    },
    {
      "name": "越谷市",
      "code": "112224",
      "years": 15,
      "range": "H24〜R8（15年度）"
    },
    {
      "name": "西東京市",
      "code": "132292",
      "years": 15,
      "range": "H24〜R8（15年度）"
    },
    {
      "name": "徳島市",
      "code": "362018",
      "years": 15,
      "range": "H24〜R8（15年度）"
    },
    {
      "name": "盛岡市",
      "code": "032018",
      "years": 14,
      "range": "H25〜R8（14年度）"
    },
    {
      "name": "つくば市",
      "code": "082201",
      "years": 14,
      "range": "H25〜R8（14年度）"
    },
    {
      "name": "伊勢崎市",
      "code": "102041",
      "years": 14,
      "range": "H23〜R8（14年度）"
    },
    {
      "name": "北区",
      "code": "131172",
      "years": 14,
      "range": "H24〜R8（14年度）"
    },
    {
      "name": "長野市",
      "code": "202011",
      "years": 14,
      "range": "H25〜R8（14年度）"
    },
    {
      "name": "尼崎市",
      "code": "282022",
      "years": 14,
      "range": "H25〜R8（14年度）"
    },
    {
      "name": "高崎市",
      "code": "102024",
      "years": 13,
      "range": "H21〜R8（13年度）"
    },
    {
      "name": "台東区",
      "code": "131067",
      "years": 12,
      "range": "H27〜R8（12年度）"
    },
    {
      "name": "江戸川区",
      "code": "131237",
      "years": 12,
      "range": "H27〜R8（12年度）"
    },
    {
      "name": "富山市",
      "code": "162019",
      "years": 12,
      "range": "H27〜R8（12年度）"
    },
    {
      "name": "宝塚市",
      "code": "282146",
      "years": 12,
      "range": "H17〜R8（12年度）"
    },
    {
      "name": "福島市",
      "code": "072010",
      "years": 11,
      "range": "H28〜R8（11年度）"
    },
    {
      "name": "松戸市",
      "code": "122076",
      "years": 11,
      "range": "H28〜R8（11年度）"
    },
    {
      "name": "江東区",
      "code": "131083",
      "years": 11,
      "range": "H28〜R8（11年度）"
    },
    {
      "name": "葛飾区",
      "code": "131229",
      "years": 11,
      "range": "H28〜R8（11年度）"
    },
    {
      "name": "厚木市",
      "code": "142123",
      "years": 11,
      "range": "H28〜R8（11年度）"
    },
    {
      "name": "大和市",
      "code": "142131",
      "years": 11,
      "range": "H28〜R8（11年度）"
    },
    {
      "name": "岡崎市",
      "code": "232025",
      "years": 11,
      "range": "H28〜R8（11年度）"
    },
    {
      "name": "吹田市",
      "code": "272051",
      "years": 11,
      "range": "H28〜R8（11年度）"
    },
    {
      "name": "奈良市",
      "code": "292010",
      "years": 11,
      "range": "H28〜R8（11年度）"
    },
    {
      "name": "宇都宮市",
      "code": "092011",
      "years": 10,
      "range": "H28〜R8（10年度）"
    },
    {
      "name": "前橋市",
      "code": "102016",
      "years": 10,
      "range": "H29〜R8（10年度）"
    },
    {
      "name": "東京都",
      "code": "130001",
      "years": 10,
      "range": "H29〜R8（10年度）"
    },
    {
      "name": "中央区",
      "code": "131024",
      "years": 10,
      "range": "H29〜R8（10年度）"
    },
    {
      "name": "富士市",
      "code": "222101",
      "years": 10,
      "range": "H29〜R8（10年度）"
    },
    {
      "name": "西宮市",
      "code": "282049",
      "years": 10,
      "range": "H29〜R8（10年度）"
    },
    {
      "name": "佐世保市",
      "code": "422029",
      "years": 10,
      "range": "H19〜R8（10年度）"
    },
    {
      "name": "大分市",
      "code": "442011",
      "years": 10,
      "range": "H29〜R8（10年度）"
    },
    {
      "name": "太田市",
      "code": "102059",
      "years": 9,
      "range": "H30〜R8（9年度）"
    },
    {
      "name": "豊島区",
      "code": "131164",
      "years": 9,
      "range": "H29〜R8（9年度）"
    },
    {
      "name": "松本市",
      "code": "202029",
      "years": 9,
      "range": "H30〜R8（9年度）"
    },
    {
      "name": "福山市",
      "code": "342076",
      "years": 9,
      "range": "H30〜R8（9年度）"
    },
    {
      "name": "久留米市",
      "code": "402036",
      "years": 9,
      "range": "H30〜R8（9年度）"
    },
    {
      "name": "旭川市",
      "code": "012041",
      "years": 8,
      "range": "H31〜R8（8年度）"
    },
    {
      "name": "秋田市",
      "code": "052019",
      "years": 8,
      "range": "H31〜R8（8年度）"
    },
    {
      "name": "船橋市",
      "code": "122041",
      "years": 8,
      "range": "R1〜R8（8年度）"
    },
    {
      "name": "調布市",
      "code": "132080",
      "years": 8,
      "range": "H31〜R8（8年度）"
    },
    {
      "name": "横須賀市",
      "code": "142018",
      "years": 8,
      "range": "H31〜R8（8年度）"
    },
    {
      "name": "豊中市",
      "code": "272035",
      "years": 8,
      "range": "H30〜R8（8年度）"
    },
    {
      "name": "松山市",
      "code": "382019",
      "years": 8,
      "range": "H31〜R8（8年度）"
    },
    {
      "name": "鹿児島市",
      "code": "462012",
      "years": 8,
      "range": "H31〜R8（8年度）"
    },
    {
      "name": "札幌市",
      "code": "011002",
      "years": 7,
      "range": "R2〜R8（7年度）"
    },
    {
      "name": "郡山市",
      "code": "072036",
      "years": 7,
      "range": "R2〜R8（7年度）"
    },
    {
      "name": "川越市",
      "code": "112011",
      "years": 7,
      "range": "R2〜R8（7年度）"
    },
    {
      "name": "上尾市",
      "code": "112194",
      "years": 7,
      "range": "R2〜R8（7年度）"
    },
    {
      "name": "柏市",
      "code": "122173",
      "years": 7,
      "range": "R2〜R8（7年度）"
    },
    {
      "name": "目黒区",
      "code": "131105",
      "years": 7,
      "range": "R2〜R8（7年度）"
    },
    {
      "name": "中野区",
      "code": "131148",
      "years": 7,
      "range": "R2〜R8（7年度）"
    },
    {
      "name": "杉並区",
      "code": "131156",
      "years": 7,
      "range": "R2〜R8（7年度）"
    },
    {
      "name": "荒川区",
      "code": "131181",
      "years": 7,
      "range": "R2〜R8（7年度）"
    },
    {
      "name": "足立区",
      "code": "131211",
      "years": 7,
      "range": "R2〜R8（7年度）"
    },
    {
      "name": "八王子市",
      "code": "132012",
      "years": 7,
      "range": "R2〜R8（7年度）"
    },
    {
      "name": "川崎市",
      "code": "141305",
      "years": 7,
      "range": "R2〜R8（7年度）"
    },
    {
      "name": "藤沢市",
      "code": "142051",
      "years": 7,
      "range": "R2〜R8（7年度）"
    },
    {
      "name": "福井市",
      "code": "182010",
      "years": 7,
      "range": "R2〜R8（7年度）"
    },
    {
      "name": "甲府市",
      "code": "192015",
      "years": 7,
      "range": "R2〜R8（7年度）"
    },
    {
      "name": "名古屋市",
      "code": "231002",
      "years": 7,
      "range": "R2〜R8（7年度）"
    },
    {
      "name": "一宮市",
      "code": "232033",
      "years": 7,
      "range": "H25〜R8（7年度）"
    },
    {
      "name": "四日市市",
      "code": "242021",
      "years": 7,
      "range": "R2〜R8（7年度）"
    },
    {
      "name": "京都市",
      "code": "261009",
      "years": 7,
      "range": "R2〜R8（7年度）"
    },
    {
      "name": "明石市",
      "code": "282031",
      "years": 7,
      "range": "R2〜R8（7年度）"
    },
    {
      "name": "加古川市",
      "code": "282103",
      "years": 7,
      "range": "R2〜R8（7年度）"
    },
    {
      "name": "岡山市",
      "code": "331007",
      "years": 7,
      "range": "R2〜R8（7年度）"
    },
    {
      "name": "北九州市",
      "code": "401005",
      "years": 7,
      "range": "R2〜R8（7年度）"
    },
    {
      "name": "福岡市",
      "code": "401307",
      "years": 7,
      "range": "R2〜R8（7年度）"
    },
    {
      "name": "宮崎市",
      "code": "452017",
      "years": 7,
      "range": "R2〜R8（7年度）"
    },
    {
      "name": "青森市",
      "code": "022012",
      "years": 6,
      "range": "R3〜R8（6年度）"
    },
    {
      "name": "八戸市",
      "code": "022039",
      "years": 6,
      "range": "R3〜R8（6年度）"
    },
    {
      "name": "水戸市",
      "code": "082015",
      "years": 6,
      "range": "H30〜R8（6年度）"
    },
    {
      "name": "市川市",
      "code": "122033",
      "years": 6,
      "range": "R3〜R8（6年度）"
    },
    {
      "name": "千代田区",
      "code": "131016",
      "years": 6,
      "range": "R2〜R8（6年度）"
    },
    {
      "name": "横浜市",
      "code": "141003",
      "years": 6,
      "range": "R3〜R8（6年度）"
    },
    {
      "name": "平塚市",
      "code": "142034",
      "years": 6,
      "range": "R2〜R7（6年度）"
    },
    {
      "name": "長岡市",
      "code": "152021",
      "years": 6,
      "range": "R2〜R8（6年度）"
    },
    {
      "name": "春日井市",
      "code": "232068",
      "years": 6,
      "range": "R3〜R8（6年度）"
    },
    {
      "name": "八尾市",
      "code": "272124",
      "years": 6,
      "range": "R3〜R8（6年度）"
    },
    {
      "name": "呉市",
      "code": "342025",
      "years": 6,
      "range": "R2〜R8（6年度）"
    },
    {
      "name": "長崎市",
      "code": "422011",
      "years": 6,
      "range": "H29〜R8（6年度）"
    },
    {
      "name": "所沢市",
      "code": "112089",
      "years": 5,
      "range": "R4〜R8（5年度）"
    },
    {
      "name": "品川区",
      "code": "131091",
      "years": 5,
      "range": "R4〜R8（5年度）"
    },
    {
      "name": "浜松市",
      "code": "221309",
      "years": 5,
      "range": "R4〜R8（5年度）"
    },
    {
      "name": "豊田市",
      "code": "232114",
      "years": 5,
      "range": "R4〜R8（5年度）"
    },
    {
      "name": "大津市",
      "code": "252018",
      "years": 5,
      "range": "R4〜R8（5年度）"
    },
    {
      "name": "堺市",
      "code": "271403",
      "years": 5,
      "range": "R2〜R8（5年度）"
    },
    {
      "name": "高槻市",
      "code": "272078",
      "years": 5,
      "range": "R4〜R8（5年度）"
    },
    {
      "name": "姫路市",
      "code": "282014",
      "years": 5,
      "range": "R4〜R8（5年度）"
    },
    {
      "name": "倉敷市",
      "code": "332020",
      "years": 5,
      "range": "R3〜R8（5年度）"
    },
    {
      "name": "高知市",
      "code": "392014",
      "years": 5,
      "range": "H30〜R8（5年度）"
    },
    {
      "name": "渋谷区",
      "code": "131130",
      "years": 4,
      "range": "R5〜R8（4年度）"
    },
    {
      "name": "板橋区",
      "code": "131199",
      "years": 4,
      "range": "R5〜R8（4年度）"
    },
    {
      "name": "豊橋市",
      "code": "232017",
      "years": 4,
      "range": "R3〜R8（4年度）"
    },
    {
      "name": "那覇市",
      "code": "472018",
      "years": 4,
      "range": "R4〜R8（4年度）"
    },
    {
      "name": "草加市",
      "code": "112216",
      "years": 3,
      "range": "R6〜R8（3年度）"
    },
    {
      "name": "岐阜市",
      "code": "212016",
      "years": 3,
      "range": "R6〜R8（3年度）"
    },
    {
      "name": "静岡市",
      "code": "221007",
      "years": 3,
      "range": "R6〜R8（3年度）"
    },
    {
      "name": "津市",
      "code": "242012",
      "years": 3,
      "range": "R6〜R8（3年度）"
    },
    {
      "name": "枚方市",
      "code": "272108",
      "years": 3,
      "range": "R5〜R8（3年度）"
    },
    {
      "name": "神戸市",
      "code": "281000",
      "years": 3,
      "range": "R6〜R8（3年度）"
    },
    {
      "name": "山形市",
      "code": "062014",
      "years": 2,
      "range": "R7〜R8（2年度）"
    },
    {
      "name": "さいたま市",
      "code": "111007",
      "years": 2,
      "range": "R7〜R8（2年度）"
    },
    {
      "name": "春日部市",
      "code": "112143",
      "years": 2,
      "range": "R6〜R8（2年度）"
    },
    {
      "name": "千葉市",
      "code": "121002",
      "years": 2,
      "range": "R4〜R8（2年度）"
    },
    {
      "name": "新潟市",
      "code": "151009",
      "years": 2,
      "range": "R7〜R8（2年度）"
    },
    {
      "name": "金沢市",
      "code": "172014",
      "years": 2,
      "range": "R4〜R5（2年度）"
    },
    {
      "name": "三重県",
      "code": "240001",
      "years": 2,
      "range": "R7〜R8（2年度）"
    },
    {
      "name": "東大阪市",
      "code": "272272",
      "years": 2,
      "range": "R7〜R8（2年度）"
    },
    {
      "name": "和歌山市",
      "code": "302015",
      "years": 2,
      "range": "R7〜R8（2年度）"
    },
    {
      "name": "佐賀市",
      "code": "412015",
      "years": 2,
      "range": "R5〜R8（2年度）"
    }
  ],
  "kofuDetail": {
    "kessan": "R2〜R6（5年度）",
    "budget": "R2〜R8（7年度）",
    "projects": "R2〜R8（7年度）・計482件",
    "report": "令和7年度2件 / 令和6年度3件（公表サンプルのみ）",
    "council": "R2〜R8（7年度）・議決つき",
    "execution": "R1〜R7（7年度）",
    "evaluation": "H29〜R7（9年度）・約1,500件",
    "outturn": "H30〜R6（7年度）"
  }
} as const;

export const ROADMAP_PLAN: RoadmapItem[] = [
  {
    "title": "事業報告（成果）を款へ紐付けられる市へ広げる",
    "status": "next",
    "why": "予算 → 執行 → 成果 の鎖の最後。川崎・横浜・札幌の3政令市で全量収録が揃い、請求なしで鎖が閉じることは確立した。さいたま・京都・北九州の成果説明書は款項を持つので、収録できれば款→事業→成果が一本で繋がる（款への紐付けは横浜の歳出予算科目に次ぐ2例目以降になる）。",
    "needs": "様式が市ごとに違い、評価体系も違う（甲府=A〜F／川崎=達成度1〜5＋方向性Ⅰ〜Ⅴ／横浜=7軸カテゴリ／札幌=自由記述）ので、丸めずに出し分ける設計を毎回起こす。札幌の過年度（H24〜R6 の13年分）はリポジトリ肥大の判断があって最新年度に絞っており、多年度化は事業コードの安定性を使えば後からできる。",
    "ref": "docs/data-sources.md §8b・§8f・§8j・§8t"
  },
  {
    "title": "主な事業（政令市）",
    "status": "now",
    "why": "款ドリルダウンで「この款は何に使われるのか」を事業名まで下ろせる。甲府では83事業、横浜では1,580事業を収録済み。20政令市の当初予算が揃ったので、次はこの縦掘り。",
    "needs": "様式が市ごとに違い、既存のどれにも当てはまらない（横浜=局別の事業計画書・川崎=15列の表・名古屋=1事業1シート・福岡=2階層・浜松=款つき一覧・相模原=款項目つき）。多くの市は款が紐付かない（局は組織であって款ではない）ためダッシュボードの一覧になるが、浜松・相模原・北九州は款を持つので款ドリルに出せる。全市で特別会計・企業会計の混入を外す設計が要る。前年度額を持たない市も多い。",
    "ref": "docs/data-sources.md §8b・§8o・§8p"
  },
  {
    "title": "東京特別区",
    "status": "now",
    "why": "未収録の人口上位に多数残っている（世田谷92万・練馬・大田・足立・江戸川…）。東京都と23区の全24団体を偵察し、いずれも当初予算の款別と前年当初比較が取れることを確認した。千代田から順に収録している。",
    "needs": "23区に統一様式は無く、款体系が区ごとに全部違う（消防費が無い・地方交付税が無い・特別区交付金がある、といった都区財政調整に由来する部分だけが共通）。様式ごとにパーサの手当てが要り、資料の形も PDF・CSV・Excel に分かれる。ライセンスも区ごとに違い、予算データ自体をオープンデータで出す区と、二次利用を明示的に禁じる区が混在する。",
    "ref": "docs/data-sources.md §10"
  },
  {
    "title": "款より下（項・目・節）の内訳を広げる",
    "status": "now",
    "why": "「民生費 1,000億」の内訳を追えるようにする。横浜は当初予算の款項目を収録して項・目まで開け、年度によっては項・目の前年比も出せる。ほかの自治体はまだ款までで、甲府の項レベルは決算値で代替表示している。",
    "needs": "自治体ごとに原典の形が違う。甲府は予算書本編がウェブ未公開＝情報公開請求。推計はしない（一次資料が無ければ載せない）。"
  },
  {
    "title": "ライセンス未確認の資料の棚卸し",
    "status": "later",
    "why": "一次資料の写しを自サーバーから配信しているため、利用条件の確認は「あとで」では済まない。区分は /coverage で全件公開している。",
    "needs": "未確認の多くは「利用条件は同サイト参照」のプレースホルダで、原文を調べれば区分が動く。あわせて、著作権法32条2項（行政の広報資料は出典明示のうえ転載可・ただし禁止表示があれば不可）で説明できるかの論点が未決。横浜は発行元自身が「数値データ・簡単な表は自由に利用できる」と明示している。",
    "ref": "docs/data-strategy.md【未決】"
  },
  {
    "title": "一次資料の転送量（調査済み・現状は対応しない）",
    "status": "later",
    "why": "資料の消失に備えて原本の写しを自サーバーから配信しているため、PDF が開かれるたびにその大きさが転送される。無料枠は月100GBで、全資料を1人が1回ずつ開くと約540人ぶんにあたる。",
    "needs": "「必要なページだけ取る」は成立しないことを実測で確認した — 発行元の PDF が web 最適化（linearize）されておらず、PDF ビューアは結局ファイル全体を読む。作り直せば最適化できるがファイルのハッシュが変わり、第三者が外部アーカイブと突き合わせて同一性を検証できなくなる（それがこのサイトの土台なので採らない）。当面は現状のままとし、閲覧が増えたら有料枠へ移す。",
    "ref": "docs/data-strategy.md"
  },
  {
    "title": "補正予算",
    "status": "later",
    "why": "当初予算がその後どう変わったかを追える。現在は当初予算のみで、補正は未収録。",
    "needs": "甲府 R8 の補正はまだ編成されていない（新年度）。9月議会以降に注視する。"
  },
  {
    "title": "自治体を全国へ広げる",
    "status": "later",
    "why": "決算ベース（総務省）なら全国どの市区町村でも見られる。予算ベースは人口の多い順に整備しており、山梨県内は町村まで降りている。",
    "needs": "予算資料は自治体ごとに様式が割れる。1自治体ずつ偵察 → 収録の手続き（source-scout / ingest-source）に乗せて進める。スキャン画像 PDF の自治体は決定的にパースできず収録できない。",
    "ref": "docs/data-strategy.md"
  }
];
