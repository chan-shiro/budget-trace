// このファイルは自動生成です。手で編集しないこと。
// 再生成: bun run pipeline:derive（pipeline/derive-app-data.ts）
// 出典: 甲府市 行政評価（事務事業評価）結果一覧 H29〜R7（形式の年度差は docs/data-sources.md）

export interface KofuEvaluationItem {
  /** 実施計画掲載事業名 / 事務事業名 */
  name: string;
  /** 総合評価（A〜F、完了、－=評価なし） */
  grade: string;
  prevGrade: string | null;
  /** 予算名（R6・R7 のみ。主な事業の予算書名と厳密一致で突合できる） */
  budgetName: string | null;
  bu: string | null;
  ka: string | null;
  /** 来歴（原資料ファイル内の位置） */
  ref: string;
}

export interface KofuEvaluationYear {
  fy: string;
  fyLabel: string;
  sourceTitle: string;
  /** リンク用 URL（Wayback コピー優先） */
  sourceUrl: string;
  originUrl: string;
  /** 自サーバー配信コピー（PDF のみ） */
  sourceLocalUrl: string;
  items: KofuEvaluationItem[];
}

/** 事務事業評価（新しい年度順） */
export const KOFU_EVALUATION_YEARS: KofuEvaluationYear[] = [
  {
    "fy": "R7",
    "fyLabel": "令和7年度",
    "sourceTitle": "令和7年度 甲府市行政評価（事務事業評価）結果一覧",
    "sourceUrl": "https://web.archive.org/web/20260712142225/https://www.city.kofu.yamanashi.jp/zaise/documents/7kouhyouyou2.xlsx",
    "originUrl": "https://www.city.kofu.yamanashi.jp/zaise/documents/7kouhyouyou2.xlsx",
    "sourceLocalUrl": "/sources/kofu-gyousei-hyouka-r7/7kouhyouyou2.xlsx",
    "items": [
      {
        "name": "放課後児童クラブ事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "放課後児童クラブ事業費",
        "bu": "子ども",
        "ka": "子ども保育",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !3"
      },
      {
        "name": "教育･保育施設等運営給付事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "教育･保育施設等運営給付費",
        "bu": "子ども",
        "ka": "子ども保育",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !4"
      },
      {
        "name": "幼児教育施設利用費等助成事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "幼児教育施設利用費等助成事業費",
        "bu": "子ども",
        "ka": "子ども保育",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !5"
      },
      {
        "name": "すこやか子育て医療費助成事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "すこやか子育て医療費助成事業",
        "bu": "子ども",
        "ka": "子育て支援",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !6"
      },
      {
        "name": "ひとり親家庭等医療費助成事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "ひとり親家庭等医療費助成事業",
        "bu": "子ども",
        "ka": "子育て支援",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !7"
      },
      {
        "name": "多子世帯等への利用者負担額（保育料）軽減事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "多子世帯等への利用者負担額（保育料）軽減事業",
        "bu": "子ども",
        "ka": "子ども保育",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !8"
      },
      {
        "name": "妊娠・子育て応援給付金事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "妊娠・子育て応援給付金事業費",
        "bu": "子ども",
        "ka": "母子保健",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !9"
      },
      {
        "name": "子育て総合相談窓口運営事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "子育て総合相談窓口運営事業費",
        "bu": "子ども",
        "ka": "子育て支援",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !10"
      },
      {
        "name": "母子保健事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "母子保健事業費",
        "bu": "子ども",
        "ka": "母子保健",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !11"
      },
      {
        "name": "子ども応援事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "子ども応援事業費",
        "bu": "子ども",
        "ka": "子ども応援",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !13"
      },
      {
        "name": "（仮称）子ども応援拠点施設整備事業",
        "grade": "－",
        "prevGrade": "R7新規",
        "budgetName": null,
        "bu": "子ども",
        "ka": "総務",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !14"
      },
      {
        "name": "放課後子供教室推進事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "放課後子供教室推進事業費",
        "bu": "教育",
        "ka": "生涯学習",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !15"
      },
      {
        "name": "子ども運動遊び事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "子ども運動遊び事業費",
        "bu": "子ども",
        "ka": "子ども応援",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !16"
      },
      {
        "name": "小学校外国語活動推進事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "小学校外国語活動推進事業費",
        "bu": "教育",
        "ka": "学校教育",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !17"
      },
      {
        "name": "外国人講師による英語指導事業（中学校）",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "外国人講師による英語指導事業費（中）",
        "bu": "教育",
        "ka": "学校教育",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !18"
      },
      {
        "name": "サポートティーチャー事業(小学校)",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "サポートティーチャー事業費(小)",
        "bu": "教育",
        "ka": "学校教育",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !19"
      },
      {
        "name": "サポートティーチャー事業(中学校)",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "サポートティーチャー事業費(中)",
        "bu": "教育",
        "ka": "学校教育",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !20"
      },
      {
        "name": "新しい時代を担う人づくり基金事業(甲府の教育推進事業）",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "新しい時代を担う人づくり基金事業費",
        "bu": "教育",
        "ka": "学校教育",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !21"
      },
      {
        "name": "学校危機管理体制整備事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "学校危機管理体制整備事業費",
        "bu": "教育",
        "ka": "学校教育",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !22"
      },
      {
        "name": "学校給食事業（小学校）",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "学校給食費（小）",
        "bu": "教育",
        "ka": "学事",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !23"
      },
      {
        "name": "学校給食事業（中学校）",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "学校給食費（中）",
        "bu": "教育",
        "ka": "学事",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !24"
      },
      {
        "name": "小学校校舎整備拡充事業",
        "grade": "B",
        "prevGrade": "R6新規",
        "budgetName": "小学校校舎整備拡充事業費",
        "bu": "まち",
        "ka": "建築営繕",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !25"
      },
      {
        "name": "小学校老朽化リニューアル事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "小学校老朽化リニューアル事業費",
        "bu": "教育",
        "ka": "教育施設",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !26"
      },
      {
        "name": "中学校老朽化リニューアル事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "中学校老朽化リニューアル事業費",
        "bu": "教育",
        "ka": "教育施設",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !27"
      },
      {
        "name": "小学校体育館空調設備設置事業",
        "grade": "－",
        "prevGrade": "R7新規",
        "budgetName": null,
        "bu": "教育",
        "ka": "教育施設",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !28"
      },
      {
        "name": "中学校体育館空調設備設置事業",
        "grade": "－",
        "prevGrade": "R7新規",
        "budgetName": null,
        "bu": "教育",
        "ka": "教育施設",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !29"
      },
      {
        "name": "教材・情報環境整備事業（小学校）",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "教材・情報環境整備事業費（小）",
        "bu": "教育",
        "ka": "学事",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !30"
      },
      {
        "name": "教材・情報環境整備事業（中学校）",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "教材・情報環境整備事業費（中）",
        "bu": "教育",
        "ka": "学事",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !31"
      },
      {
        "name": "外国人講師による英語指導事業（高校）",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "外国人講師による英語指導事業費（高）",
        "bu": "教育",
        "ka": "学校教育",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !32"
      },
      {
        "name": "青少年健全育成事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "青少年健全育成費",
        "bu": "子ども",
        "ka": "子ども応援",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !33"
      },
      {
        "name": "生涯学習振興事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "生涯学習振興事業費",
        "bu": "教育",
        "ka": "生涯学習",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !34"
      },
      {
        "name": "図書館管理運営事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "図書館管理運営費",
        "bu": "教育",
        "ka": "図書館",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !35"
      },
      {
        "name": "こうふ開府500年レガシー事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "こうふ開府500年レガシー事業費",
        "bu": "教育",
        "ka": "生涯学習",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !36"
      },
      {
        "name": "スポーツ振興事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "スポーツ振興事業費",
        "bu": "教育",
        "ka": "スポーツ",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !37"
      },
      {
        "name": "緑が丘スポーツ公園整備事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "緑が丘スポーツ公園整備事業費",
        "bu": "まち",
        "ka": "公園緑地",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !38"
      },
      {
        "name": "文化芸術推進事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "文化芸術推進事業費",
        "bu": "教育",
        "ka": "生涯学習",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !39"
      },
      {
        "name": "史跡武田氏館跡整備事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "史跡武田氏館跡整備事業費",
        "bu": "教育",
        "ka": "歴史文化財",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !40"
      },
      {
        "name": "文化財保護事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "文化財保護費",
        "bu": "教育",
        "ka": "歴史文化財",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !41"
      },
      {
        "name": "人権推進事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "人権推進事業費",
        "bu": "市民",
        "ka": "人権男女参画",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !42"
      },
      {
        "name": "平和都市宣言事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "平和都市宣言事業費",
        "bu": "市民",
        "ka": "総務",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !43"
      },
      {
        "name": "男女共同参画推進事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "男女共同参画推進事業費",
        "bu": "市民",
        "ka": "人権男女参画",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !44"
      },
      {
        "name": "国際交流事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "国際交流事業費",
        "bu": "市長",
        "ka": "国際交流",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !45"
      },
      {
        "name": "新しい時代を担う人づくり基金事業(姉妹・友好都市教育交流事業)",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "姉妹・友好都市教育交流事業費",
        "bu": "教育",
        "ka": "学校教育",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !46"
      },
      {
        "name": "多文化共生推進事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "多文化共生推進事業費",
        "bu": "市長市民",
        "ka": "国際交流市民",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !47"
      },
      {
        "name": "商工業推進事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "商工業推進事業費",
        "bu": "産業",
        "ka": "商工",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !48"
      },
      {
        "name": "融資対策事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "融資対策事業費",
        "bu": "産業",
        "ka": "商工",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !49"
      },
      {
        "name": "産業立地等推進事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "産業立地等推進事業費",
        "bu": "産業",
        "ka": "企業立地雇用推進",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !50"
      },
      {
        "name": "地場産業振興対策事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "地場産業振興対策事業費",
        "bu": "産業",
        "ka": "商工",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !51"
      },
      {
        "name": "農業経営基盤強化促進対策事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "農業経営基盤強化促進対策事業費",
        "bu": "産業",
        "ka": "就農支援",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !52"
      },
      {
        "name": "産地保全強化対策事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "産地保全強化対策事業費",
        "bu": "産業",
        "ka": "農政",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !53"
      },
      {
        "name": "森づくり推進事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "森づくり推進事業費",
        "bu": "産業",
        "ka": "林政",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !54"
      },
      {
        "name": "林道維持管理事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "林道維持管理事業費",
        "bu": "産業",
        "ka": "林政",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !55"
      },
      {
        "name": "雇用促進対策事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "雇用促進対策事業費",
        "bu": "産業",
        "ka": "企業立地雇用推進",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !56"
      },
      {
        "name": "地方卸売市場運営事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "地方卸売市場会計",
        "bu": "産業",
        "ka": "市場",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !57"
      },
      {
        "name": "地方卸売市場施設整備事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "地方卸売市場会計",
        "bu": "産業",
        "ka": "市場",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !58"
      },
      {
        "name": "まつり推進事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "まつり推進事業費",
        "bu": "産業",
        "ka": "観光",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !59"
      },
      {
        "name": "観光開発事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "観光開発事業費",
        "bu": "産業",
        "ka": "観光",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !60"
      },
      {
        "name": "中心市街地商業等活性化事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "中心市街地商業等活性化事業費",
        "bu": "産業",
        "ka": "中心市街地振興",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !61"
      },
      {
        "name": "甲府城周辺地域活性化計画整備事業",
        "grade": "完了",
        "prevGrade": "B",
        "budgetName": "甲府城周辺地域活性化計画整備事業費",
        "bu": "産業",
        "ka": "観光",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !62"
      },
      {
        "name": "春日本通り線整備事業",
        "grade": "完了",
        "prevGrade": "B",
        "budgetName": "春日本通り線整備事業費",
        "bu": "まち",
        "ka": "道路河川",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !63"
      },
      {
        "name": "優良建築物等整備事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "優良建築物等整備事業費",
        "bu": "まち",
        "ka": "都市計画",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !64"
      },
      {
        "name": "移住・定住促進事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "移住・定住促進事業費",
        "bu": "企画",
        "ka": "連携共創",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !65"
      },
      {
        "name": "南北地域振興事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "南北地域振興事業費",
        "bu": "産業",
        "ka": "総務林政",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !66"
      },
      {
        "name": "防災対策整備事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "防災対策整備事業費",
        "bu": "市長",
        "ka": "防災企画地域防災",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !67"
      },
      {
        "name": "一般河川改修事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "一般河川改修事業費",
        "bu": "まち",
        "ka": "道路河川",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !68"
      },
      {
        "name": "危機管理対策事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "危機管理対策事業費（安全安心街づくり事業）",
        "bu": "市長",
        "ka": "危機管理",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !69"
      },
      {
        "name": "盛土規制法規制区域指定基礎調査事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "盛土規制法規制区域指定基礎調査事業費",
        "bu": "産業",
        "ka": "林政",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !70"
      },
      {
        "name": "消火栓設置事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "消火栓設置事業費",
        "bu": "消防",
        "ka": "警防",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !71"
      },
      {
        "name": "消防施設等整備事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "消防施設等整備事業費",
        "bu": "消防",
        "ka": "警防",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !72"
      },
      {
        "name": "非常備消防事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "非常備消防費",
        "bu": "消防",
        "ka": "人事警防",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !73"
      },
      {
        "name": "交通安全対策事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "交通安全対策事業費",
        "bu": "市民",
        "ka": "総務",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !74"
      },
      {
        "name": "安全安心街づくり事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "安全安心街づくり事業費",
        "bu": "市長",
        "ka": "危機管理",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !75"
      },
      {
        "name": "街路灯助成事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "街路灯助成事業費",
        "bu": "市民",
        "ka": "協働推進",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !76"
      },
      {
        "name": "学校安全安心推進事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "学校安全安心推進事業費",
        "bu": "教育",
        "ka": "学事",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !77"
      },
      {
        "name": "交通安全施設整備事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "交通安全施設整備事業費",
        "bu": "まち",
        "ka": "道路河川",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !78"
      },
      {
        "name": "消費者啓発育成事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "消費者啓発育成事業費",
        "bu": "市民",
        "ka": "総務",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !79"
      },
      {
        "name": "生きがい対策事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "生きがい対策事業費",
        "bu": "福祉",
        "ka": "長寿介護",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !80"
      },
      {
        "name": "地域支援事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "介護保険事業特別会計3款",
        "bu": "福祉保健",
        "ka": "長寿介護地域包括支援地域保健",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !81"
      },
      {
        "name": "成年後見制度普及促進事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "成年後見制度普及促進事業費",
        "bu": "福祉",
        "ka": "長寿介護",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !82"
      },
      {
        "name": "重度心身障害者医療費助成事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "重度心身障害者医療費助成事業費",
        "bu": "福祉",
        "ka": "障がい福祉",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !83"
      },
      {
        "name": "自立支援サービス事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "自立支援サービス事業費",
        "bu": "福祉",
        "ka": "障がい福祉",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !84"
      },
      {
        "name": "障害者のすみよいまちづくり事業",
        "grade": "B",
        "prevGrade": "A",
        "budgetName": "障害者のすみよいまちづくり事業費",
        "bu": "福祉",
        "ka": "障がい福祉",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !85"
      },
      {
        "name": "地域生活支援事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "地域生活支援事業費",
        "bu": "福祉",
        "ka": "障がい福祉",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !86"
      },
      {
        "name": "生活保護扶助事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "生活保護扶助費",
        "bu": "福祉",
        "ka": "生活福祉",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !87"
      },
      {
        "name": "生活困窮者自立支援事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "生活困窮者自立支援事業費",
        "bu": "福祉",
        "ka": "生活福祉",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !88"
      },
      {
        "name": "国民健康保険事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "国民健康保険事業会計（事業勘定）",
        "bu": "福祉",
        "ka": "健康保険",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !89"
      },
      {
        "name": "健康政策推進事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "健康政策推進事業費",
        "bu": "保健",
        "ka": "健康政策",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !90"
      },
      {
        "name": "健康づくり推進事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "健康づくり推進事業費",
        "bu": "保健",
        "ka": "地域保健",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !91"
      },
      {
        "name": "精神保健福祉事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "精神保健福祉事業費",
        "bu": "保健",
        "ka": "精神保健",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !93"
      },
      {
        "name": "健康診査事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "健康診査費",
        "bu": "保健",
        "ka": "地域保健",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !94"
      },
      {
        "name": "各種予防事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "各種予防事業費",
        "bu": "保健",
        "ka": "医務感染症",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !95"
      },
      {
        "name": "感染症対策事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "感染症対策事業費",
        "bu": "保健",
        "ka": "医務感染症",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !96"
      },
      {
        "name": "病院経営推進事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "病院経営推進事業費（病院事業会計）",
        "bu": "病院",
        "ka": "経営企画",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !97"
      },
      {
        "name": "地域医療連携事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "地域医療連携事業費（病院事業会計）",
        "bu": "病院",
        "ka": "総務総合相談センター",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !98"
      },
      {
        "name": "救急医療体制整備事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "救急医療体制整備事業費",
        "bu": "保健",
        "ka": "医務感染症",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !99"
      },
      {
        "name": "地球温暖化対策事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "地球温暖化対策事業費",
        "bu": "環境",
        "ka": "環境政策",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !101"
      },
      {
        "name": "都市美化事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "都市美化事業費",
        "bu": "環境",
        "ka": "ごみ収集",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !102"
      },
      {
        "name": "環境対策事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "環境対策事業費",
        "bu": "環境",
        "ka": "環境保全",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !103"
      },
      {
        "name": "遊亀公園・附属動物園整備事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "遊亀公園・附属動物園整備事業費",
        "bu": "まち",
        "ka": "公園緑地",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !104"
      },
      {
        "name": "ごみ減量と資源リサイクル事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "ごみ減量と資源リサイクル事業費",
        "bu": "環境",
        "ka": "ごみ減量",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !105"
      },
      {
        "name": "景観まちづくり推進事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "景観まちづくり推進事業費",
        "bu": "まち",
        "ka": "都市計画",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !106"
      },
      {
        "name": "住宅管理事務",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "住宅管理費",
        "bu": "まち",
        "ka": "住宅",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !107"
      },
      {
        "name": "建築物耐震化支援事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "建築物耐震化支援事業費",
        "bu": "まち",
        "ka": "建築指導",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !108"
      },
      {
        "name": "空家等対策推進事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "空家等対策推進事業費",
        "bu": "まち",
        "ka": "空き家対策",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !109"
      },
      {
        "name": "水源保全活動推進事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "市民との協働による水源保全（水道事業会計）",
        "bu": "上下",
        "ka": "水保全",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !110"
      },
      {
        "name": "水源域の水質調査事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "荒川流域及び地下水の水質対策（水道事業会計）",
        "bu": "上下",
        "ka": "浄水",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !111"
      },
      {
        "name": "水道管路耐震化事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "経年管路の更新",
        "bu": "上下",
        "ka": "水道",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !112"
      },
      {
        "name": "汚水管きょ整備事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "公共下水道事業の汚水管きょ整備",
        "bu": "上下",
        "ka": "計画下水道",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !113"
      },
      {
        "name": "下水道接続促進事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "下水道への接続促進",
        "bu": "上下",
        "ka": "給排水",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !114"
      },
      {
        "name": "下水道地震対策事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "下水道地震対策整備（下水道事業会計）",
        "bu": "上下",
        "ka": "下水道浄化センター",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !115"
      },
      {
        "name": "動物愛護事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "動物愛護事業費",
        "bu": "保健",
        "ka": "衛生薬務",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !116"
      },
      {
        "name": "生活衛生事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "生活衛生事業費",
        "bu": "保健",
        "ka": "衛生薬務",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !117"
      },
      {
        "name": "公共交通体系整備推進事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "公共交通体系整備推進事業費",
        "bu": "企画",
        "ka": "リニア政策",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !118"
      },
      {
        "name": "バス利用促進対策事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "バス利用促進対策事業費",
        "bu": "企画",
        "ka": "交通政策",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !120"
      },
      {
        "name": "在来鉄道の利便性向上事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "在来鉄道の利便性向上事業費",
        "bu": "企画",
        "ka": "交通政策",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !121"
      },
      {
        "name": "和戸町竜王線整備事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "和戸町竜王線整備事業費",
        "bu": "まち",
        "ka": "都市整備",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !122"
      },
      {
        "name": "城東三丁目敷島線整備事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "城東三丁目敷島線整備事業費",
        "bu": "まち",
        "ka": "都市整備",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !123"
      },
      {
        "name": "住吉四丁目善光寺線整備事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "住吉四丁目善光寺線整備事業費",
        "bu": "まち",
        "ka": "都市整備",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !124"
      },
      {
        "name": "高畑町昇仙峡整備事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "まち",
        "ka": "都市整備",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !125"
      },
      {
        "name": "市道新設改良事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "市道新設改良事業費",
        "bu": "まち",
        "ka": "都市整備",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !126"
      },
      {
        "name": "橋りょう長寿命化修繕事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "橋りょう長寿命化修繕事業費",
        "bu": "まち",
        "ka": "道路河川",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !127"
      },
      {
        "name": "道路維持管理事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "道路維持管理事業費",
        "bu": "まち",
        "ka": "道路河川",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !128"
      },
      {
        "name": "甲府駅周辺土地区画整理事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "甲府駅周辺土地区画整理事業費",
        "bu": "まち",
        "ka": "区画整理",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !129"
      },
      {
        "name": "都市基本計画推進事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "都市基本計画推進事業費",
        "bu": "まち",
        "ka": "都市計画",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !130"
      },
      {
        "name": "地籍調査事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "地籍調査事業費",
        "bu": "まち",
        "ka": "地籍調査",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !131"
      },
      {
        "name": "地域デザイン推進事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "地域デザイン推進事業費",
        "bu": "企画",
        "ka": "地域デザイン",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !132"
      },
      {
        "name": "まちづくり計画推進事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "まちづくり計画推進事業費",
        "bu": "市民",
        "ka": "協働推進",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !133"
      },
      {
        "name": "協働づくり推進事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "協働づくり推進事業費",
        "bu": "市民",
        "ka": "協働推進",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !134"
      },
      {
        "name": "地域のまちづくり支援事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "地域のまちづくり支援事業費",
        "bu": "市民",
        "ka": "協働推進",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !135"
      },
      {
        "name": "市民組織事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "市民組織費",
        "bu": "市民",
        "ka": "協働推進",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !136"
      },
      {
        "name": "地域集会施設整備助成事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "地域集会施設整備助成事業費",
        "bu": "市民",
        "ka": "協働推進",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !137"
      },
      {
        "name": "広報推進事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "広報推進事業費",
        "bu": "市長",
        "ka": "情報発信",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !138"
      },
      {
        "name": "広聴活動事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "広聴活動費",
        "bu": "市民",
        "ka": "協働推進",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !139"
      },
      {
        "name": "連携推進事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "連携推進事業費",
        "bu": "企画",
        "ka": "連携共創",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !140"
      },
      {
        "name": "総合計画策定事業",
        "grade": "B",
        "prevGrade": "R6新規",
        "budgetName": "総合計画策定事業費",
        "bu": "企画",
        "ka": "総合計画",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !141"
      },
      {
        "name": "職員研修事業",
        "grade": "A",
        "prevGrade": "A",
        "budgetName": "職員研修事業費",
        "bu": "総務",
        "ka": "人材マネジメント",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !142"
      },
      {
        "name": "公共施設等マネジメント推進事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "公共施設等マネジメント推進事業費",
        "bu": "企画",
        "ka": "財産活用",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !143"
      },
      {
        "name": "ふるさと応援寄附金推進事業",
        "grade": "A",
        "prevGrade": "A",
        "budgetName": "ふるさと応援寄附金推進事業費",
        "bu": "産業",
        "ka": "ふるさと納税",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !144"
      },
      {
        "name": "ＳＤＧｓ推進事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "企画",
        "ka": "連携共創",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !145"
      },
      {
        "name": "シティプロモーション事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "シティプロモーション事業",
        "bu": "市長",
        "ka": "情報発信",
        "ref": "7kouhyouyou2.xlsx#第1号様式 !146"
      }
    ]
  },
  {
    "fy": "R6",
    "fyLabel": "令和6年度",
    "sourceTitle": "令和6年度 甲府市行政評価（事務事業評価）結果一覧",
    "sourceUrl": "https://web.archive.org/web/20260712140404/https://www.city.kofu.yamanashi.jp/zaise/documents/6kouhyouyou6.xlsx",
    "originUrl": "https://www.city.kofu.yamanashi.jp/zaise/documents/6kouhyouyou6.xlsx",
    "sourceLocalUrl": "/sources/kofu-gyousei-hyouka-r6/6kouhyouyou6.xlsx",
    "items": [
      {
        "name": "放課後児童クラブ事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "放課後児童クラブ事業費",
        "bu": "子ども",
        "ka": "子ども保育",
        "ref": "6kouhyouyou6.xlsx#公表用!6"
      },
      {
        "name": "教育･保育施設等運営給付事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "教育･保育施設等運営給付費",
        "bu": "子ども",
        "ka": "子ども保育",
        "ref": "6kouhyouyou6.xlsx#公表用!7"
      },
      {
        "name": "幼児教育施設利用費等助成事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "幼児教育施設利用費等助成事業費",
        "bu": "子ども",
        "ka": "子ども保育",
        "ref": "6kouhyouyou6.xlsx#公表用!8"
      },
      {
        "name": "すこやか子育て医療費助成事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "すこやか子育て医療費助成事業",
        "bu": "子ども",
        "ka": "子育て支援",
        "ref": "6kouhyouyou6.xlsx#公表用!9"
      },
      {
        "name": "ひとり親家庭等医療費助成事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "ひとり親家庭等医療費助成事業",
        "bu": "子ども",
        "ka": "子育て支援",
        "ref": "6kouhyouyou6.xlsx#公表用!10"
      },
      {
        "name": "多子世帯等への利用者負担額（保育料）軽減事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "多子世帯等への利用者負担額（保育料）軽減事業",
        "bu": "子ども",
        "ka": "子ども保育",
        "ref": "6kouhyouyou6.xlsx#公表用!11"
      },
      {
        "name": "妊娠・子育て応援給付金事業",
        "grade": "B",
        "prevGrade": "R5新規",
        "budgetName": "妊娠・子育て応援給付金事業費",
        "bu": "子ども",
        "ka": "母子保健",
        "ref": "6kouhyouyou6.xlsx#公表用!12"
      },
      {
        "name": "子育て総合相談窓口運営事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "子育て総合相談窓口運営事業費",
        "bu": "子ども",
        "ka": "子育て支援",
        "ref": "6kouhyouyou6.xlsx#公表用!13"
      },
      {
        "name": "母子保健事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "母子保健事業費",
        "bu": "子ども",
        "ka": "母子保健",
        "ref": "6kouhyouyou6.xlsx#公表用!14"
      },
      {
        "name": "子ども応援事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "子ども応援事業費",
        "bu": "子ども",
        "ka": "子ども応援",
        "ref": "6kouhyouyou6.xlsx#公表用!16"
      },
      {
        "name": "放課後子供教室推進事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "放課後子供教室推進事業費",
        "bu": "教育",
        "ka": "生涯学習",
        "ref": "6kouhyouyou6.xlsx#公表用!17"
      },
      {
        "name": "子ども運動遊び事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "子ども運動遊び事業費",
        "bu": "子ども",
        "ka": "子ども応援",
        "ref": "6kouhyouyou6.xlsx#公表用!18"
      },
      {
        "name": "小学校外国語活動推進事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "小学校外国語活動推進事業費",
        "bu": "教育",
        "ka": "学校教育",
        "ref": "6kouhyouyou6.xlsx#公表用!19"
      },
      {
        "name": "外国人講師による英語指導事業（中学校）",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "外国人講師による英語指導事業費（中）",
        "bu": "教育",
        "ka": "学校教育",
        "ref": "6kouhyouyou6.xlsx#公表用!20"
      },
      {
        "name": "サポートティーチャー事業(小学校)",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "サポートティーチャー事業費(小)",
        "bu": "教育",
        "ka": "学校教育",
        "ref": "6kouhyouyou6.xlsx#公表用!21"
      },
      {
        "name": "サポートティーチャー事業(中学校)",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "サポートティーチャー事業費(中)",
        "bu": "教育",
        "ka": "学校教育",
        "ref": "6kouhyouyou6.xlsx#公表用!22"
      },
      {
        "name": "新しい時代を担う人づくり基金事業(甲府の教育推進事業）",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "新しい時代を担う人づくり基金事業費",
        "bu": "教育",
        "ka": "学校教育",
        "ref": "6kouhyouyou6.xlsx#公表用!23"
      },
      {
        "name": "学校危機管理体制整備事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "学校危機管理体制整備事業費",
        "bu": "教育",
        "ka": "学校教育",
        "ref": "6kouhyouyou6.xlsx#公表用!24"
      },
      {
        "name": "学校給食事業（小学校）",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "学校給食費（小）",
        "bu": "教育",
        "ka": "学事",
        "ref": "6kouhyouyou6.xlsx#公表用!25"
      },
      {
        "name": "学校給食事業（中学校）",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "学校給食費（中）",
        "bu": "教育",
        "ka": "学事",
        "ref": "6kouhyouyou6.xlsx#公表用!26"
      },
      {
        "name": "小学校老朽化リニューアル事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "小学校老朽化リニューアル事業費",
        "bu": "教育",
        "ka": "教育施設",
        "ref": "6kouhyouyou6.xlsx#公表用!28"
      },
      {
        "name": "中学校老朽化リニューアル事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "中学校老朽化リニューアル事業費",
        "bu": "教育",
        "ka": "教育施設",
        "ref": "6kouhyouyou6.xlsx#公表用!29"
      },
      {
        "name": "教材・情報環境整備事業（小学校）",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "教材・情報環境整備事業費（小）",
        "bu": "教育",
        "ka": "学事",
        "ref": "6kouhyouyou6.xlsx#公表用!30"
      },
      {
        "name": "教材・情報環境整備事業（中学校）",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "教材・情報環境整備事業費（中）",
        "bu": "教育",
        "ka": "学事",
        "ref": "6kouhyouyou6.xlsx#公表用!31"
      },
      {
        "name": "外国人講師による英語指導事業（高校）",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "外国人講師による英語指導事業費（高）",
        "bu": "教育",
        "ka": "学校教育",
        "ref": "6kouhyouyou6.xlsx#公表用!32"
      },
      {
        "name": "青少年健全育成事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "青少年健全育成費",
        "bu": "子ども",
        "ka": "子ども応援",
        "ref": "6kouhyouyou6.xlsx#公表用!33"
      },
      {
        "name": "生涯学習振興事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "生涯学習振興事業費",
        "bu": "教育",
        "ka": "生涯学習",
        "ref": "6kouhyouyou6.xlsx#公表用!34"
      },
      {
        "name": "図書館管理運営事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "図書館管理運営費",
        "bu": "教育",
        "ka": "図書館",
        "ref": "6kouhyouyou6.xlsx#公表用!35"
      },
      {
        "name": "こうふ開府500年レガシー事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "こうふ開府500年レガシー事業費",
        "bu": "教育",
        "ka": "生涯学習",
        "ref": "6kouhyouyou6.xlsx#公表用!36"
      },
      {
        "name": "スポーツ振興事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "スポーツ振興事業費",
        "bu": "教育",
        "ka": "スポーツ",
        "ref": "6kouhyouyou6.xlsx#公表用!37"
      },
      {
        "name": "緑が丘スポーツ公園整備事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "緑が丘スポーツ公園整備事業費",
        "bu": "まち",
        "ka": "公園緑地",
        "ref": "6kouhyouyou6.xlsx#公表用!38"
      },
      {
        "name": "文化芸術推進事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "文化芸術推進事業費",
        "bu": "教育",
        "ka": "生涯学習",
        "ref": "6kouhyouyou6.xlsx#公表用!39"
      },
      {
        "name": "史跡武田氏館跡整備事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "史跡武田氏館跡整備事業費",
        "bu": "教育",
        "ka": "歴史文化財",
        "ref": "6kouhyouyou6.xlsx#公表用!40"
      },
      {
        "name": "文化財保護事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "文化財保護費",
        "bu": "教育",
        "ka": "歴史文化財",
        "ref": "6kouhyouyou6.xlsx#公表用!41"
      },
      {
        "name": "人権推進事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "人権推進事業費",
        "bu": "市民",
        "ka": "人権男女参画",
        "ref": "6kouhyouyou6.xlsx#公表用!42"
      },
      {
        "name": "平和都市宣言事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "平和都市宣言事業費",
        "bu": "市民",
        "ka": "総務",
        "ref": "6kouhyouyou6.xlsx#公表用!43"
      },
      {
        "name": "男女共同参画推進事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "男女共同参画推進事業費",
        "bu": "市民",
        "ka": "人権男女参画",
        "ref": "6kouhyouyou6.xlsx#公表用!44"
      },
      {
        "name": "国際交流事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "国際交流事業費",
        "bu": "市長",
        "ka": "国際交流",
        "ref": "6kouhyouyou6.xlsx#公表用!45"
      },
      {
        "name": "新しい時代を担う人づくり基金事業(姉妹・友好都市教育交流事業)",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "姉妹・友好都市教育交流事業費",
        "bu": "教育",
        "ka": "学校教育",
        "ref": "6kouhyouyou6.xlsx#公表用!46"
      },
      {
        "name": "多文化共生推進事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "多文化共生推進事業費",
        "bu": "市民",
        "ka": "市民",
        "ref": "6kouhyouyou6.xlsx#公表用!47"
      },
      {
        "name": "商工業推進事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "商工業推進事業費",
        "bu": "産業",
        "ka": "商工",
        "ref": "6kouhyouyou6.xlsx#公表用!48"
      },
      {
        "name": "融資対策事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "融資対策事業費",
        "bu": "産業",
        "ka": "商工",
        "ref": "6kouhyouyou6.xlsx#公表用!49"
      },
      {
        "name": "産業立地等推進事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "産業立地等推進事業費",
        "bu": "産業",
        "ka": "産業立地",
        "ref": "6kouhyouyou6.xlsx#公表用!50"
      },
      {
        "name": "地場産業振興対策事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "地場産業振興対策事業費",
        "bu": "産業",
        "ka": "商工",
        "ref": "6kouhyouyou6.xlsx#公表用!51"
      },
      {
        "name": "農業経営基盤強化促進対策事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "農業経営基盤強化促進対策事業費",
        "bu": "産業",
        "ka": "就農支援",
        "ref": "6kouhyouyou6.xlsx#公表用!52"
      },
      {
        "name": "産地保全強化対策事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "産地保全強化対策事業費",
        "bu": "産業",
        "ka": "農政",
        "ref": "6kouhyouyou6.xlsx#公表用!53"
      },
      {
        "name": "森づくり推進事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "森づくり推進事業費",
        "bu": "産業",
        "ka": "林政",
        "ref": "6kouhyouyou6.xlsx#公表用!54"
      },
      {
        "name": "林道維持管理事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "林道維持管理事業費",
        "bu": "産業",
        "ka": "林政",
        "ref": "6kouhyouyou6.xlsx#公表用!55"
      },
      {
        "name": "雇用促進対策事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "雇用促進対策事業費",
        "bu": "産業",
        "ka": "雇用創生",
        "ref": "6kouhyouyou6.xlsx#公表用!56"
      },
      {
        "name": "地方卸売市場運営事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "地方卸売市場会計",
        "bu": "産業",
        "ka": "市場",
        "ref": "6kouhyouyou6.xlsx#公表用!57"
      },
      {
        "name": "地方卸売市場施設整備事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "地方卸売市場会計",
        "bu": "産業",
        "ka": "市場",
        "ref": "6kouhyouyou6.xlsx#公表用!58"
      },
      {
        "name": "まつり推進事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "まつり推進事業費",
        "bu": "産業",
        "ka": "観光",
        "ref": "6kouhyouyou6.xlsx#公表用!59"
      },
      {
        "name": "観光開発事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "観光開発事業費",
        "bu": "産業",
        "ka": "観光",
        "ref": "6kouhyouyou6.xlsx#公表用!60"
      },
      {
        "name": "中心市街地商業等活性化事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "中心市街地商業等活性化事業費",
        "bu": "産業",
        "ka": "中心市街地振興",
        "ref": "6kouhyouyou6.xlsx#公表用!61"
      },
      {
        "name": "甲府城周辺地域活性化計画整備事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "甲府城周辺地域活性化計画整備事業費",
        "bu": "産業",
        "ka": "観光",
        "ref": "6kouhyouyou6.xlsx#公表用!62"
      },
      {
        "name": "春日本通り線整備事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "春日本通り線整備事業費",
        "bu": "まち",
        "ka": "道路河川",
        "ref": "6kouhyouyou6.xlsx#公表用!63"
      },
      {
        "name": "優良建築物等整備事業",
        "grade": "B",
        "prevGrade": "R5新規",
        "budgetName": "優良建築物等整備事業費",
        "bu": "まち",
        "ka": "都市計画",
        "ref": "6kouhyouyou6.xlsx#公表用!64"
      },
      {
        "name": "移住・定住促進事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "移住・定住促進事業費",
        "bu": "企画",
        "ka": "自治体連携",
        "ref": "6kouhyouyou6.xlsx#公表用!65"
      },
      {
        "name": "南北地域振興事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "南北地域振興事業費",
        "bu": "産業",
        "ka": "林政",
        "ref": "6kouhyouyou6.xlsx#公表用!66"
      },
      {
        "name": "防災対策整備事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "防災対策整備事業費",
        "bu": "市長",
        "ka": "防災企画地域防災",
        "ref": "6kouhyouyou6.xlsx#公表用!67"
      },
      {
        "name": "一般河川改修事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "一般河川改修事業費",
        "bu": "まち",
        "ka": "道路河川",
        "ref": "6kouhyouyou6.xlsx#公表用!68"
      },
      {
        "name": "危機管理対策事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "危機管理対策事業費（安全安心街づくり事業）",
        "bu": "市長",
        "ka": "危機管理",
        "ref": "6kouhyouyou6.xlsx#公表用!69"
      },
      {
        "name": "盛土規制法規制区域指定基礎調査事業",
        "grade": "B",
        "prevGrade": "R5新規",
        "budgetName": "盛土規制法規制区域指定基礎調査事業費",
        "bu": "産業",
        "ka": "林政",
        "ref": "6kouhyouyou6.xlsx#公表用!70"
      },
      {
        "name": "消火栓設置事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "消火栓設置事業費",
        "bu": "消防",
        "ka": "警防",
        "ref": "6kouhyouyou6.xlsx#公表用!71"
      },
      {
        "name": "消防施設等整備事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "消防施設等整備事業費",
        "bu": "消防",
        "ka": "警防",
        "ref": "6kouhyouyou6.xlsx#公表用!72"
      },
      {
        "name": "非常備消防事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "非常備消防費",
        "bu": "消防",
        "ka": "人事警防",
        "ref": "6kouhyouyou6.xlsx#公表用!73"
      },
      {
        "name": "交通安全対策事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "交通安全対策事業費",
        "bu": "市民",
        "ka": "総務",
        "ref": "6kouhyouyou6.xlsx#公表用!74"
      },
      {
        "name": "安全安心街づくり事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "安全安心街づくり事業費",
        "bu": "市長",
        "ka": "危機管理",
        "ref": "6kouhyouyou6.xlsx#公表用!75"
      },
      {
        "name": "街路灯助成事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "街路灯助成事業費",
        "bu": "市民",
        "ka": "協働推進",
        "ref": "6kouhyouyou6.xlsx#公表用!76"
      },
      {
        "name": "学校安全安心推進事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "学校安全安心推進事業費",
        "bu": "教育",
        "ka": "学事",
        "ref": "6kouhyouyou6.xlsx#公表用!77"
      },
      {
        "name": "交通安全施設整備事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "交通安全施設整備事業費",
        "bu": "まち",
        "ka": "道路河川",
        "ref": "6kouhyouyou6.xlsx#公表用!78"
      },
      {
        "name": "消費者啓発育成事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "消費者啓発育成事業費",
        "bu": "市民",
        "ka": "総務",
        "ref": "6kouhyouyou6.xlsx#公表用!79"
      },
      {
        "name": "生きがい対策事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "生きがい対策事業費",
        "bu": "福祉",
        "ka": "長寿介護",
        "ref": "6kouhyouyou6.xlsx#公表用!80"
      },
      {
        "name": "地域支援事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "介護保険事業特別会計3款",
        "bu": "福祉保健",
        "ka": "長寿介護健康政策地域保健",
        "ref": "6kouhyouyou6.xlsx#公表用!81"
      },
      {
        "name": "成年後見制度普及促進事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "成年後見制度普及促進事業費",
        "bu": "福祉",
        "ka": "長寿介護",
        "ref": "6kouhyouyou6.xlsx#公表用!82"
      },
      {
        "name": "重度心身障害者医療費助成事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "重度心身障害者医療費助成事業費",
        "bu": "福祉",
        "ka": "障がい福祉",
        "ref": "6kouhyouyou6.xlsx#公表用!83"
      },
      {
        "name": "自立支援サービス事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "自立支援サービス事業費",
        "bu": "福祉",
        "ka": "障がい福祉",
        "ref": "6kouhyouyou6.xlsx#公表用!84"
      },
      {
        "name": "障害者のすみよいまちづくり事業",
        "grade": "A",
        "prevGrade": "B",
        "budgetName": "障害者のすみよいまちづくり事業費",
        "bu": "福祉",
        "ka": "障がい福祉",
        "ref": "6kouhyouyou6.xlsx#公表用!85"
      },
      {
        "name": "地域生活支援事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "地域生活支援事業費",
        "bu": "福祉",
        "ka": "障がい福祉",
        "ref": "6kouhyouyou6.xlsx#公表用!86"
      },
      {
        "name": "生活保護扶助事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "生活保護扶助費",
        "bu": "福祉",
        "ka": "生活福祉",
        "ref": "6kouhyouyou6.xlsx#公表用!87"
      },
      {
        "name": "生活困窮者自立支援事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "生活困窮者自立支援事業費",
        "bu": "福祉",
        "ka": "生活福祉",
        "ref": "6kouhyouyou6.xlsx#公表用!88"
      },
      {
        "name": "国民健康保険事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "国民健康保険事業会計（事業勘定）",
        "bu": "福祉",
        "ka": "健康保険",
        "ref": "6kouhyouyou6.xlsx#公表用!89"
      },
      {
        "name": "健康政策推進事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "健康政策推進事業費",
        "bu": "保健",
        "ka": "健康政策",
        "ref": "6kouhyouyou6.xlsx#公表用!90"
      },
      {
        "name": "健康づくり推進事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "健康づくり推進事業費",
        "bu": "保健",
        "ka": "地域保健",
        "ref": "6kouhyouyou6.xlsx#公表用!91"
      },
      {
        "name": "精神保健福祉事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "精神保健福祉事業費",
        "bu": "保健",
        "ka": "精神保健",
        "ref": "6kouhyouyou6.xlsx#公表用!93"
      },
      {
        "name": "健康診査事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "健康診査費",
        "bu": "保健",
        "ka": "地域保健",
        "ref": "6kouhyouyou6.xlsx#公表用!94"
      },
      {
        "name": "各種予防事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "各種予防事業費",
        "bu": "保健",
        "ka": "医務感染症",
        "ref": "6kouhyouyou6.xlsx#公表用!95"
      },
      {
        "name": "感染症対策事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "感染症対策事業費",
        "bu": "保健",
        "ka": "医務感染症",
        "ref": "6kouhyouyou6.xlsx#公表用!96"
      },
      {
        "name": "病院経営推進事業",
        "grade": "B",
        "prevGrade": "C",
        "budgetName": "病院経営推進事業費（病院事業会計）",
        "bu": "病院",
        "ka": "経営企画",
        "ref": "6kouhyouyou6.xlsx#公表用!97"
      },
      {
        "name": "地域医療連携事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "地域医療連携事業費（病院事業会計）",
        "bu": "病院",
        "ka": "総務",
        "ref": "6kouhyouyou6.xlsx#公表用!98"
      },
      {
        "name": "救急医療体制整備事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "救急医療体制整備事業費",
        "bu": "保健",
        "ka": "医務感染症",
        "ref": "6kouhyouyou6.xlsx#公表用!99"
      },
      {
        "name": "地球温暖化対策事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "地球温暖化対策事業費",
        "bu": "環境",
        "ka": "環境政策",
        "ref": "6kouhyouyou6.xlsx#公表用!101"
      },
      {
        "name": "都市美化事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "都市美化事業費",
        "bu": "環境",
        "ka": "ごみ収集",
        "ref": "6kouhyouyou6.xlsx#公表用!102"
      },
      {
        "name": "環境対策事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "環境対策事業費",
        "bu": "環境",
        "ka": "環境保全",
        "ref": "6kouhyouyou6.xlsx#公表用!103"
      },
      {
        "name": "遊亀公園・附属動物園整備事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "遊亀公園・附属動物園整備事業費",
        "bu": "まち",
        "ka": "公園緑地",
        "ref": "6kouhyouyou6.xlsx#公表用!104"
      },
      {
        "name": "ごみ減量と資源リサイクル事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "ごみ減量と資源リサイクル事業費",
        "bu": "環境",
        "ka": "ごみ減量",
        "ref": "6kouhyouyou6.xlsx#公表用!105"
      },
      {
        "name": "景観まちづくり推進事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "景観まちづくり推進事業費",
        "bu": "まち",
        "ka": "都市計画",
        "ref": "6kouhyouyou6.xlsx#公表用!106"
      },
      {
        "name": "住宅管理事務",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "住宅管理費",
        "bu": "まち",
        "ka": "住宅",
        "ref": "6kouhyouyou6.xlsx#公表用!107"
      },
      {
        "name": "建築物耐震化支援事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "建築物耐震化支援事業費",
        "bu": "まち",
        "ka": "建築指導",
        "ref": "6kouhyouyou6.xlsx#公表用!108"
      },
      {
        "name": "空家等対策推進事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "空家等対策推進事業費",
        "bu": "まち",
        "ka": "空き家対策",
        "ref": "6kouhyouyou6.xlsx#公表用!109"
      },
      {
        "name": "水源保全活動推進事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "市民との協働による水源保全（水道事業会計）",
        "bu": "上下",
        "ka": "水保全",
        "ref": "6kouhyouyou6.xlsx#公表用!110"
      },
      {
        "name": "水源域の水質調査事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "荒川流域及び地下水の水質対策（水道事業会計）",
        "bu": "上下",
        "ka": "浄水",
        "ref": "6kouhyouyou6.xlsx#公表用!111"
      },
      {
        "name": "水道管路耐震化事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "経年管路の更新",
        "bu": "上下",
        "ka": "水道",
        "ref": "6kouhyouyou6.xlsx#公表用!112"
      },
      {
        "name": "汚水管きょ整備事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "公共下水道事業の汚水管きょ整備",
        "bu": "上下",
        "ka": "計画／下水道",
        "ref": "6kouhyouyou6.xlsx#公表用!113"
      },
      {
        "name": "下水道接続促進事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "下水道への接続促進",
        "bu": "上下",
        "ka": "給排水",
        "ref": "6kouhyouyou6.xlsx#公表用!114"
      },
      {
        "name": "下水道地震対策事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "下水道地震対策整備（下水道事業会計）",
        "bu": "上下",
        "ka": "下水道／浄化センター",
        "ref": "6kouhyouyou6.xlsx#公表用!115"
      },
      {
        "name": "動物愛護事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "動物愛護事業費",
        "bu": "保健",
        "ka": "衛生薬務",
        "ref": "6kouhyouyou6.xlsx#公表用!116"
      },
      {
        "name": "生活衛生事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "生活衛生事業費",
        "bu": "保健",
        "ka": "衛生薬務",
        "ref": "6kouhyouyou6.xlsx#公表用!117"
      },
      {
        "name": "公共交通体系整備推進事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "公共交通体系整備推進事業費",
        "bu": "企画",
        "ka": "リニア政策",
        "ref": "6kouhyouyou6.xlsx#公表用!118"
      },
      {
        "name": "バス利用促進対策事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "バス利用促進対策事業費",
        "bu": "企画",
        "ka": "交通政策",
        "ref": "6kouhyouyou6.xlsx#公表用!120"
      },
      {
        "name": "在来鉄道の利便性向上事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "在来鉄道の利便性向上事業費",
        "bu": "企画",
        "ka": "交通政策",
        "ref": "6kouhyouyou6.xlsx#公表用!121"
      },
      {
        "name": "和戸町竜王線整備事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "和戸町竜王線整備事業費",
        "bu": "まち",
        "ka": "都市整備",
        "ref": "6kouhyouyou6.xlsx#公表用!122"
      },
      {
        "name": "城東三丁目敷島線整備事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "城東三丁目敷島線整備事業費",
        "bu": "まち",
        "ka": "都市整備",
        "ref": "6kouhyouyou6.xlsx#公表用!123"
      },
      {
        "name": "住吉四丁目善光寺線整備事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "住吉四丁目善光寺線整備事業費",
        "bu": "まち",
        "ka": "都市整備",
        "ref": "6kouhyouyou6.xlsx#公表用!124"
      },
      {
        "name": "高畑町昇仙峡整備事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "まち",
        "ka": "都市整備",
        "ref": "6kouhyouyou6.xlsx#公表用!125"
      },
      {
        "name": "市道新設改良事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "市道新設改良事業費",
        "bu": "まち",
        "ka": "都市整備",
        "ref": "6kouhyouyou6.xlsx#公表用!126"
      },
      {
        "name": "橋りょう長寿命化修繕事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "橋りょう長寿命化修繕事業費",
        "bu": "まち",
        "ka": "道路河川",
        "ref": "6kouhyouyou6.xlsx#公表用!127"
      },
      {
        "name": "道路維持管理事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "道路維持管理事業費",
        "bu": "まち",
        "ka": "道路河川",
        "ref": "6kouhyouyou6.xlsx#公表用!128"
      },
      {
        "name": "甲府駅周辺土地区画整理事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "甲府駅周辺土地区画整理事業費",
        "bu": "まち",
        "ka": "区画整理",
        "ref": "6kouhyouyou6.xlsx#公表用!129"
      },
      {
        "name": "都市基本計画推進事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "都市基本計画推進事業費",
        "bu": "まち",
        "ka": "都市計画",
        "ref": "6kouhyouyou6.xlsx#公表用!130"
      },
      {
        "name": "地籍調査事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "地籍調査事業費",
        "bu": "まち",
        "ka": "地籍調査",
        "ref": "6kouhyouyou6.xlsx#公表用!131"
      },
      {
        "name": "地域デザイン推進事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "地域デザイン推進事業費",
        "bu": "企画",
        "ka": "地域デザイン",
        "ref": "6kouhyouyou6.xlsx#公表用!132"
      },
      {
        "name": "まちづくり計画推進事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "まちづくり計画推進事業費",
        "bu": "市民",
        "ka": "協働推進",
        "ref": "6kouhyouyou6.xlsx#公表用!133"
      },
      {
        "name": "協働づくり推進事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "協働づくり推進事業費",
        "bu": "市民",
        "ka": "協働推進協働支援",
        "ref": "6kouhyouyou6.xlsx#公表用!134"
      },
      {
        "name": "地域のまちづくり支援事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "地域のまちづくり支援事業費",
        "bu": "市民",
        "ka": "協働支援",
        "ref": "6kouhyouyou6.xlsx#公表用!135"
      },
      {
        "name": "市民組織事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "市民組織費",
        "bu": "市民",
        "ka": "協働推進",
        "ref": "6kouhyouyou6.xlsx#公表用!136"
      },
      {
        "name": "地域集会施設整備助成事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "地域集会施設整備助成事業費",
        "bu": "市民",
        "ka": "協働推進",
        "ref": "6kouhyouyou6.xlsx#公表用!137"
      },
      {
        "name": "広報推進事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "広報推進事業費",
        "bu": "市長",
        "ka": "情報発信",
        "ref": "6kouhyouyou6.xlsx#公表用!138"
      },
      {
        "name": "広聴活動事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "広聴活動費",
        "bu": "市民",
        "ka": "協働推進",
        "ref": "6kouhyouyou6.xlsx#公表用!139"
      },
      {
        "name": "連携推進事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "連携推進事業費",
        "bu": "企画",
        "ka": "自治体連携",
        "ref": "6kouhyouyou6.xlsx#公表用!140"
      },
      {
        "name": "職員研修事業",
        "grade": "A",
        "prevGrade": "B",
        "budgetName": "職員研修事業費",
        "bu": "総務",
        "ka": "人材マネジメント",
        "ref": "6kouhyouyou6.xlsx#公表用!142"
      },
      {
        "name": "公共施設等マネジメント推進事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "公共施設等マネジメント推進事業費",
        "bu": "企画",
        "ka": "財産活用",
        "ref": "6kouhyouyou6.xlsx#公表用!143"
      },
      {
        "name": "ふるさと応援寄附金推進事業",
        "grade": "A",
        "prevGrade": "A",
        "budgetName": "ふるさと応援寄附金推進事業費",
        "bu": "産業",
        "ka": "ふるさと納税",
        "ref": "6kouhyouyou6.xlsx#公表用!144"
      },
      {
        "name": "ＳＤＧｓ推進事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "企画",
        "ka": "ＳＤＧｓ推進",
        "ref": "6kouhyouyou6.xlsx#公表用!145"
      },
      {
        "name": "シティプロモーション事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": "シティプロモーション事業",
        "bu": "市長",
        "ka": "情報発信",
        "ref": "6kouhyouyou6.xlsx#公表用!146"
      }
    ]
  },
  {
    "fy": "R5",
    "fyLabel": "令和5年度",
    "sourceTitle": "令和5年度 甲府市行政評価（事務事業評価）結果一覧",
    "sourceUrl": "https://web.archive.org/web/20260712140528/https://www.city.kofu.yamanashi.jp/zaise/documents/kouhyouyoudeta5-4.pdf",
    "originUrl": "https://www.city.kofu.yamanashi.jp/zaise/documents/kouhyouyoudeta5-4.pdf",
    "sourceLocalUrl": "/sources/kofu-gyousei-hyouka-r5/kouhyouyoudeta5-4.pdf",
    "items": [
      {
        "name": "放課後児童クラブ事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "子ども",
        "ka": "子ども保育",
        "ref": "kouhyouyoudeta5-4.pdf#p1"
      },
      {
        "name": "教育･保育施設等運営給付事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "子ども",
        "ka": "子ども保育",
        "ref": "kouhyouyoudeta5-4.pdf#p1"
      },
      {
        "name": "幼児教育施設利用費等助成事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "子ども",
        "ka": "子ども保育",
        "ref": "kouhyouyoudeta5-4.pdf#p1"
      },
      {
        "name": "すこやか子育て医療費助成事業",
        "grade": "B",
        "prevGrade": "A",
        "budgetName": null,
        "bu": "子ども",
        "ka": "子育て支援",
        "ref": "kouhyouyoudeta5-4.pdf#p1"
      },
      {
        "name": "ひとり親家庭等医療費助成事業",
        "grade": "B",
        "prevGrade": "A",
        "budgetName": null,
        "bu": "子ども",
        "ka": "子育て支援",
        "ref": "kouhyouyoudeta5-4.pdf#p1"
      },
      {
        "name": "多子世帯等への利用者負担額（保育料）軽減事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "子ども",
        "ka": "子ども保育",
        "ref": "kouhyouyoudeta5-4.pdf#p1"
      },
      {
        "name": "子育て総合相談窓口運営事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "子ども",
        "ka": "子育て支援",
        "ref": "kouhyouyoudeta5-4.pdf#p1"
      },
      {
        "name": "母子保健事業",
        "grade": "B",
        "prevGrade": "AB",
        "budgetName": null,
        "bu": "子ども福保",
        "ka": "母子保健母子健康",
        "ref": "kouhyouyoudeta5-4.pdf#p1"
      },
      {
        "name": "子ども応援事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "子ども",
        "ka": "子ども応援",
        "ref": "kouhyouyoudeta5-4.pdf#p1"
      },
      {
        "name": "放課後子供教室推進事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "教育",
        "ka": "生涯学習",
        "ref": "kouhyouyoudeta5-4.pdf#p1"
      },
      {
        "name": "子ども運動遊び事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "子ども",
        "ka": "子ども応援",
        "ref": "kouhyouyoudeta5-4.pdf#p2"
      },
      {
        "name": "小学校外国語活動推進事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "教育",
        "ka": "学校教育",
        "ref": "kouhyouyoudeta5-4.pdf#p2"
      },
      {
        "name": "外国人講師による英語指導事業（中学校）",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "教育",
        "ka": "学校教育",
        "ref": "kouhyouyoudeta5-4.pdf#p2"
      },
      {
        "name": "サポートティーチャー事業(小学校)",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "教育",
        "ka": "学校教育",
        "ref": "kouhyouyoudeta5-4.pdf#p2"
      },
      {
        "name": "サポートティーチャー事業(中学校)",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "教育",
        "ka": "学校教育",
        "ref": "kouhyouyoudeta5-4.pdf#p2"
      },
      {
        "name": "新しい時代を担う人づくり基金事業(甲府の教育推進事業）",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "教育",
        "ka": "学校教育",
        "ref": "kouhyouyoudeta5-4.pdf#p2"
      },
      {
        "name": "学校危機管理体制整備事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "教育",
        "ka": "学校教育",
        "ref": "kouhyouyoudeta5-4.pdf#p2"
      },
      {
        "name": "学校給食事業（小学校）",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "教育",
        "ka": "学事",
        "ref": "kouhyouyoudeta5-4.pdf#p2"
      },
      {
        "name": "学校給食事業（中学校）",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "教育",
        "ka": "学事",
        "ref": "kouhyouyoudeta5-4.pdf#p2"
      },
      {
        "name": "小学校老朽化リニューアル事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "教育",
        "ka": "教育施設",
        "ref": "kouhyouyoudeta5-4.pdf#p2"
      },
      {
        "name": "中学校老朽化リニューアル事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "教育",
        "ka": "教育施設",
        "ref": "kouhyouyoudeta5-4.pdf#p2"
      },
      {
        "name": "教材・情報環境整備事業（小学校）",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "教育",
        "ka": "学事",
        "ref": "kouhyouyoudeta5-4.pdf#p2"
      },
      {
        "name": "教材・情報環境整備事業（中学校）",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "教育",
        "ka": "学事",
        "ref": "kouhyouyoudeta5-4.pdf#p3"
      },
      {
        "name": "外国人講師による英語指導事業（高校）",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "教育",
        "ka": "学校教育",
        "ref": "kouhyouyoudeta5-4.pdf#p3"
      },
      {
        "name": "青少年健全育成事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "子ども",
        "ka": "子ども応援",
        "ref": "kouhyouyoudeta5-4.pdf#p3"
      },
      {
        "name": "生涯学習振興事業",
        "grade": "B",
        "prevGrade": "コロナ禍にて判定不可",
        "budgetName": null,
        "bu": "教育",
        "ka": "生涯学習",
        "ref": "kouhyouyoudeta5-4.pdf#p3"
      },
      {
        "name": "図書館管理運営事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "教育",
        "ka": "図書館",
        "ref": "kouhyouyoudeta5-4.pdf#p3"
      },
      {
        "name": "こうふ開府500年レガシー事業",
        "grade": "B",
        "prevGrade": "R4新規",
        "budgetName": null,
        "bu": "教育",
        "ka": "生涯学習",
        "ref": "kouhyouyoudeta5-4.pdf#p3"
      },
      {
        "name": "スポーツ振興事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "教育",
        "ka": "スポーツ",
        "ref": "kouhyouyoudeta5-4.pdf#p3"
      },
      {
        "name": "緑が丘スポーツ公園整備事業費",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "まち",
        "ka": "公園緑地",
        "ref": "kouhyouyoudeta5-4.pdf#p3"
      },
      {
        "name": "文化芸術推進事業",
        "grade": "B",
        "prevGrade": "コロナ禍にて判定不可",
        "budgetName": null,
        "bu": "教育",
        "ka": "生涯学習",
        "ref": "kouhyouyoudeta5-4.pdf#p3"
      },
      {
        "name": "史跡武田氏館跡整備事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "教育",
        "ka": "歴史文化財",
        "ref": "kouhyouyoudeta5-4.pdf#p3"
      },
      {
        "name": "文化財保護事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "教育",
        "ka": "歴史文化財",
        "ref": "kouhyouyoudeta5-4.pdf#p3"
      },
      {
        "name": "人権推進事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "市民",
        "ka": "人権男女参画",
        "ref": "kouhyouyoudeta5-4.pdf#p3"
      },
      {
        "name": "平和都市宣言事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "市民",
        "ka": "総務",
        "ref": "kouhyouyoudeta5-4.pdf#p3"
      },
      {
        "name": "男女共同参画推進事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "市民",
        "ka": "人権男女参画",
        "ref": "kouhyouyoudeta5-4.pdf#p4"
      },
      {
        "name": "国際交流事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "市長",
        "ka": "国際交流",
        "ref": "kouhyouyoudeta5-4.pdf#p4"
      },
      {
        "name": "新しい時代を担う人づくり基金事業(姉妹・友好都市教育交流事業)",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "教育",
        "ka": "学校教育",
        "ref": "kouhyouyoudeta5-4.pdf#p4"
      },
      {
        "name": "多文化共生推進事業",
        "grade": "B",
        "prevGrade": "コロナ禍にて判定不可",
        "budgetName": null,
        "bu": "市民",
        "ka": "市民",
        "ref": "kouhyouyoudeta5-4.pdf#p4"
      },
      {
        "name": "商工業推進事業",
        "grade": "B",
        "prevGrade": "A",
        "budgetName": null,
        "bu": "産業",
        "ka": "商工",
        "ref": "kouhyouyoudeta5-4.pdf#p4"
      },
      {
        "name": "融資対策事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "産業",
        "ka": "商工",
        "ref": "kouhyouyoudeta5-4.pdf#p4"
      },
      {
        "name": "産業立地等推進事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "産業",
        "ka": "産業立地",
        "ref": "kouhyouyoudeta5-4.pdf#p4"
      },
      {
        "name": "地場産業振興対策事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "産業",
        "ka": "商工",
        "ref": "kouhyouyoudeta5-4.pdf#p4"
      },
      {
        "name": "農業経営基盤強化促進対策事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "産業",
        "ka": "就農支援",
        "ref": "kouhyouyoudeta5-4.pdf#p4"
      },
      {
        "name": "産地保全強化対策事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "産業",
        "ka": "農政",
        "ref": "kouhyouyoudeta5-4.pdf#p4"
      },
      {
        "name": "森づくり推進事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "産業",
        "ka": "林政",
        "ref": "kouhyouyoudeta5-4.pdf#p4"
      },
      {
        "name": "林道維持管理事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "産業",
        "ka": "林政",
        "ref": "kouhyouyoudeta5-4.pdf#p4"
      },
      {
        "name": "雇用促進対策事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "産業",
        "ka": "雇用創生",
        "ref": "kouhyouyoudeta5-4.pdf#p4"
      },
      {
        "name": "地方卸売市場運営事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "産業",
        "ka": "市場",
        "ref": "kouhyouyoudeta5-4.pdf#p4"
      },
      {
        "name": "地方卸売市場施設整備事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "産業",
        "ka": "市場",
        "ref": "kouhyouyoudeta5-4.pdf#p5"
      },
      {
        "name": "まつり推進事業",
        "grade": "B",
        "prevGrade": "コロナ禍にて判定不可",
        "budgetName": null,
        "bu": "産業",
        "ka": "観光",
        "ref": "kouhyouyoudeta5-4.pdf#p5"
      },
      {
        "name": "観光開発事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "産業",
        "ka": "観光",
        "ref": "kouhyouyoudeta5-4.pdf#p5"
      },
      {
        "name": "中心市街地商業等活性化事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "産業",
        "ka": "中心市街地振興",
        "ref": "kouhyouyoudeta5-4.pdf#p5"
      },
      {
        "name": "甲府城周辺地域活性化計画整備事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "まち",
        "ka": "都市計画",
        "ref": "kouhyouyoudeta5-4.pdf#p5"
      },
      {
        "name": "春日本通り線整備事業",
        "grade": "B",
        "prevGrade": "R4新規",
        "budgetName": null,
        "bu": "まち",
        "ka": "道路河川",
        "ref": "kouhyouyoudeta5-4.pdf#p5"
      },
      {
        "name": "移住・定住促進事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "企画",
        "ka": "自治体連携",
        "ref": "kouhyouyoudeta5-4.pdf#p5"
      },
      {
        "name": "南北地域振興事業",
        "grade": "B",
        "prevGrade": "コロナ禍にて判定不可",
        "budgetName": null,
        "bu": "産業",
        "ka": "林政",
        "ref": "kouhyouyoudeta5-4.pdf#p5"
      },
      {
        "name": "防災対策整備事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "市長",
        "ka": "防災企画地域防災",
        "ref": "kouhyouyoudeta5-4.pdf#p5"
      },
      {
        "name": "一般河川改修事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "まち",
        "ka": "道路河川",
        "ref": "kouhyouyoudeta5-4.pdf#p5"
      },
      {
        "name": "危機管理対策事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "市長",
        "ka": "危機管理",
        "ref": "kouhyouyoudeta5-4.pdf#p5"
      },
      {
        "name": "消火栓設置事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "消防",
        "ka": "警防",
        "ref": "kouhyouyoudeta5-4.pdf#p5"
      },
      {
        "name": "消防施設等整備事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "消防",
        "ka": "警防",
        "ref": "kouhyouyoudeta5-4.pdf#p5"
      },
      {
        "name": "非常備消防事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "消防",
        "ka": "人事警防",
        "ref": "kouhyouyoudeta5-4.pdf#p6"
      },
      {
        "name": "交通安全対策事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "市民",
        "ka": "総務",
        "ref": "kouhyouyoudeta5-4.pdf#p6"
      },
      {
        "name": "安全安心街づくり事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "市長",
        "ka": "危機管理",
        "ref": "kouhyouyoudeta5-4.pdf#p6"
      },
      {
        "name": "街路灯助成事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "市民",
        "ka": "協働推進",
        "ref": "kouhyouyoudeta5-4.pdf#p6"
      },
      {
        "name": "学校安全安心推進事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "教育",
        "ka": "学事",
        "ref": "kouhyouyoudeta5-4.pdf#p6"
      },
      {
        "name": "交通安全施設整備事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "まち",
        "ka": "道路河川",
        "ref": "kouhyouyoudeta5-4.pdf#p6"
      },
      {
        "name": "消費者啓発育成事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "市民",
        "ka": "総務",
        "ref": "kouhyouyoudeta5-4.pdf#p6"
      },
      {
        "name": "生きがい対策事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "福保",
        "ka": "総務",
        "ref": "kouhyouyoudeta5-4.pdf#p6"
      },
      {
        "name": "地域支援事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "福保",
        "ka": "総務健康政策地域保健介護保険",
        "ref": "kouhyouyoudeta5-4.pdf#p6"
      },
      {
        "name": "成年後見制度普及促進事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "福保",
        "ka": "総務",
        "ref": "kouhyouyoudeta5-4.pdf#p6"
      },
      {
        "name": "重度心身障害者医療費助成事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "福保",
        "ka": "障がい福祉",
        "ref": "kouhyouyoudeta5-4.pdf#p6"
      },
      {
        "name": "自立支援サービス事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "福保",
        "ka": "障がい福祉",
        "ref": "kouhyouyoudeta5-4.pdf#p6"
      },
      {
        "name": "障害者のすみよいまちづくり事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "福保",
        "ka": "障がい福祉",
        "ref": "kouhyouyoudeta5-4.pdf#p7"
      },
      {
        "name": "地域生活支援事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "福保",
        "ka": "障がい福祉",
        "ref": "kouhyouyoudeta5-4.pdf#p7"
      },
      {
        "name": "生活保護扶助事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "福保",
        "ka": "生活福祉",
        "ref": "kouhyouyoudeta5-4.pdf#p7"
      },
      {
        "name": "生活困窮者自立支援事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "福保",
        "ka": "生活福祉",
        "ref": "kouhyouyoudeta5-4.pdf#p7"
      },
      {
        "name": "国民健康保険事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "福保",
        "ka": "健康保険",
        "ref": "kouhyouyoudeta5-4.pdf#p7"
      },
      {
        "name": "健康政策推進事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "福保",
        "ka": "健康政策課",
        "ref": "kouhyouyoudeta5-4.pdf#p7"
      },
      {
        "name": "健康づくり推進事業",
        "grade": "B",
        "prevGrade": "BB",
        "budgetName": null,
        "bu": "福保子ども",
        "ka": "地域保健母子保健",
        "ref": "kouhyouyoudeta5-4.pdf#p7"
      },
      {
        "name": "精神保健福祉事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "福保",
        "ka": "精神保健",
        "ref": "kouhyouyoudeta5-4.pdf#p7"
      },
      {
        "name": "健康診査事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "福保",
        "ka": "地域保健",
        "ref": "kouhyouyoudeta5-4.pdf#p7"
      },
      {
        "name": "各種予防事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "福保",
        "ka": "医務感染症",
        "ref": "kouhyouyoudeta5-4.pdf#p7"
      },
      {
        "name": "感染症対策事業",
        "grade": "B",
        "prevGrade": "A",
        "budgetName": null,
        "bu": "福保",
        "ka": "医務感染症",
        "ref": "kouhyouyoudeta5-4.pdf#p8"
      },
      {
        "name": "病院経営推進事業",
        "grade": "C",
        "prevGrade": "C",
        "budgetName": null,
        "bu": "病院",
        "ka": "経営企画",
        "ref": "kouhyouyoudeta5-4.pdf#p8"
      },
      {
        "name": "地域医療連携事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "病院総合相談セン",
        "ka": "総務ター",
        "ref": "kouhyouyoudeta5-4.pdf#p8"
      },
      {
        "name": "救急医療体制整備事業",
        "grade": "B",
        "prevGrade": "BB",
        "budgetName": null,
        "bu": "福保子ども",
        "ka": "医務感染症母子保健",
        "ref": "kouhyouyoudeta5-4.pdf#p8"
      },
      {
        "name": "地球温暖化対策事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "環境",
        "ka": "環境政策",
        "ref": "kouhyouyoudeta5-4.pdf#p8"
      },
      {
        "name": "都市美化事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "環境",
        "ka": "ごみ収集",
        "ref": "kouhyouyoudeta5-4.pdf#p8"
      },
      {
        "name": "環境対策事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "環境",
        "ka": "環境保全",
        "ref": "kouhyouyoudeta5-4.pdf#p8"
      },
      {
        "name": "遊亀公園・附属動物園整備事業費",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "まち",
        "ka": "公園緑地",
        "ref": "kouhyouyoudeta5-4.pdf#p8"
      },
      {
        "name": "ごみ減量と資源リサイクル事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "環境",
        "ka": "ごみ減量",
        "ref": "kouhyouyoudeta5-4.pdf#p8"
      },
      {
        "name": "景観まちづくり推進事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "まち",
        "ka": "都市計画",
        "ref": "kouhyouyoudeta5-4.pdf#p8"
      },
      {
        "name": "住宅管理事務",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "まち",
        "ka": "住宅",
        "ref": "kouhyouyoudeta5-4.pdf#p8"
      },
      {
        "name": "建築物耐震化支援事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "まち",
        "ka": "建築指導",
        "ref": "kouhyouyoudeta5-4.pdf#p8"
      },
      {
        "name": "空家等対策推進事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "まち",
        "ka": "空き家対策",
        "ref": "kouhyouyoudeta5-4.pdf#p9"
      },
      {
        "name": "水源保全活動推進事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "上下",
        "ka": "水保全",
        "ref": "kouhyouyoudeta5-4.pdf#p9"
      },
      {
        "name": "水源域の水質調査事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "上下",
        "ka": "浄水",
        "ref": "kouhyouyoudeta5-4.pdf#p9"
      },
      {
        "name": "水道管路耐震化事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "上下",
        "ka": "水道",
        "ref": "kouhyouyoudeta5-4.pdf#p9"
      },
      {
        "name": "汚水管きょ整備事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "上下",
        "ka": "計画／下水道",
        "ref": "kouhyouyoudeta5-4.pdf#p9"
      },
      {
        "name": "下水道接続促進事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "上下",
        "ka": "給排水",
        "ref": "kouhyouyoudeta5-4.pdf#p9"
      },
      {
        "name": "下水道地震対策事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "上下",
        "ka": "下水道課／浄化センター",
        "ref": "kouhyouyoudeta5-4.pdf#p9"
      },
      {
        "name": "動物愛護事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "福保",
        "ka": "生活衛生薬務",
        "ref": "kouhyouyoudeta5-4.pdf#p9"
      },
      {
        "name": "生活衛生事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "福保",
        "ka": "健康政策生活衛生薬務",
        "ref": "kouhyouyoudeta5-4.pdf#p9"
      },
      {
        "name": "公共交通体系整備推進事業",
        "grade": "B",
        "prevGrade": "BB",
        "budgetName": null,
        "bu": "企画",
        "ka": "リニア政策交通政策",
        "ref": "kouhyouyoudeta5-4.pdf#p9"
      },
      {
        "name": "バス利用促進対策事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "企画",
        "ka": "交通政策",
        "ref": "kouhyouyoudeta5-4.pdf#p9"
      },
      {
        "name": "在来鉄道の利便性向上事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "企画",
        "ka": "交通政策",
        "ref": "kouhyouyoudeta5-4.pdf#p9"
      },
      {
        "name": "和戸町竜王線整備事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "まち",
        "ka": "都市整備",
        "ref": "kouhyouyoudeta5-4.pdf#p9"
      },
      {
        "name": "城東三丁目敷島線整備事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "まち",
        "ka": "都市整備",
        "ref": "kouhyouyoudeta5-4.pdf#p10"
      },
      {
        "name": "住吉四丁目善光寺線整備事業",
        "grade": "B",
        "prevGrade": "R4新規",
        "budgetName": null,
        "bu": "まち",
        "ka": "都市整備",
        "ref": "kouhyouyoudeta5-4.pdf#p10"
      },
      {
        "name": "高畑町昇仙峡整備事業",
        "grade": "B",
        "prevGrade": "R4新規",
        "budgetName": null,
        "bu": "まち",
        "ka": "都市整備",
        "ref": "kouhyouyoudeta5-4.pdf#p10"
      },
      {
        "name": "市道新設改良事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "まち",
        "ka": "都市整備",
        "ref": "kouhyouyoudeta5-4.pdf#p10"
      },
      {
        "name": "国玉通り線整備事業",
        "grade": "完了",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "まち",
        "ka": "都市整備",
        "ref": "kouhyouyoudeta5-4.pdf#p10"
      },
      {
        "name": "橋りょう長寿命化修繕事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "まち",
        "ka": "道路河川",
        "ref": "kouhyouyoudeta5-4.pdf#p10"
      },
      {
        "name": "道路維持管理事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "まち",
        "ka": "道路河川",
        "ref": "kouhyouyoudeta5-4.pdf#p10"
      },
      {
        "name": "甲府駅周辺土地区画整理事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "まち",
        "ka": "区画整理",
        "ref": "kouhyouyoudeta5-4.pdf#p10"
      },
      {
        "name": "都市基本計画推進事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "まち",
        "ka": "都市計画",
        "ref": "kouhyouyoudeta5-4.pdf#p10"
      },
      {
        "name": "地籍調査事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "まち",
        "ka": "地籍調査",
        "ref": "kouhyouyoudeta5-4.pdf#p10"
      },
      {
        "name": "地域デザイン推進事業",
        "grade": "B",
        "prevGrade": "R4新規",
        "budgetName": null,
        "bu": "企画",
        "ka": "地域デザイン課",
        "ref": "kouhyouyoudeta5-4.pdf#p10"
      },
      {
        "name": "まちづくり計画推進事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "市民",
        "ka": "協働推進",
        "ref": "kouhyouyoudeta5-4.pdf#p10"
      },
      {
        "name": "協働づくり推進事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "市民",
        "ka": "協働推進協働支援",
        "ref": "kouhyouyoudeta5-4.pdf#p10"
      },
      {
        "name": "地域のまちづくり支援事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "市民",
        "ka": "協働支援",
        "ref": "kouhyouyoudeta5-4.pdf#p10"
      },
      {
        "name": "市民組織事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "市民",
        "ka": "協働推進",
        "ref": "kouhyouyoudeta5-4.pdf#p11"
      },
      {
        "name": "地域集会施設整備助成事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "市民",
        "ka": "協働推進",
        "ref": "kouhyouyoudeta5-4.pdf#p11"
      },
      {
        "name": "広報推進事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "市長",
        "ka": "情報発信",
        "ref": "kouhyouyoudeta5-4.pdf#p11"
      },
      {
        "name": "広聴活動事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "市民",
        "ka": "協働推進",
        "ref": "kouhyouyoudeta5-4.pdf#p11"
      },
      {
        "name": "連携推進事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "企画",
        "ka": "自治体連携SDGs推進",
        "ref": "kouhyouyoudeta5-4.pdf#p11"
      },
      {
        "name": "職員研修事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "行政",
        "ka": "研修厚生",
        "ref": "kouhyouyoudeta5-4.pdf#p11"
      },
      {
        "name": "公共施設等マネジメント推進事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "企画",
        "ka": "財産活用",
        "ref": "kouhyouyoudeta5-4.pdf#p11"
      },
      {
        "name": "ふるさと応援寄附金推進事業",
        "grade": "A",
        "prevGrade": "A",
        "budgetName": null,
        "bu": "産業",
        "ka": "ふるさと納税",
        "ref": "kouhyouyoudeta5-4.pdf#p11"
      },
      {
        "name": "外部評価制度の実施事業",
        "grade": "D",
        "prevGrade": "コロナ禍にて判定不可",
        "budgetName": null,
        "bu": "行政",
        "ka": "行政経営",
        "ref": "kouhyouyoudeta5-4.pdf#p11"
      },
      {
        "name": "ＳＤＧｓ推進事業",
        "grade": "B",
        "prevGrade": "R4新規",
        "budgetName": null,
        "bu": "企画",
        "ka": "ＳＤＧｓ推進",
        "ref": "kouhyouyoudeta5-4.pdf#p11"
      },
      {
        "name": "シティプロモーション事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "市長",
        "ka": "情報発信",
        "ref": "kouhyouyoudeta5-4.pdf#p11"
      }
    ]
  },
  {
    "fy": "R4",
    "fyLabel": "令和4年度",
    "sourceTitle": "令和4年度 甲府市行政評価（事務事業評価）結果一覧",
    "sourceUrl": "https://web.archive.org/web/20260712140642/https://www.city.kofu.yamanashi.jp/zaise/documents/kouhyouyoudeta3-4.pdf",
    "originUrl": "https://www.city.kofu.yamanashi.jp/zaise/documents/kouhyouyoudeta3-4.pdf",
    "sourceLocalUrl": "/sources/kofu-gyousei-hyouka-r4/kouhyouyoudeta3-4.pdf",
    "items": [
      {
        "name": "放課後児童クラブ事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "子ども子ども保育",
        "ka": null,
        "ref": "kouhyouyoudeta3-4.pdf#p1"
      },
      {
        "name": "教育･保育施設等運営給付事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "子ども子ども保育",
        "ka": null,
        "ref": "kouhyouyoudeta3-4.pdf#p1"
      },
      {
        "name": "幼児教育施設利用費等助成事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "子ども子ども保育",
        "ka": null,
        "ref": "kouhyouyoudeta3-4.pdf#p1"
      },
      {
        "name": "すこやか子育て医療費助成事業",
        "grade": "A",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "子ども子育て支援",
        "ka": null,
        "ref": "kouhyouyoudeta3-4.pdf#p1"
      },
      {
        "name": "ひとり親家庭等医療費助成事業",
        "grade": "A",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "子ども子育て支援",
        "ka": null,
        "ref": "kouhyouyoudeta3-4.pdf#p1"
      },
      {
        "name": "多子世帯等への利用者負担額（保育料）軽減事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "子ども子ども保育",
        "ka": null,
        "ref": "kouhyouyoudeta3-4.pdf#p1"
      },
      {
        "name": "子育て総合相談窓口運営事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "子ども子育て支援",
        "ka": null,
        "ref": "kouhyouyoudeta3-4.pdf#p1"
      },
      {
        "name": "母子保健事業",
        "grade": "A",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "子ども",
        "ka": "母子保健",
        "ref": "kouhyouyoudeta3-4.pdf#p1"
      },
      {
        "name": "子ども応援事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "子ども子ども応援",
        "ka": null,
        "ref": "kouhyouyoudeta3-4.pdf#p1"
      },
      {
        "name": "放課後子供教室推進事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "教育",
        "ka": "生涯学習",
        "ref": "kouhyouyoudeta3-4.pdf#p1"
      },
      {
        "name": "子ども運動遊び事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "子ども子ども応援",
        "ka": null,
        "ref": "kouhyouyoudeta3-4.pdf#p1"
      },
      {
        "name": "小学校外国語活動推進事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "教育",
        "ka": "学校教育",
        "ref": "kouhyouyoudeta3-4.pdf#p1"
      },
      {
        "name": "外国人講師による英語指導事業（中学校）",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "教育",
        "ka": "学校教育",
        "ref": "kouhyouyoudeta3-4.pdf#p1"
      },
      {
        "name": "サポートティーチャー事業(小学校)",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "教育",
        "ka": "学校教育",
        "ref": "kouhyouyoudeta3-4.pdf#p2"
      },
      {
        "name": "サポートティーチャー事業(中学校)",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "教育",
        "ka": "学校教育",
        "ref": "kouhyouyoudeta3-4.pdf#p2"
      },
      {
        "name": "新しい時代を担う人づくり基金事業(甲府の教育推進事業）",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "教育",
        "ka": "学校教育",
        "ref": "kouhyouyoudeta3-4.pdf#p2"
      },
      {
        "name": "学校危機管理体制整備事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "教育",
        "ka": "学校教育",
        "ref": "kouhyouyoudeta3-4.pdf#p2"
      },
      {
        "name": "学校給食事業（小学校）",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "教育",
        "ka": "学事",
        "ref": "kouhyouyoudeta3-4.pdf#p2"
      },
      {
        "name": "学校給食事業（中学校）",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "教育",
        "ka": "学事",
        "ref": "kouhyouyoudeta3-4.pdf#p2"
      },
      {
        "name": "小学校老朽化リニューアル事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "教育",
        "ka": "教育施設",
        "ref": "kouhyouyoudeta3-4.pdf#p2"
      },
      {
        "name": "中学校老朽化リニューアル事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "教育",
        "ka": "教育施設",
        "ref": "kouhyouyoudeta3-4.pdf#p2"
      },
      {
        "name": "教材・情報環境整備事業（小学校）",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "教育",
        "ka": "学事",
        "ref": "kouhyouyoudeta3-4.pdf#p2"
      },
      {
        "name": "教材・情報環境整備事業（中学校）",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "教育",
        "ka": "学事",
        "ref": "kouhyouyoudeta3-4.pdf#p2"
      },
      {
        "name": "外国人講師による英語指導事業（高校）",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "教育",
        "ka": "学校教育",
        "ref": "kouhyouyoudeta3-4.pdf#p2"
      },
      {
        "name": "青少年健全育成事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "子ども子ども応援",
        "ka": null,
        "ref": "kouhyouyoudeta3-4.pdf#p2"
      },
      {
        "name": "図書館管理運営事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "教育",
        "ka": "図書館",
        "ref": "kouhyouyoudeta3-4.pdf#p2"
      },
      {
        "name": "スポーツ振興事業",
        "grade": "B",
        "prevGrade": "C",
        "budgetName": null,
        "bu": "教育",
        "ka": "スポーツ",
        "ref": "kouhyouyoudeta3-4.pdf#p3"
      },
      {
        "name": "緑が丘スポーツ公園整備事業費",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "まち",
        "ka": "公園緑地",
        "ref": "kouhyouyoudeta3-4.pdf#p3"
      },
      {
        "name": "史跡武田氏館跡整備事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "教育歴史文化財",
        "ka": null,
        "ref": "kouhyouyoudeta3-4.pdf#p3"
      },
      {
        "name": "文化財保護事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "教育歴史文化財",
        "ka": null,
        "ref": "kouhyouyoudeta3-4.pdf#p3"
      },
      {
        "name": "人権推進事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "人権男女参市民",
        "ka": "画",
        "ref": "kouhyouyoudeta3-4.pdf#p3"
      },
      {
        "name": "平和都市宣言事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "市民",
        "ka": "総務",
        "ref": "kouhyouyoudeta3-4.pdf#p3"
      },
      {
        "name": "男女共同参画推進事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "人権男女参市民",
        "ka": "画",
        "ref": "kouhyouyoudeta3-4.pdf#p3"
      },
      {
        "name": "国際交流事業",
        "grade": "B",
        "prevGrade": "C",
        "budgetName": null,
        "bu": "市長",
        "ka": "国際交流",
        "ref": "kouhyouyoudeta3-4.pdf#p3"
      },
      {
        "name": "新しい時代を担う人づくり基金事業(姉妹・友好都市教育交流事業)",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "教育",
        "ka": "学校教育",
        "ref": "kouhyouyoudeta3-4.pdf#p3"
      },
      {
        "name": "商工業推進事業",
        "grade": "A",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "産業",
        "ka": "商工",
        "ref": "kouhyouyoudeta3-4.pdf#p3"
      },
      {
        "name": "融資対策事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "産業",
        "ka": "商工",
        "ref": "kouhyouyoudeta3-4.pdf#p3"
      },
      {
        "name": "産業立地等推進事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "まち",
        "ka": "産業立地",
        "ref": "kouhyouyoudeta3-4.pdf#p4"
      },
      {
        "name": "地場産業振興対策事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "産業",
        "ka": "商工",
        "ref": "kouhyouyoudeta3-4.pdf#p4"
      },
      {
        "name": "農業経営基盤強化促進対策事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "産業",
        "ka": "就農支援",
        "ref": "kouhyouyoudeta3-4.pdf#p4"
      },
      {
        "name": "産地保全強化対策事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "産業",
        "ka": "農政",
        "ref": "kouhyouyoudeta3-4.pdf#p4"
      },
      {
        "name": "森づくり推進事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "産業",
        "ka": "林政",
        "ref": "kouhyouyoudeta3-4.pdf#p4"
      },
      {
        "name": "林道維持管理事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "産業",
        "ka": "林政",
        "ref": "kouhyouyoudeta3-4.pdf#p4"
      },
      {
        "name": "雇用促進対策事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "産業",
        "ka": "雇用創生",
        "ref": "kouhyouyoudeta3-4.pdf#p4"
      },
      {
        "name": "地方卸売市場運営事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "産業",
        "ka": "市場",
        "ref": "kouhyouyoudeta3-4.pdf#p4"
      },
      {
        "name": "地方卸売市場施設整備事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "産業",
        "ka": "市場",
        "ref": "kouhyouyoudeta3-4.pdf#p4"
      },
      {
        "name": "観光開発事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "産業",
        "ka": "観光",
        "ref": "kouhyouyoudeta3-4.pdf#p4"
      },
      {
        "name": "中心市街地商業等活性化事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "中心市街地産業",
        "ka": "振興",
        "ref": "kouhyouyoudeta3-4.pdf#p4"
      },
      {
        "name": "甲府城周辺地域活性化計画整備事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "まち",
        "ka": "都市計画",
        "ref": "kouhyouyoudeta3-4.pdf#p4"
      },
      {
        "name": "移住・定住促進事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "企画自治体連携",
        "ka": null,
        "ref": "kouhyouyoudeta3-4.pdf#p5"
      },
      {
        "name": "防災対策整備事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "市長",
        "ka": "防災企画防災指導",
        "ref": "kouhyouyoudeta3-4.pdf#p5"
      },
      {
        "name": "一般河川改修事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "まち",
        "ka": "道路河川",
        "ref": "kouhyouyoudeta3-4.pdf#p5"
      },
      {
        "name": "危機管理対策事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "市長",
        "ka": "危機管理",
        "ref": "kouhyouyoudeta3-4.pdf#p5"
      },
      {
        "name": "消火栓設置事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "消防",
        "ka": "警防",
        "ref": "kouhyouyoudeta3-4.pdf#p5"
      },
      {
        "name": "消防施設等整備事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "消防",
        "ka": "警防",
        "ref": "kouhyouyoudeta3-4.pdf#p5"
      },
      {
        "name": "非常備消防事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "消防",
        "ka": "人事警防",
        "ref": "kouhyouyoudeta3-4.pdf#p5"
      },
      {
        "name": "交通安全対策事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "市民",
        "ka": "総務",
        "ref": "kouhyouyoudeta3-4.pdf#p5"
      },
      {
        "name": "安全安心街づくり事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "市長",
        "ka": "危機管理",
        "ref": "kouhyouyoudeta3-4.pdf#p5"
      },
      {
        "name": "街路灯助成事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "市民",
        "ka": "協働推進",
        "ref": "kouhyouyoudeta3-4.pdf#p5"
      },
      {
        "name": "学校安全安心推進事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "教育",
        "ka": "学事",
        "ref": "kouhyouyoudeta3-4.pdf#p5"
      },
      {
        "name": "交通安全施設整備事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "まち",
        "ka": "道路河川",
        "ref": "kouhyouyoudeta3-4.pdf#p5"
      },
      {
        "name": "消費者啓発育成事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "市民",
        "ka": "総務",
        "ref": "kouhyouyoudeta3-4.pdf#p5"
      },
      {
        "name": "生きがい対策事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "福保",
        "ka": "総務",
        "ref": "kouhyouyoudeta3-4.pdf#p6"
      },
      {
        "name": "地域支援事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "福保",
        "ka": "総務健康政策地域保健介護保険",
        "ref": "kouhyouyoudeta3-4.pdf#p6"
      },
      {
        "name": "成年後見制度普及促進事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "福保",
        "ka": "総務",
        "ref": "kouhyouyoudeta3-4.pdf#p6"
      },
      {
        "name": "重度心身障害者医療費助成事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "福保障がい福祉",
        "ka": null,
        "ref": "kouhyouyoudeta3-4.pdf#p6"
      },
      {
        "name": "自立支援サービス事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "福保障がい福祉",
        "ka": null,
        "ref": "kouhyouyoudeta3-4.pdf#p6"
      },
      {
        "name": "障害者のすみよいまちづくり事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "福保障がい福祉",
        "ka": null,
        "ref": "kouhyouyoudeta3-4.pdf#p6"
      },
      {
        "name": "地域生活支援事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "福保障がい福祉",
        "ka": null,
        "ref": "kouhyouyoudeta3-4.pdf#p6"
      },
      {
        "name": "生活保護扶助事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "福保",
        "ka": "生活福祉",
        "ref": "kouhyouyoudeta3-4.pdf#p6"
      },
      {
        "name": "生活困窮者自立支援事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "福保",
        "ka": "生活福祉",
        "ref": "kouhyouyoudeta3-4.pdf#p6"
      },
      {
        "name": "国民健康保険事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "福保",
        "ka": "健康保険",
        "ref": "kouhyouyoudeta3-4.pdf#p6"
      },
      {
        "name": "健康政策推進事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "福保健康政策課",
        "ka": null,
        "ref": "kouhyouyoudeta3-4.pdf#p6"
      },
      {
        "name": "健康づくり推進事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "福保",
        "ka": "地域保健",
        "ref": "kouhyouyoudeta3-4.pdf#p6"
      },
      {
        "name": "精神保健福祉事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "福保",
        "ka": "精神保健",
        "ref": "kouhyouyoudeta3-4.pdf#p6"
      },
      {
        "name": "健康診査事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "福保",
        "ka": "地域保健",
        "ref": "kouhyouyoudeta3-4.pdf#p7"
      },
      {
        "name": "各種予防事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "福保医務感染症",
        "ka": null,
        "ref": "kouhyouyoudeta3-4.pdf#p7"
      },
      {
        "name": "感染症対策事業",
        "grade": "A",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "福保医務感染症",
        "ka": null,
        "ref": "kouhyouyoudeta3-4.pdf#p7"
      },
      {
        "name": "病院経営推進事業",
        "grade": "C",
        "prevGrade": "C",
        "budgetName": null,
        "bu": "病院",
        "ka": "経営企画",
        "ref": "kouhyouyoudeta3-4.pdf#p7"
      },
      {
        "name": "地域医療連携事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "病院",
        "ka": "総務",
        "ref": "kouhyouyoudeta3-4.pdf#p7"
      },
      {
        "name": "地球温暖化対策事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "環境",
        "ka": "環境保全",
        "ref": "kouhyouyoudeta3-4.pdf#p7"
      },
      {
        "name": "都市美化事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "環境",
        "ka": "収集衛生",
        "ref": "kouhyouyoudeta3-4.pdf#p7"
      },
      {
        "name": "環境対策事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "環境",
        "ka": "環境保全",
        "ref": "kouhyouyoudeta3-4.pdf#p7"
      },
      {
        "name": "遊亀公園・附属動物園整備事業費",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "まち",
        "ka": "公園緑地",
        "ref": "kouhyouyoudeta3-4.pdf#p7"
      },
      {
        "name": "ごみ減量と資源リサイクル事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "環境",
        "ka": "減量",
        "ref": "kouhyouyoudeta3-4.pdf#p7"
      },
      {
        "name": "景観まちづくり推進事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "まち",
        "ka": "都市計画",
        "ref": "kouhyouyoudeta3-4.pdf#p7"
      },
      {
        "name": "住宅管理事務",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "まち",
        "ka": "住宅",
        "ref": "kouhyouyoudeta3-4.pdf#p8"
      },
      {
        "name": "建築物耐震化支援事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "まち",
        "ka": "建築指導",
        "ref": "kouhyouyoudeta3-4.pdf#p8"
      },
      {
        "name": "空家等対策推進事業",
        "grade": "B",
        "prevGrade": "C",
        "budgetName": null,
        "bu": "まち空き屋対策",
        "ka": null,
        "ref": "kouhyouyoudeta3-4.pdf#p8"
      },
      {
        "name": "水源保全活動推進事業",
        "grade": "B",
        "prevGrade": "C",
        "budgetName": null,
        "bu": "上下",
        "ka": "水保全",
        "ref": "kouhyouyoudeta3-4.pdf#p8"
      },
      {
        "name": "水源域の水質調査事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "上下",
        "ka": "浄水",
        "ref": "kouhyouyoudeta3-4.pdf#p8"
      },
      {
        "name": "水道管路耐震化事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "上下",
        "ka": "水道",
        "ref": "kouhyouyoudeta3-4.pdf#p8"
      },
      {
        "name": "汚水管きょ整備事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "計画／下水上下",
        "ka": "道",
        "ref": "kouhyouyoudeta3-4.pdf#p8"
      },
      {
        "name": "下水道接続促進事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "上下",
        "ka": "給排水",
        "ref": "kouhyouyoudeta3-4.pdf#p8"
      },
      {
        "name": "下水道地震対策事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "下水道課／上下浄化センター",
        "ka": null,
        "ref": "kouhyouyoudeta3-4.pdf#p8"
      },
      {
        "name": "動物愛護事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "生活衛生薬福保",
        "ka": "務",
        "ref": "kouhyouyoudeta3-4.pdf#p8"
      },
      {
        "name": "生活衛生事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "福保生活衛生薬",
        "ka": "健康政策務",
        "ref": "kouhyouyoudeta3-4.pdf#p8"
      },
      {
        "name": "バス利用促進対策事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "まち",
        "ka": "交通政策",
        "ref": "kouhyouyoudeta3-4.pdf#p8"
      },
      {
        "name": "在来鉄道の利便性向上事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "まち",
        "ka": "交通政策",
        "ref": "kouhyouyoudeta3-4.pdf#p9"
      },
      {
        "name": "和戸町竜王線整備事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "まち",
        "ka": "都市整備",
        "ref": "kouhyouyoudeta3-4.pdf#p9"
      },
      {
        "name": "城東三丁目敷島線整備事業",
        "grade": "B",
        "prevGrade": "R3新規",
        "budgetName": null,
        "bu": "まち",
        "ka": "都市整備",
        "ref": "kouhyouyoudeta3-4.pdf#p9"
      },
      {
        "name": "国玉通り線整備事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "まち",
        "ka": "都市整備",
        "ref": "kouhyouyoudeta3-4.pdf#p9"
      },
      {
        "name": "市道新設改良事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "まち",
        "ka": "都市整備",
        "ref": "kouhyouyoudeta3-4.pdf#p9"
      },
      {
        "name": "橋りょう長寿命化修繕事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "まち",
        "ka": "道路河川",
        "ref": "kouhyouyoudeta3-4.pdf#p9"
      },
      {
        "name": "道路維持管理事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "まち",
        "ka": "道路河川",
        "ref": "kouhyouyoudeta3-4.pdf#p9"
      },
      {
        "name": "甲府駅周辺土地区画整理事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "まち",
        "ka": "区画整理",
        "ref": "kouhyouyoudeta3-4.pdf#p9"
      },
      {
        "name": "都市基本計画推進事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "まち",
        "ka": "都市計画",
        "ref": "kouhyouyoudeta3-4.pdf#p9"
      },
      {
        "name": "地籍調査事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "まち",
        "ka": "地籍調査",
        "ref": "kouhyouyoudeta3-4.pdf#p9"
      },
      {
        "name": "まちづくり計画推進事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "市民",
        "ka": "協働推進",
        "ref": "kouhyouyoudeta3-4.pdf#p9"
      },
      {
        "name": "協働づくり推進事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "市民",
        "ka": "協働推進協働支援",
        "ref": "kouhyouyoudeta3-4.pdf#p10"
      },
      {
        "name": "地域のまちづくり支援事業",
        "grade": "B",
        "prevGrade": "R3新規",
        "budgetName": null,
        "bu": "市民",
        "ka": "協働支援",
        "ref": "kouhyouyoudeta3-4.pdf#p10"
      },
      {
        "name": "市民組織事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "市民",
        "ka": "協働推進",
        "ref": "kouhyouyoudeta3-4.pdf#p10"
      },
      {
        "name": "地域集会施設整備助成事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "市民",
        "ka": "協働推進",
        "ref": "kouhyouyoudeta3-4.pdf#p10"
      },
      {
        "name": "広報推進事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "市長",
        "ka": "情報発信",
        "ref": "kouhyouyoudeta3-4.pdf#p10"
      },
      {
        "name": "広聴活動事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "市民",
        "ka": "協働推進",
        "ref": "kouhyouyoudeta3-4.pdf#p10"
      },
      {
        "name": "連携推進事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "企画自治体連携",
        "ka": null,
        "ref": "kouhyouyoudeta3-4.pdf#p10"
      },
      {
        "name": "職員研修事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "行政",
        "ka": "研修厚生",
        "ref": "kouhyouyoudeta3-4.pdf#p10"
      },
      {
        "name": "公共施設等マネジメント推進事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "企画",
        "ka": "財産活用",
        "ref": "kouhyouyoudeta3-4.pdf#p10"
      },
      {
        "name": "ふるさと応援寄附金推進事業",
        "grade": "A",
        "prevGrade": "A",
        "budgetName": null,
        "bu": "産業ふるさと納税",
        "ka": null,
        "ref": "kouhyouyoudeta3-4.pdf#p10"
      },
      {
        "name": "シティプロモーション事業",
        "grade": "B",
        "prevGrade": "B",
        "budgetName": null,
        "bu": "市長",
        "ka": "情報発信",
        "ref": "kouhyouyoudeta3-4.pdf#p10"
      }
    ]
  },
  {
    "fy": "R3",
    "fyLabel": "令和3年度",
    "sourceTitle": "令和3年度 甲府市行政評価（事務事業評価）結果一覧",
    "sourceUrl": "https://web.archive.org/web/20260712140840/https://www.city.kofu.yamanashi.jp/zaise/documents/hyoukahyou2.xlsx",
    "originUrl": "https://www.city.kofu.yamanashi.jp/zaise/documents/hyoukahyou2.xlsx",
    "sourceLocalUrl": "/sources/kofu-gyousei-hyouka-r3/hyoukahyou2.xlsx",
    "items": [
      {
        "name": "放課後児童クラブ事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "子ども未来部",
        "ka": "子ども保育課",
        "ref": "hyoukahyou2.xlsx#第1号様式!5"
      },
      {
        "name": "教育･保育施設等運営給付事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "子ども未来部",
        "ka": "子ども保育課",
        "ref": "hyoukahyou2.xlsx#第1号様式!6"
      },
      {
        "name": "幼児教育施設利用費等助成事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "子ども未来部",
        "ka": "子ども保育課",
        "ref": "hyoukahyou2.xlsx#第1号様式!7"
      },
      {
        "name": "すこやか子育て医療費助成事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "子ども未来部",
        "ka": "子育て支援課",
        "ref": "hyoukahyou2.xlsx#第1号様式!8"
      },
      {
        "name": "ひとり親家庭等医療費助成事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "子ども未来部",
        "ka": "子育て支援課",
        "ref": "hyoukahyou2.xlsx#第1号様式!9"
      },
      {
        "name": "多子世帯等への利用者負担額（保育料）軽減事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "子ども未来部",
        "ka": "子ども保育課",
        "ref": "hyoukahyou2.xlsx#第1号様式!10"
      },
      {
        "name": "子育て総合相談窓口運営事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "子ども未来部",
        "ka": "子育て支援課",
        "ref": "hyoukahyou2.xlsx#第1号様式!11"
      },
      {
        "name": "母子保健事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "子ども未来部",
        "ka": "母子保健課",
        "ref": "hyoukahyou2.xlsx#第1号様式!12"
      },
      {
        "name": "子ども応援事業（旧：子ども支援推進事業）",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "子ども未来部",
        "ka": "子ども応援課",
        "ref": "hyoukahyou2.xlsx#第1号様式!14"
      },
      {
        "name": "放課後子供教室推進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "生涯学習課",
        "ref": "hyoukahyou2.xlsx#第1号様式!15"
      },
      {
        "name": "子ども運動遊び事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "子ども未来部",
        "ka": "子ども応援課",
        "ref": "hyoukahyou2.xlsx#第1号様式!16"
      },
      {
        "name": "小学校外国語活動推進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "学校教育課",
        "ref": "hyoukahyou2.xlsx#第1号様式!17"
      },
      {
        "name": "外国人講師による英語指導事業（中学校）",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "学校教育課",
        "ref": "hyoukahyou2.xlsx#第1号様式!18"
      },
      {
        "name": "サポートティーチャー事業(小学校)",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "学校教育課",
        "ref": "hyoukahyou2.xlsx#第1号様式!19"
      },
      {
        "name": "サポートティーチャー事業(中学校)",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "学校教育課",
        "ref": "hyoukahyou2.xlsx#第1号様式!20"
      },
      {
        "name": "新しい時代を担う人づくり基金事業(甲府の教育推進事業）",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "学校教育課",
        "ref": "hyoukahyou2.xlsx#第1号様式!21"
      },
      {
        "name": "学校危機管理体制整備事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "学校教育課",
        "ref": "hyoukahyou2.xlsx#第1号様式!22"
      },
      {
        "name": "学校給食事業（小学校）（学校給食）",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "学事課",
        "ref": "hyoukahyou2.xlsx#第1号様式!23"
      },
      {
        "name": "学校給食事業（中学校）",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "学事課",
        "ref": "hyoukahyou2.xlsx#第1号様式!24"
      },
      {
        "name": "小学校老朽化リニューアル事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "まちづくり部",
        "ka": "建築営繕課",
        "ref": "hyoukahyou2.xlsx#第1号様式!25"
      },
      {
        "name": "中学校老朽化リニューアル事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "まちづくり部",
        "ka": "建築営繕課",
        "ref": "hyoukahyou2.xlsx#第1号様式!26"
      },
      {
        "name": "中道北小学校移転事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "まちづくり部",
        "ka": "建築営繕課",
        "ref": "hyoukahyou2.xlsx#第1号様式!27"
      },
      {
        "name": "教材・情報環境整備事業（小学校）",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "学事課",
        "ref": "hyoukahyou2.xlsx#第1号様式!28"
      },
      {
        "name": "教材・情報環境整備事業（中学校）",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "学事課",
        "ref": "hyoukahyou2.xlsx#第1号様式!29"
      },
      {
        "name": "外国人講師による英語指導事業（高校）",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "学校教育課",
        "ref": "hyoukahyou2.xlsx#第1号様式!30"
      },
      {
        "name": "青少年健全育成事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "子ども未来部",
        "ka": "子ども応援課",
        "ref": "hyoukahyou2.xlsx#第1号様式!31"
      },
      {
        "name": "生涯学習振興事業",
        "grade": "C",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "生涯学習課",
        "ref": "hyoukahyou2.xlsx#第1号様式!32"
      },
      {
        "name": "図書館管理運営事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "図書館",
        "ref": "hyoukahyou2.xlsx#第1号様式!33"
      },
      {
        "name": "スポーツ振興事業",
        "grade": "C",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "スポーツ課",
        "ref": "hyoukahyou2.xlsx#第1号様式!34"
      },
      {
        "name": "東京オリンピック・パラリンピック事前合宿等推進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市長直轄組織",
        "ka": "国際交流課",
        "ref": "hyoukahyou2.xlsx#第1号様式!35"
      },
      {
        "name": "緑が丘スポーツ公園整備事業費",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "まちづくり部",
        "ka": "公園緑地課",
        "ref": "hyoukahyou2.xlsx#第1号様式!36"
      },
      {
        "name": "文化芸術推進事業",
        "grade": "C",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "生涯学習課",
        "ref": "hyoukahyou2.xlsx#第1号様式!37"
      },
      {
        "name": "史跡武田氏館跡整備事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "歴史文化財課",
        "ref": "hyoukahyou2.xlsx#第1号様式!38"
      },
      {
        "name": "文化財保護事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "歴史文化財課",
        "ref": "hyoukahyou2.xlsx#第1号様式!39"
      },
      {
        "name": "人権推進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市民部",
        "ka": "人権男女参画課",
        "ref": "hyoukahyou2.xlsx#第1号様式!40"
      },
      {
        "name": "平和都市宣言事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市民部",
        "ka": "総務課",
        "ref": "hyoukahyou2.xlsx#第1号様式!41"
      },
      {
        "name": "男女共同参画推進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市民部",
        "ka": "人権男女参画課",
        "ref": "hyoukahyou2.xlsx#第1号様式!42"
      },
      {
        "name": "国際交流事業",
        "grade": "C",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市長直轄組織",
        "ka": "秘書課国際交流課",
        "ref": "hyoukahyou2.xlsx#第1号様式!43"
      },
      {
        "name": "新しい時代を担う人づくり基金事業(姉妹・友好都市教育交流事業)",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "学校教育課",
        "ref": "hyoukahyou2.xlsx#第1号様式!44"
      },
      {
        "name": "多文化共生推進事業",
        "grade": "C",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市民部",
        "ka": "市民課",
        "ref": "hyoukahyou2.xlsx#第1号様式!45"
      },
      {
        "name": "商工業推進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "産業部",
        "ka": "商工課",
        "ref": "hyoukahyou2.xlsx#第1号様式!46"
      },
      {
        "name": "融資対策事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "産業部",
        "ka": "商工課",
        "ref": "hyoukahyou2.xlsx#第1号様式!47"
      },
      {
        "name": "産業立地等推進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "まちづくり部",
        "ka": "産業立地課",
        "ref": "hyoukahyou2.xlsx#第1号様式!48"
      },
      {
        "name": "地場産業振興対策事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "産業部",
        "ka": "商工課",
        "ref": "hyoukahyou2.xlsx#第1号様式!49"
      },
      {
        "name": "農業経営基盤強化促進対策事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "産業部",
        "ka": "就農支援課",
        "ref": "hyoukahyou2.xlsx#第1号様式!50"
      },
      {
        "name": "産地保全強化対策事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "産業部",
        "ka": "農政課",
        "ref": "hyoukahyou2.xlsx#第1号様式!51"
      },
      {
        "name": "森づくり推進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "産業部",
        "ka": "林政課",
        "ref": "hyoukahyou2.xlsx#第1号様式!52"
      },
      {
        "name": "林道維持管理事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "産業部",
        "ka": "林政課",
        "ref": "hyoukahyou2.xlsx#第1号様式!53"
      },
      {
        "name": "雇用促進対策事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "産業部",
        "ka": "雇用創生課",
        "ref": "hyoukahyou2.xlsx#第1号様式!54"
      },
      {
        "name": "地方卸売市場運営事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "産業部",
        "ka": "経営管理課",
        "ref": "hyoukahyou2.xlsx#第1号様式!55"
      },
      {
        "name": "地方卸売市場施設整備事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "産業部",
        "ka": "経営管理課",
        "ref": "hyoukahyou2.xlsx#第1号様式!56"
      },
      {
        "name": "まつり推進事業",
        "grade": "C",
        "prevGrade": null,
        "budgetName": null,
        "bu": "産業部",
        "ka": "観光課",
        "ref": "hyoukahyou2.xlsx#第1号様式!57"
      },
      {
        "name": "観光開発事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "産業部",
        "ka": "観光課",
        "ref": "hyoukahyou2.xlsx#第1号様式!58"
      },
      {
        "name": "中心市街地商業等活性化事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "産業部",
        "ka": "商工課",
        "ref": "hyoukahyou2.xlsx#第1号様式!59"
      },
      {
        "name": "甲府城周辺地域活性化計画整備事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "まちづくり部",
        "ka": "都市計画課",
        "ref": "hyoukahyou2.xlsx#第1号様式!60"
      },
      {
        "name": "移住・定住促進事業（旧：ふるさと絆支援事業）",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市長直轄組織",
        "ka": "情報発信課",
        "ref": "hyoukahyou2.xlsx#第1号様式!61"
      },
      {
        "name": "南北地域振興事業",
        "grade": "C",
        "prevGrade": null,
        "budgetName": null,
        "bu": "産業部",
        "ka": "林政課",
        "ref": "hyoukahyou2.xlsx#第1号様式!62"
      },
      {
        "name": "防災対策整備事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市長直轄組織",
        "ka": "防災企画課地域防災課",
        "ref": "hyoukahyou2.xlsx#第1号様式!63"
      },
      {
        "name": "一般河川改修事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "まちづくり部",
        "ka": "道路河川課",
        "ref": "hyoukahyou2.xlsx#第1号様式!64"
      },
      {
        "name": "危機管理対策事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市長直轄組織",
        "ka": "危機管理課",
        "ref": "hyoukahyou2.xlsx#第1号様式!65"
      },
      {
        "name": "消火栓設置事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "消防本部",
        "ka": "警防課",
        "ref": "hyoukahyou2.xlsx#第1号様式!66"
      },
      {
        "name": "消防施設等整備事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "消防本部",
        "ka": "警防課",
        "ref": "hyoukahyou2.xlsx#第1号様式!67"
      },
      {
        "name": "非常備消防事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "消防本部",
        "ka": "人事課警防課",
        "ref": "hyoukahyou2.xlsx#第1号様式!68"
      },
      {
        "name": "交通安全対策事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市民部",
        "ka": "総務課",
        "ref": "hyoukahyou2.xlsx#第1号様式!69"
      },
      {
        "name": "安全安心街づくり事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市長直轄組織",
        "ka": "危機管理課",
        "ref": "hyoukahyou2.xlsx#第1号様式!70"
      },
      {
        "name": "街路灯助成事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市民部",
        "ka": "協働推進課",
        "ref": "hyoukahyou2.xlsx#第1号様式!71"
      },
      {
        "name": "学校安全安心推進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "学事課",
        "ref": "hyoukahyou2.xlsx#第1号様式!72"
      },
      {
        "name": "交通安全施設整備事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "まちづくり部",
        "ka": "道路河川課",
        "ref": "hyoukahyou2.xlsx#第1号様式!73"
      },
      {
        "name": "消費者啓発育成事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市民部",
        "ka": "総務課",
        "ref": "hyoukahyou2.xlsx#第1号様式!74"
      },
      {
        "name": "地域支援事業（再掲）",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "総務課健康政策課地域保健課介護保険課",
        "ref": "hyoukahyou2.xlsx#第1号様式!75"
      },
      {
        "name": "生きがい対策事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "総務課",
        "ref": "hyoukahyou2.xlsx#第1号様式!76"
      },
      {
        "name": "地域支援事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "総務課健康政策課地域保健課介護保険課",
        "ref": "hyoukahyou2.xlsx#第1号様式!77"
      },
      {
        "name": "成年後見制度普及促進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "総務課",
        "ref": "hyoukahyou2.xlsx#第1号様式!78"
      },
      {
        "name": "重度心身障害者医療費助成事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "障がい福祉課",
        "ref": "hyoukahyou2.xlsx#第1号様式!79"
      },
      {
        "name": "自立支援サービス事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "障がい福祉課",
        "ref": "hyoukahyou2.xlsx#第1号様式!80"
      },
      {
        "name": "障害者のすみよいまちづくり事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "障がい福祉課",
        "ref": "hyoukahyou2.xlsx#第1号様式!81"
      },
      {
        "name": "地域生活支援事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "障がい福祉課",
        "ref": "hyoukahyou2.xlsx#第1号様式!82"
      },
      {
        "name": "生活保護扶助事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "生活福祉課",
        "ref": "hyoukahyou2.xlsx#第1号様式!83"
      },
      {
        "name": "生活困窮者自立支援事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "生活福祉課",
        "ref": "hyoukahyou2.xlsx#第1号様式!84"
      },
      {
        "name": "国民健康保険事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "健康保険課",
        "ref": "hyoukahyou2.xlsx#第1号様式!85"
      },
      {
        "name": "健康づくり推進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "地域保健課",
        "ref": "hyoukahyou2.xlsx#第1号様式!86"
      },
      {
        "name": "母子保健事業（再掲）",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "母子健康課",
        "ref": "hyoukahyou2.xlsx#第1号様式!90"
      },
      {
        "name": "健康診査事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "地域保健課",
        "ref": "hyoukahyou2.xlsx#第1号様式!92"
      },
      {
        "name": "各種予防事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "医務感染症課",
        "ref": "hyoukahyou2.xlsx#第1号様式!93"
      },
      {
        "name": "感染症対策事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "医務感染症課",
        "ref": "hyoukahyou2.xlsx#第1号様式!94"
      },
      {
        "name": "病院経営推進事業",
        "grade": "C",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市立甲府病院事務局",
        "ka": "総務課",
        "ref": "hyoukahyou2.xlsx#第1号様式!95"
      },
      {
        "name": "地域医療連携事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市立甲府病院事務局",
        "ka": "総務課",
        "ref": "hyoukahyou2.xlsx#第1号様式!96"
      },
      {
        "name": "救急医療体制整備事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "医務感染症課",
        "ref": "hyoukahyou2.xlsx#第1号様式!97"
      },
      {
        "name": "地球温暖化対策事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "環境部",
        "ka": "環境保全課",
        "ref": "hyoukahyou2.xlsx#第1号様式!99"
      },
      {
        "name": "都市美化事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "環境部",
        "ka": "収集衛生課",
        "ref": "hyoukahyou2.xlsx#第1号様式!100"
      },
      {
        "name": "環境対策事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "環境部",
        "ka": "環境保全課",
        "ref": "hyoukahyou2.xlsx#第1号様式!101"
      },
      {
        "name": "遊亀公園・附属動物園整備事業費",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "まちづくり部",
        "ka": "公園緑地課",
        "ref": "hyoukahyou2.xlsx#第1号様式!102"
      },
      {
        "name": "ごみ減量と資源リサイクル事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "環境部",
        "ka": "減量課",
        "ref": "hyoukahyou2.xlsx#第1号様式!103"
      },
      {
        "name": "景観まちづくり推進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "まちづくり部",
        "ka": "都市計画課",
        "ref": "hyoukahyou2.xlsx#第1号様式!104"
      },
      {
        "name": "住宅管理事務",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "まちづくり部",
        "ka": "住宅課",
        "ref": "hyoukahyou2.xlsx#第1号様式!105"
      },
      {
        "name": "建築物耐震化支援事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "まちづくり部",
        "ka": "建築指導課",
        "ref": "hyoukahyou2.xlsx#第1号様式!106"
      },
      {
        "name": "空家等対策推進事業",
        "grade": "C",
        "prevGrade": null,
        "budgetName": null,
        "bu": "まちづくり部",
        "ka": "空き屋対策課",
        "ref": "hyoukahyou2.xlsx#第1号様式!107"
      },
      {
        "name": "水源保全活動推進事業",
        "grade": "C",
        "prevGrade": null,
        "budgetName": null,
        "bu": "上下水道局工務部",
        "ka": "水保全課",
        "ref": "hyoukahyou2.xlsx#第1号様式!108"
      },
      {
        "name": "水源域の水質調査事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "上下水道局工務部",
        "ka": "浄水課",
        "ref": "hyoukahyou2.xlsx#第1号様式!109"
      },
      {
        "name": "水道管路耐震化事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "上下水道局工務部",
        "ka": "水道課",
        "ref": "hyoukahyou2.xlsx#第1号様式!110"
      },
      {
        "name": "汚水管きょ整備事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "上下水道局工務部",
        "ka": "計画課下水道課",
        "ref": "hyoukahyou2.xlsx#第1号様式!111"
      },
      {
        "name": "下水道接続促進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "上下水道局業務部",
        "ka": "給排水課",
        "ref": "hyoukahyou2.xlsx#第1号様式!112"
      },
      {
        "name": "下水道地震対策事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "上下水道局工務部",
        "ka": "下水道課浄化センター",
        "ref": "hyoukahyou2.xlsx#第1号様式!113"
      },
      {
        "name": "動物愛護事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "生活衛生薬務課",
        "ref": "hyoukahyou2.xlsx#第1号様式!114"
      },
      {
        "name": "生活衛生事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "健康政策課生活衛生薬務課",
        "ref": "hyoukahyou2.xlsx#第1号様式!115"
      },
      {
        "name": "公共交通体系整備推進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "まちづくり部",
        "ka": "リニア政策課",
        "ref": "hyoukahyou2.xlsx#第1号様式!116"
      },
      {
        "name": "バス利用促進対策事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "まちづくり部",
        "ka": "交通政策課",
        "ref": "hyoukahyou2.xlsx#第1号様式!118"
      },
      {
        "name": "在来鉄道の利便性向上事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "まちづくり部",
        "ka": "交通政策課",
        "ref": "hyoukahyou2.xlsx#第1号様式!119"
      },
      {
        "name": "都市基本計画推進事業（都市計画道路の整備）",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "まちづくり部",
        "ka": "都市計画課",
        "ref": "hyoukahyou2.xlsx#第1号様式!120"
      },
      {
        "name": "和戸町竜王線整備事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "まちづくり部",
        "ka": "都市整備課",
        "ref": "hyoukahyou2.xlsx#第1号様式!121"
      },
      {
        "name": "城東三丁目敷島線整備事業",
        "grade": "－",
        "prevGrade": null,
        "budgetName": null,
        "bu": "まちづくり部",
        "ka": "都市整備課",
        "ref": "hyoukahyou2.xlsx#第1号様式!122"
      },
      {
        "name": "国玉通り線整備事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "まちづくり部",
        "ka": "都市整備課",
        "ref": "hyoukahyou2.xlsx#第1号様式!123"
      },
      {
        "name": "市道新設改良事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "まちづくり部",
        "ka": "都市整備課",
        "ref": "hyoukahyou2.xlsx#第1号様式!124"
      },
      {
        "name": "橋りょう長寿命化修繕事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "まちづくり部",
        "ka": "道路河川課",
        "ref": "hyoukahyou2.xlsx#第1号様式!125"
      },
      {
        "name": "道路維持管理事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "まちづくり部",
        "ka": "道路河川課",
        "ref": "hyoukahyou2.xlsx#第1号様式!126"
      },
      {
        "name": "甲府駅周辺土地区画整理事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "まちづくり部",
        "ka": "区画整理課",
        "ref": "hyoukahyou2.xlsx#第1号様式!127"
      },
      {
        "name": "地籍調査事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "まちづくり部",
        "ka": "地籍調査課",
        "ref": "hyoukahyou2.xlsx#第1号様式!128"
      },
      {
        "name": "まちづくり計画推進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市民部",
        "ka": "協働推進課",
        "ref": "hyoukahyou2.xlsx#第1号様式!129"
      },
      {
        "name": "協働づくり推進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市民部",
        "ka": "協働推進課協働支援課",
        "ref": "hyoukahyou2.xlsx#第1号様式!130"
      },
      {
        "name": "地域のまちづくり支援事業",
        "grade": "－",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市民部",
        "ka": "協働支援課",
        "ref": "hyoukahyou2.xlsx#第1号様式!131"
      },
      {
        "name": "市民組織事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市民部",
        "ka": "協働推進課",
        "ref": "hyoukahyou2.xlsx#第1号様式!132"
      },
      {
        "name": "地域集会施設整備助成事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市民部",
        "ka": "協働推進課",
        "ref": "hyoukahyou2.xlsx#第1号様式!133"
      },
      {
        "name": "広報推進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市長直轄組織",
        "ka": "情報発信課",
        "ref": "hyoukahyou2.xlsx#第1号様式!134"
      },
      {
        "name": "広聴活動事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市民部",
        "ka": "協働推進課",
        "ref": "hyoukahyou2.xlsx#第1号様式!135"
      },
      {
        "name": "連携推進事業（旧：広域行政推進事業）",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "企画財務部",
        "ka": "自治体連携課",
        "ref": "hyoukahyou2.xlsx#第1号様式!136"
      },
      {
        "name": "こうふ開府500年記念事業",
        "grade": "C",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市長直轄組織",
        "ka": "記念事業課",
        "ref": "hyoukahyou2.xlsx#第1号様式!137"
      },
      {
        "name": "職員研修事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "行政経営部",
        "ka": "研修厚生課",
        "ref": "hyoukahyou2.xlsx#第1号様式!138"
      },
      {
        "name": "公共施設等マネジメント推進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "行政経営部",
        "ka": "財産活用課",
        "ref": "hyoukahyou2.xlsx#第1号様式!139"
      },
      {
        "name": "ふるさと応援寄附金推進事業",
        "grade": "A",
        "prevGrade": null,
        "budgetName": null,
        "bu": "産業部",
        "ka": "ふるさと納税課",
        "ref": "hyoukahyou2.xlsx#第1号様式!140"
      },
      {
        "name": "外部評価制度の実施事業",
        "grade": "C",
        "prevGrade": null,
        "budgetName": null,
        "bu": "行政経営部",
        "ka": "行政経営課",
        "ref": "hyoukahyou2.xlsx#第1号様式!141"
      },
      {
        "name": "シティプロモーション事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市長直轄組織",
        "ka": "情報発信課",
        "ref": "hyoukahyou2.xlsx#第1号様式!142"
      }
    ]
  },
  {
    "fy": "R2",
    "fyLabel": "令和2年度",
    "sourceTitle": "令和2年度 甲府市行政評価（事務事業評価）結果一覧",
    "sourceUrl": "https://web.archive.org/web/20260712141123/https://www.city.kofu.yamanashi.jp/zaise/documents/r02kekkaichiran.xlsx",
    "originUrl": "https://www.city.kofu.yamanashi.jp/zaise/documents/r02kekkaichiran.xlsx",
    "sourceLocalUrl": "/sources/kofu-gyousei-hyouka-r2/r02kekkaichiran.xlsx",
    "items": [
      {
        "name": "放課後児童クラブ事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "子ども未来部",
        "ka": "子ども保育課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!3"
      },
      {
        "name": "教育･保育施設等運営給付事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "子ども未来部",
        "ka": "子ども保育課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!4"
      },
      {
        "name": "幼児教育施設利用費等助成事業費",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "子ども未来部",
        "ka": "子ども保育課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!5"
      },
      {
        "name": "すこやか子育て医療費助成事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "子ども未来部",
        "ka": "子育て支援課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!6"
      },
      {
        "name": "ひとり親家庭等医療費助成事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "子ども未来部",
        "ka": "子育て支援課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!7"
      },
      {
        "name": "多子世帯等への利用者負担額（保育料）軽減事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "子ども未来部",
        "ka": "子ども保育課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!8"
      },
      {
        "name": "子育て総合相談窓口運営事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "子ども未来部",
        "ka": "子育て支援課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!9"
      },
      {
        "name": "母子保健事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "子ども未来部",
        "ka": "母子保健課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!10"
      },
      {
        "name": "母子保健事業（再掲）",
        "grade": "－",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "母子健康課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!11"
      },
      {
        "name": "子ども支援推進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "子ども未来部",
        "ka": "子ども応援課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!12"
      },
      {
        "name": "放課後子供教室推進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "生涯学習課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!13"
      },
      {
        "name": "子ども運動遊び事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "子ども未来部",
        "ka": "子ども応援課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!14"
      },
      {
        "name": "小学校外国語活動推進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "学校教育課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!15"
      },
      {
        "name": "外国人講師による英語指導事業（中学校）",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "学校教育課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!16"
      },
      {
        "name": "サポートティチャー事業(小学校)",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "学校教育課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!17"
      },
      {
        "name": "サポートティチャー事業(中学校)",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "学校教育課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!18"
      },
      {
        "name": "教育指導事業（小・中学校）",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "学校教育課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!19"
      },
      {
        "name": "新しい時代を担う人づくり基金事業(甲府の教育推進事業）",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "学校教育課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!20"
      },
      {
        "name": "学校危機管理体制整備事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "学校教育課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!21"
      },
      {
        "name": "学校給食事業（小学校）",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "学事課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!22"
      },
      {
        "name": "学校給食事業（中学校）",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "学事課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!23"
      },
      {
        "name": "小学校老朽化リニューアル事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "まちづくり部",
        "ka": "建築営繕課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!24"
      },
      {
        "name": "中学校老朽化リニューアル事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "まちづくり部",
        "ka": "建築営繕課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!25"
      },
      {
        "name": "中道北小学校移転事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "まちづくり部",
        "ka": "建築営繕課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!26"
      },
      {
        "name": "教材・情報環境整備事業（小学校）",
        "grade": "A",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "学事課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!27"
      },
      {
        "name": "教材・情報環境整備事業（中学校）",
        "grade": "A",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "学事課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!28"
      },
      {
        "name": "外国人講師による英語指導事業（高校）",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "学校教育課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!29"
      },
      {
        "name": "青少年健全育成事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "子ども未来部",
        "ka": "子ども応援課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!30"
      },
      {
        "name": "生涯学習振興事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "生涯学習課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!31"
      },
      {
        "name": "図書館管理運営事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "図書館",
        "ref": "r02kekkaichiran.xlsx#事業一覧!32"
      },
      {
        "name": "生涯学習振興事業（再掲）",
        "grade": "－",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "生涯学習課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!33"
      },
      {
        "name": "スポーツ振興事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "スポーツ課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!34"
      },
      {
        "name": "東京オリンピック・パラリンピック事前合宿等推進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市長直轄組織",
        "ka": "国際交流課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!35"
      },
      {
        "name": "スポーツ振興事業（再掲）",
        "grade": "－",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "スポーツ課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!36"
      },
      {
        "name": "緑ヶ丘スポーツ公園整備事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "まちづくり部",
        "ka": "公園緑地課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!37"
      },
      {
        "name": "文化芸術推進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "生涯学習課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!38"
      },
      {
        "name": "史跡武田氏館跡整備事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "歴史文化財課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!40"
      },
      {
        "name": "文化財保護事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "歴史文化財課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!41"
      },
      {
        "name": "人権推進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市民部",
        "ka": "人権男女参画課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!42"
      },
      {
        "name": "平和都市宣言事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市民部",
        "ka": "総務課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!43"
      },
      {
        "name": "男女共同参画推進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市民部",
        "ka": "人権男女参画課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!44"
      },
      {
        "name": "国際交流事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市長直轄組織",
        "ka": "秘書課国際交流課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!45"
      },
      {
        "name": "東京オリンピック・パラリンピック事前合宿等推進事業（再掲）",
        "grade": "－",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市長直轄組織",
        "ka": "国際交流課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!46"
      },
      {
        "name": "新しい時代を担う人づくり基金事業(姉妹・友好都市教育交流事業)",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "学校教育課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!47"
      },
      {
        "name": "多文化共生推進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市民部",
        "ka": "市民課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!48"
      },
      {
        "name": "商工業推進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "産業部",
        "ka": "商工課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!49"
      },
      {
        "name": "商工業推進事業（再掲）",
        "grade": "－",
        "prevGrade": null,
        "budgetName": null,
        "bu": "産業部",
        "ka": "商工課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!50"
      },
      {
        "name": "融資対策事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "産業部",
        "ka": "商工課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!51"
      },
      {
        "name": "産業立地等推進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "まちづくり部",
        "ka": "産業立地課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!52"
      },
      {
        "name": "地場産業振興対策事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "産業部",
        "ka": "商工課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!53"
      },
      {
        "name": "農業経営基盤強化促進対策事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "産業部",
        "ka": "就農支援課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!54"
      },
      {
        "name": "産地保全強化対策事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "産業部",
        "ka": "農政課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!55"
      },
      {
        "name": "産地保全強化対策事業（再掲）",
        "grade": "－",
        "prevGrade": null,
        "budgetName": null,
        "bu": "産業部",
        "ka": "農政課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!56"
      },
      {
        "name": "森づくり推進事業（再掲）",
        "grade": "－",
        "prevGrade": null,
        "budgetName": null,
        "bu": "産業部",
        "ka": "林政課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!58"
      },
      {
        "name": "森づくり推進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "産業部",
        "ka": "林政課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!59"
      },
      {
        "name": "既設林道維持管理事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "産業部",
        "ka": "林政課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!60"
      },
      {
        "name": "雇用促進対策事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "産業部",
        "ka": "雇用創生課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!62"
      },
      {
        "name": "地方卸売市場運営事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "産業部",
        "ka": "経営管理課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!64"
      },
      {
        "name": "地方卸売市場施設整備事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "産業部",
        "ka": "経営管理課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!65"
      },
      {
        "name": "まつり推進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "産業部",
        "ka": "観光課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!66"
      },
      {
        "name": "観光開発事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "産業部",
        "ka": "観光課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!67"
      },
      {
        "name": "中心市街地商業等活性化事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "産業部",
        "ka": "商工課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!69"
      },
      {
        "name": "甲府城周辺地域活性化計画整備事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "まちづくり部",
        "ka": "都市計画課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!70"
      },
      {
        "name": "ふるさと絆支援事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市長直轄組織",
        "ka": "情報発信課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!71"
      },
      {
        "name": "南北地域振興事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "産業部",
        "ka": "林政課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!72"
      },
      {
        "name": "防災対策整備事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市長直轄組織",
        "ka": "防災企画課防災指導課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!73"
      },
      {
        "name": "建築物耐震化支援事業（再掲）",
        "grade": "－",
        "prevGrade": null,
        "budgetName": null,
        "bu": "まちづくり部",
        "ka": "建築指導課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!74"
      },
      {
        "name": "一般河川改修事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "まちづくり部",
        "ka": "道路河川課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!75"
      },
      {
        "name": "危機管理対策事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市長直轄組織",
        "ka": "危機管理課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!76"
      },
      {
        "name": "消火栓設置事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "消防本部",
        "ka": "警防課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!77"
      },
      {
        "name": "消防施設等整備事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "消防本部",
        "ka": "警防課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!78"
      },
      {
        "name": "非常備消防事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "消防本部",
        "ka": "人事課警防課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!79"
      },
      {
        "name": "交通安全対策事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市民部",
        "ka": "消費生活課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!81"
      },
      {
        "name": "安全安心街づくり事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市長直轄組織",
        "ka": "危機管理課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!82"
      },
      {
        "name": "街路灯助成事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市民部",
        "ka": "協働推進課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!83"
      },
      {
        "name": "学校安全安心推進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "学事課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!84"
      },
      {
        "name": "交通安全施設整備事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "まちづくり部",
        "ka": "道路河川課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!85"
      },
      {
        "name": "消費者啓発育成事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市民部",
        "ka": "消費生活課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!87"
      },
      {
        "name": "福祉関係計画推進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "総務課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!89"
      },
      {
        "name": "地域支援事業（再掲）",
        "grade": "－",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "健康政策課地域保健課介護保険課高齢者福祉課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!90"
      },
      {
        "name": "生きがい対策事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "高齢者福祉課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!92"
      },
      {
        "name": "地域支援事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "健康政策課地域保健課介護保険課高齢者福祉課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!94"
      },
      {
        "name": "成年後見制度普及促進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "高齢者福祉課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!95"
      },
      {
        "name": "重度心身障害者医療費助成事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "障がい福祉課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!96"
      },
      {
        "name": "自立支援サービス事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "障がい福祉課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!97"
      },
      {
        "name": "障害者のすみよいまちづくり事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "障がい福祉課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!98"
      },
      {
        "name": "地域生活支援事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "障がい福祉課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!99"
      },
      {
        "name": "生活保護扶助事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "生活福祉課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!100"
      },
      {
        "name": "生活困窮者自立支援事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "生活福祉課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!101"
      },
      {
        "name": "国民健康保険事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市民部",
        "ka": "国民健康保険課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!102"
      },
      {
        "name": "健康づくり推進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "健康政策課地域保健課精神保健課生活衛生薬務課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!106"
      },
      {
        "name": "健康づくり推進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "子ども未来部",
        "ka": "母子保健課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!107"
      },
      {
        "name": "母子保健事業（再掲）",
        "grade": "－",
        "prevGrade": null,
        "budgetName": null,
        "bu": "子ども未来部",
        "ka": "母子保健課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!108"
      },
      {
        "name": "母子保健事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "母子健康課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!109"
      },
      {
        "name": "健康診査事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "地域保健課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!110"
      },
      {
        "name": "各種予防事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "医務感染症課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!111"
      },
      {
        "name": "母子保健事業（再掲）",
        "grade": "－",
        "prevGrade": null,
        "budgetName": null,
        "bu": "子ども未来部",
        "ka": "母子保健課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!112"
      },
      {
        "name": "感染症対策事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "医務感染症課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!114"
      },
      {
        "name": "医療安全対策推進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "医務感染症課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!117"
      },
      {
        "name": "救急医療体制整備事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "医務感染症課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!118"
      },
      {
        "name": "救急医療体制整備事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "子ども未来部",
        "ka": "母子保健課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!119"
      },
      {
        "name": "地球温暖化対策事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "環境部",
        "ka": "環境保全課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!121"
      },
      {
        "name": "都市美化事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "環境部",
        "ka": "収集衛生課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!122"
      },
      {
        "name": "環境対策事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "環境部",
        "ka": "環境保全課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!123"
      },
      {
        "name": "動物園整備事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "まちづくり部",
        "ka": "公園緑地課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!126"
      },
      {
        "name": "ごみ減量と資源リサイクル事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "環境部",
        "ka": "減量課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!127"
      },
      {
        "name": "景観まちづくり推進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "まちづくり部",
        "ka": "都市計画課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!129"
      },
      {
        "name": "建築物耐震化支援事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "まちづくり部",
        "ka": "建築指導課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!132"
      },
      {
        "name": "水源域の水質調査事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "上下水道局",
        "ka": "浄水課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!135"
      },
      {
        "name": "水道管路耐震化事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "上下水道局",
        "ka": "水道課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!136"
      },
      {
        "name": "下水道接続促進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "上下水道局",
        "ka": "給排水課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!138"
      },
      {
        "name": "下水道地震対策整備事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "上下水道局",
        "ka": "下水道課浄化センター",
        "ref": "r02kekkaichiran.xlsx#事業一覧!139"
      },
      {
        "name": "し尿処理事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "環境部",
        "ka": "廃棄物対策課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!142"
      },
      {
        "name": "動物愛護事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "生活衛生薬務課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!144"
      },
      {
        "name": "生活衛生事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "生活衛生薬務課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!146"
      },
      {
        "name": "公共交通体系整備推進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "まちづくり部",
        "ka": "リニア政策課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!148"
      },
      {
        "name": "バス利用促進対策事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "まちづくり部",
        "ka": "交通政策課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!149"
      },
      {
        "name": "在来鉄道の利便性向上事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "まちづくり部",
        "ka": "交通政策課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!150"
      },
      {
        "name": "都市基本計画推進事業（都市計画道路の整備）",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "まちづくり部",
        "ka": "都市計画課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!151"
      },
      {
        "name": "和戸町竜王線整備事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "まちづくり部",
        "ka": "都市整備課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!152"
      },
      {
        "name": "市道新設改良事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "まちづくり部",
        "ka": "都市整備課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!153"
      },
      {
        "name": "橋りょう長寿命化修繕事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "まちづくり部",
        "ka": "道路河川課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!154"
      },
      {
        "name": "道路維持管理事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "まちづくり部",
        "ka": "道路河川課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!155"
      },
      {
        "name": "甲府駅周辺土地区画整理事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "まちづくり部",
        "ka": "区画整理課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!156"
      },
      {
        "name": "地籍調査事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "まちづくり部",
        "ka": "地籍調査課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!159"
      },
      {
        "name": "協働づくり推進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市民部",
        "ka": "協働推進課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!160"
      },
      {
        "name": "南北地域振興事業（再掲）",
        "grade": "－",
        "prevGrade": null,
        "budgetName": null,
        "bu": "産業部",
        "ka": "林政課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!162"
      },
      {
        "name": "広報推進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市長直轄組織",
        "ka": "情報発信課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!163"
      },
      {
        "name": "広聴活動事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市民部",
        "ka": "協働推進課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!164"
      },
      {
        "name": "広域行政推進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "企画部",
        "ka": "連携推進課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!165"
      },
      {
        "name": "こうふ開府500年記念事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市長直轄組織",
        "ka": "記念事業課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!166"
      },
      {
        "name": "企画事務",
        "grade": "A",
        "prevGrade": null,
        "budgetName": null,
        "bu": "産業部",
        "ka": "総務課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!167"
      },
      {
        "name": "職員研修事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "総務部",
        "ka": "職員課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!168"
      },
      {
        "name": "公共施設等マネジメント推進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "総務部",
        "ka": "財産活用課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!169"
      },
      {
        "name": "外部評価の実施事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "企画部",
        "ka": "行政経営課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!170"
      },
      {
        "name": "シティプロモーション事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市長直轄組織",
        "ka": "情報発信課",
        "ref": "r02kekkaichiran.xlsx#事業一覧!171"
      }
    ]
  },
  {
    "fy": "R1",
    "fyLabel": "令和1年度",
    "sourceTitle": "令和1年度 甲府市行政評価（事務事業評価）結果一覧",
    "sourceUrl": "https://web.archive.org/web/20260712142843/https://www.city.kofu.yamanashi.jp/zaise/documents/r01kekkaichiran.xls",
    "originUrl": "https://www.city.kofu.yamanashi.jp/zaise/documents/r01kekkaichiran.xls",
    "sourceLocalUrl": "/sources/kofu-gyousei-hyouka-r1/r01kekkaichiran.xls",
    "items": [
      {
        "name": "放課後児童クラブ事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "子ども未来部",
        "ka": "子ども保育課",
        "ref": "r01kekkaichiran.xls#事業一覧!3"
      },
      {
        "name": "教育･保育施設等運営給付事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "子ども未来部",
        "ka": "子ども保育課",
        "ref": "r01kekkaichiran.xls#事業一覧!4"
      },
      {
        "name": "公立保育所事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "子ども未来部",
        "ka": "子ども保育課",
        "ref": "r01kekkaichiran.xls#事業一覧!5"
      },
      {
        "name": "幼稚園就園奨励事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "子ども未来部",
        "ka": "子ども保育課",
        "ref": "r01kekkaichiran.xls#事業一覧!6"
      },
      {
        "name": "子育て短期支援事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "子ども未来部",
        "ka": "子ども保育課",
        "ref": "r01kekkaichiran.xls#事業一覧!7"
      },
      {
        "name": "教育･保育施設等整備事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "子ども未来部",
        "ka": "子ども保育課",
        "ref": "r01kekkaichiran.xls#事業一覧!8"
      },
      {
        "name": "すこやか子育て医療費助成事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "子ども未来部",
        "ka": "子ども支援課",
        "ref": "r01kekkaichiran.xls#事業一覧!9"
      },
      {
        "name": "ひとり親家庭等医療費助成事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "子ども未来部",
        "ka": "子ども支援課",
        "ref": "r01kekkaichiran.xls#事業一覧!10"
      },
      {
        "name": "多子世帯等への利用者負担額（保育料）軽減事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "子ども未来部",
        "ka": "子ども保育課",
        "ref": "r01kekkaichiran.xls#事業一覧!11"
      },
      {
        "name": "母子生活支援施設等措置事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "子ども未来部",
        "ka": "子ども支援課",
        "ref": "r01kekkaichiran.xls#事業一覧!12"
      },
      {
        "name": "児童手当支給事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "子ども未来部",
        "ka": "子ども支援課",
        "ref": "r01kekkaichiran.xls#事業一覧!13"
      },
      {
        "name": "ひとり親等福祉事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "子ども未来部",
        "ka": "子ども支援課",
        "ref": "r01kekkaichiran.xls#事業一覧!14"
      },
      {
        "name": "養育医療等事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "子ども未来部",
        "ka": "母子保健課",
        "ref": "r01kekkaichiran.xls#事業一覧!15"
      },
      {
        "name": "子育て総合相談窓口運営事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "子ども未来部",
        "ka": "子ども支援課",
        "ref": "r01kekkaichiran.xls#事業一覧!18"
      },
      {
        "name": "母子保健事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "子ども未来部",
        "ka": "母子保健課",
        "ref": "r01kekkaichiran.xls#事業一覧!19"
      },
      {
        "name": "子ども・子育て支援事務",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "子ども未来部",
        "ka": "子ども保育課",
        "ref": "r01kekkaichiran.xls#事業一覧!20"
      },
      {
        "name": "子ども支援推進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "子ども未来部",
        "ka": "子ども支援課",
        "ref": "r01kekkaichiran.xls#事業一覧!21"
      },
      {
        "name": "放課後子供教室推進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "生涯学習課",
        "ref": "r01kekkaichiran.xls#事業一覧!22"
      },
      {
        "name": "子育て・お助け隊派遣事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "子ども未来部",
        "ka": "子ども支援課",
        "ref": "r01kekkaichiran.xls#事業一覧!23"
      },
      {
        "name": "児童館等運営事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "子ども未来部",
        "ka": "子ども保育課",
        "ref": "r01kekkaichiran.xls#事業一覧!24"
      },
      {
        "name": "ファミリー・サポート・センター事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "子ども未来部",
        "ka": "子ども支援課",
        "ref": "r01kekkaichiran.xls#事業一覧!25"
      },
      {
        "name": "幼児教育センター事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "子ども未来部",
        "ka": "子ども支援課",
        "ref": "r01kekkaichiran.xls#事業一覧!26"
      },
      {
        "name": "子ども運動遊び事業",
        "grade": "A",
        "prevGrade": null,
        "budgetName": null,
        "bu": "子ども未来部",
        "ka": "総務課",
        "ref": "r01kekkaichiran.xls#事業一覧!27"
      },
      {
        "name": "小学校外国語活動推進事業",
        "grade": "A",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "学校教育課",
        "ref": "r01kekkaichiran.xls#事業一覧!29"
      },
      {
        "name": "外国人講師による英語指導事業（中学校）",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "学校教育課",
        "ref": "r01kekkaichiran.xls#事業一覧!30"
      },
      {
        "name": "きめ細かな教育推進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "学校教育課",
        "ref": "r01kekkaichiran.xls#事業一覧!31"
      },
      {
        "name": "サポートティチャー事業(小学校)",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "学校教育課",
        "ref": "r01kekkaichiran.xls#事業一覧!32"
      },
      {
        "name": "サポートティチャー事業(中学校)",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "学校教育課",
        "ref": "r01kekkaichiran.xls#事業一覧!33"
      },
      {
        "name": "維持管理事務（小学校）",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "学事課",
        "ref": "r01kekkaichiran.xls#事業一覧!34"
      },
      {
        "name": "維持管理事務（中学校）",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "学事課",
        "ref": "r01kekkaichiran.xls#事業一覧!35"
      },
      {
        "name": "学校行事事務（小学校）",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "学事課",
        "ref": "r01kekkaichiran.xls#事業一覧!36"
      },
      {
        "name": "学校行事事務（中学校）",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "学事課",
        "ref": "r01kekkaichiran.xls#事業一覧!37"
      },
      {
        "name": "教育指導事業（小学校）",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "学校教育課",
        "ref": "r01kekkaichiran.xls#事業一覧!38"
      },
      {
        "name": "教育指導事業（中学校）",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "学校教育課",
        "ref": "r01kekkaichiran.xls#事業一覧!39"
      },
      {
        "name": "新しい時代を担う人づくり基金事業(甲府の教育推進事業）",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "学校教育課",
        "ref": "r01kekkaichiran.xls#事業一覧!40"
      },
      {
        "name": "学校危機管理体制整備事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "学校教育課",
        "ref": "r01kekkaichiran.xls#事業一覧!41"
      },
      {
        "name": "研修研究事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "学校教育課",
        "ref": "r01kekkaichiran.xls#事業一覧!42"
      },
      {
        "name": "教育指導研究センター事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "学校教育課",
        "ref": "r01kekkaichiran.xls#事業一覧!43"
      },
      {
        "name": "教育研修所事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "学校教育課",
        "ref": "r01kekkaichiran.xls#事業一覧!44"
      },
      {
        "name": "学校給食事業（小学校）",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "学事課",
        "ref": "r01kekkaichiran.xls#事業一覧!45"
      },
      {
        "name": "学校給食事業（中学校）",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "学事課",
        "ref": "r01kekkaichiran.xls#事業一覧!46"
      },
      {
        "name": "学校保健事業（小学校）",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "学事課",
        "ref": "r01kekkaichiran.xls#事業一覧!47"
      },
      {
        "name": "学校保健事業（中学校）",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "学事課",
        "ref": "r01kekkaichiran.xls#事業一覧!48"
      },
      {
        "name": "小学校校舎整備拡充事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "まちづくり部",
        "ka": "建築営繕課",
        "ref": "r01kekkaichiran.xls#事業一覧!51"
      },
      {
        "name": "中道北小学校移転事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "まちづくり部",
        "ka": "建築営繕課",
        "ref": "r01kekkaichiran.xls#事業一覧!52"
      },
      {
        "name": "教材・情報環境整備事業（小学校）",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "学事課",
        "ref": "r01kekkaichiran.xls#事業一覧!53"
      },
      {
        "name": "教材・情報環境整備事業（中学校）",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "学事課",
        "ref": "r01kekkaichiran.xls#事業一覧!54"
      },
      {
        "name": "学校営繕事業（小学校）",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "教育施設課",
        "ref": "r01kekkaichiran.xls#事業一覧!55"
      },
      {
        "name": "学校営繕事業（中学校）",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "教育施設課",
        "ref": "r01kekkaichiran.xls#事業一覧!56"
      },
      {
        "name": "教育振興事業（小学校）",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "学事課",
        "ref": "r01kekkaichiran.xls#事業一覧!57"
      },
      {
        "name": "教育振興事業（中学校）",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "学事課",
        "ref": "r01kekkaichiran.xls#事業一覧!58"
      },
      {
        "name": "教育振興助成事務（小学校）",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "学事課",
        "ref": "r01kekkaichiran.xls#事業一覧!59"
      },
      {
        "name": "教育振興助成事務（中学校）",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "学事課",
        "ref": "r01kekkaichiran.xls#事業一覧!60"
      },
      {
        "name": "入学準備金融資事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "学事課",
        "ref": "r01kekkaichiran.xls#事業一覧!61"
      },
      {
        "name": "外国人講師による英語指導事業（高校）",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "学校教育課",
        "ref": "r01kekkaichiran.xls#事業一覧!62"
      },
      {
        "name": "商業高等学校事務",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "商業事務局",
        "ref": "r01kekkaichiran.xls#事業一覧!63"
      },
      {
        "name": "商業高等学校管理事務",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "商業事務局",
        "ref": "r01kekkaichiran.xls#事業一覧!64"
      },
      {
        "name": "商業高等学校保健厚生事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "商業事務局",
        "ref": "r01kekkaichiran.xls#事業一覧!65"
      },
      {
        "name": "商業高等学校振興事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "商業事務局",
        "ref": "r01kekkaichiran.xls#事業一覧!66"
      },
      {
        "name": "商科専門学校事務",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "商科事務局",
        "ref": "r01kekkaichiran.xls#事業一覧!67"
      },
      {
        "name": "商科専門学校振興事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "商科事務局",
        "ref": "r01kekkaichiran.xls#事業一覧!69"
      },
      {
        "name": "青少年健全育成事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "子ども未来部",
        "ka": "子ども支援課",
        "ref": "r01kekkaichiran.xls#事業一覧!70"
      },
      {
        "name": "チビッコ広場整備事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "子ども未来部",
        "ka": "子ども支援課",
        "ref": "r01kekkaichiran.xls#事業一覧!71"
      },
      {
        "name": "成人式事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "生涯学習課",
        "ref": "r01kekkaichiran.xls#事業一覧!72"
      },
      {
        "name": "生涯学習振興事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "生涯学習課",
        "ref": "r01kekkaichiran.xls#事業一覧!73"
      },
      {
        "name": "図書館管理運営事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "図書館",
        "ref": "r01kekkaichiran.xls#事業一覧!74"
      },
      {
        "name": "公民館管理運営事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "生涯学習課",
        "ref": "r01kekkaichiran.xls#事業一覧!75"
      },
      {
        "name": "総合市民会館管理運営事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "生涯学習課",
        "ref": "r01kekkaichiran.xls#事業一覧!76"
      },
      {
        "name": "スポーツ振興事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "スポーツ課",
        "ref": "r01kekkaichiran.xls#事業一覧!78"
      },
      {
        "name": "東京オリンピック・パラリンピック事前合宿等推進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "企画部",
        "ka": "国際交流課",
        "ref": "r01kekkaichiran.xls#事業一覧!79"
      },
      {
        "name": "各種スポーツ施設管理事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "スポーツ課",
        "ref": "r01kekkaichiran.xls#事業一覧!81"
      },
      {
        "name": "学校開放施設管理事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "スポーツ課",
        "ref": "r01kekkaichiran.xls#事業一覧!83"
      },
      {
        "name": "文化芸術推進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "生涯学習課",
        "ref": "r01kekkaichiran.xls#事業一覧!84"
      },
      {
        "name": "藤村記念館事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "歴史文化財課",
        "ref": "r01kekkaichiran.xls#事業一覧!85"
      },
      {
        "name": "開府500年・甲府の歴史を学ぶ事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "歴史文化財課",
        "ref": "r01kekkaichiran.xls#事業一覧!86"
      },
      {
        "name": "史跡武田氏館跡整備事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "歴史文化財課",
        "ref": "r01kekkaichiran.xls#事業一覧!88"
      },
      {
        "name": "文化財保護事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "歴史文化財課",
        "ref": "r01kekkaichiran.xls#事業一覧!90"
      },
      {
        "name": "出土品等管理事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "歴史文化財課",
        "ref": "r01kekkaichiran.xls#事業一覧!91"
      },
      {
        "name": "人権推進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市民部",
        "ka": "人権男女参画課",
        "ref": "r01kekkaichiran.xls#事業一覧!92"
      },
      {
        "name": "平和都市宣言事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市民部",
        "ka": "総務課",
        "ref": "r01kekkaichiran.xls#事業一覧!93"
      },
      {
        "name": "男女共同参画推進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市民部",
        "ka": "人権男女参画課",
        "ref": "r01kekkaichiran.xls#事業一覧!95"
      },
      {
        "name": "国際交流事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市長直轄組織",
        "ka": "秘書課",
        "ref": "r01kekkaichiran.xls#事業一覧!96"
      },
      {
        "name": "新しい時代を担う人づくり基金事業(姉妹・友好都市教育交流事業)",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "学校教育課",
        "ref": "r01kekkaichiran.xls#事業一覧!98"
      },
      {
        "name": "多文化共生推進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市民部",
        "ka": "市民課",
        "ref": "r01kekkaichiran.xls#事業一覧!99"
      },
      {
        "name": "商工業推進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "産業部",
        "ka": "商工課",
        "ref": "r01kekkaichiran.xls#事業一覧!100"
      },
      {
        "name": "融資対策事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "産業部",
        "ka": "商工課",
        "ref": "r01kekkaichiran.xls#事業一覧!102"
      },
      {
        "name": "産業立地等推進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "まちづくり部",
        "ka": "産業立地課",
        "ref": "r01kekkaichiran.xls#事業一覧!103"
      },
      {
        "name": "農業経営基盤強化促進対策事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "産業部",
        "ka": "就農支援課",
        "ref": "r01kekkaichiran.xls#事業一覧!105"
      },
      {
        "name": "指導普及事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "産業部",
        "ka": "就農支援課",
        "ref": "r01kekkaichiran.xls#事業一覧!106"
      },
      {
        "name": "産地保全強化対策事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "産業部",
        "ka": "農政課",
        "ref": "r01kekkaichiran.xls#事業一覧!107"
      },
      {
        "name": "農業委員会事務",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "農業委員会",
        "ka": null,
        "ref": "r01kekkaichiran.xls#事業一覧!111"
      },
      {
        "name": "農業施設等整備事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "産業部",
        "ka": "農政課",
        "ref": "r01kekkaichiran.xls#事業一覧!112"
      },
      {
        "name": "有害鳥獣対策事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "産業部",
        "ka": "就農支援課",
        "ref": "r01kekkaichiran.xls#事業一覧!113"
      },
      {
        "name": "農業施設等管理事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "産業部",
        "ka": "農政課",
        "ref": "r01kekkaichiran.xls#事業一覧!114"
      },
      {
        "name": "森づくり推進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "産業部",
        "ka": "林政課",
        "ref": "r01kekkaichiran.xls#事業一覧!116"
      },
      {
        "name": "小規模治山事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "産業部",
        "ka": "林政課",
        "ref": "r01kekkaichiran.xls#事業一覧!117"
      },
      {
        "name": "既設林道維持管理事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "産業部",
        "ka": "林政課",
        "ref": "r01kekkaichiran.xls#事業一覧!118"
      },
      {
        "name": "地域振興基金事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "産業部",
        "ka": "農政課",
        "ref": "r01kekkaichiran.xls#事業一覧!120"
      },
      {
        "name": "農業センター管理事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "産業部",
        "ka": "就農支援課",
        "ref": "r01kekkaichiran.xls#事業一覧!121"
      },
      {
        "name": "森林林業普及啓発事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "産業部",
        "ka": "林政課",
        "ref": "r01kekkaichiran.xls#事業一覧!122"
      },
      {
        "name": "雇用促進対策事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "産業部",
        "ka": "雇用創生課",
        "ref": "r01kekkaichiran.xls#事業一覧!125"
      },
      {
        "name": "労働福祉事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "産業部",
        "ka": "雇用創生課",
        "ref": "r01kekkaichiran.xls#事業一覧!126"
      },
      {
        "name": "勤労者福祉センター管理事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "産業部",
        "ka": "雇用創生課",
        "ref": "r01kekkaichiran.xls#事業一覧!127"
      },
      {
        "name": "地方卸売市場運営事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "産業部",
        "ka": "経営管理課",
        "ref": "r01kekkaichiran.xls#事業一覧!128"
      },
      {
        "name": "地方卸売市場施設整備事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "産業部",
        "ka": "経営管理課",
        "ref": "r01kekkaichiran.xls#事業一覧!129"
      },
      {
        "name": "まつり推進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "産業部",
        "ka": "観光課",
        "ref": "r01kekkaichiran.xls#事業一覧!130"
      },
      {
        "name": "観光開発事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "産業部",
        "ka": "観光課",
        "ref": "r01kekkaichiran.xls#事業一覧!131"
      },
      {
        "name": "観光施設整備事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "産業部",
        "ka": "観光課",
        "ref": "r01kekkaichiran.xls#事業一覧!132"
      },
      {
        "name": "観光振興事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "産業部",
        "ka": "観光課",
        "ref": "r01kekkaichiran.xls#事業一覧!133"
      },
      {
        "name": "中心市街地定住促進事業",
        "grade": "F",
        "prevGrade": null,
        "budgetName": null,
        "bu": "まちづくり部",
        "ka": "都市計画課",
        "ref": "r01kekkaichiran.xls#事業一覧!135"
      },
      {
        "name": "甲府駅周辺拠点形成事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "まちづくり部",
        "ka": "区画整理課",
        "ref": "r01kekkaichiran.xls#事業一覧!136"
      },
      {
        "name": "甲府城周辺地域活性化計画整備事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "まちづくり部",
        "ka": "都市計画課",
        "ref": "r01kekkaichiran.xls#事業一覧!137"
      },
      {
        "name": "防災対策整備事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市長直轄組織",
        "ka": "防災企画課防災指導課",
        "ref": "r01kekkaichiran.xls#事業一覧!140"
      },
      {
        "name": "防災行政用無線管理事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市長直轄組織",
        "ka": "防災企画課",
        "ref": "r01kekkaichiran.xls#事業一覧!142"
      },
      {
        "name": "災害救助事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "生活福祉課",
        "ref": "r01kekkaichiran.xls#事業一覧!143"
      },
      {
        "name": "防災事務",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市長直轄組織",
        "ka": "防災企画課",
        "ref": "r01kekkaichiran.xls#事業一覧!144"
      },
      {
        "name": "一般河川改修事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "まちづくり部",
        "ka": "道路河川課",
        "ref": "r01kekkaichiran.xls#事業一覧!146"
      },
      {
        "name": "水防事務",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "まちづくり部",
        "ka": "道路河川課",
        "ref": "r01kekkaichiran.xls#事業一覧!147"
      },
      {
        "name": "危機管理対策事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市長直轄組織",
        "ka": "危機管理課",
        "ref": "r01kekkaichiran.xls#事業一覧!148"
      },
      {
        "name": "消火栓設置事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "消防本部",
        "ka": "警防課",
        "ref": "r01kekkaichiran.xls#事業一覧!149"
      },
      {
        "name": "消防施設等整備事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "消防本部",
        "ka": "警防課",
        "ref": "r01kekkaichiran.xls#事業一覧!150"
      },
      {
        "name": "非常備消防事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "消防本部",
        "ka": "警防課人事課",
        "ref": "r01kekkaichiran.xls#事業一覧!151"
      },
      {
        "name": "常備消防事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "消防本部",
        "ka": "警防課",
        "ref": "r01kekkaichiran.xls#事業一覧!152"
      },
      {
        "name": "普通救命事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市長直轄組織",
        "ka": "危機管理課",
        "ref": "r01kekkaichiran.xls#事業一覧!153"
      },
      {
        "name": "交通安全対策事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市民部",
        "ka": "消費生活課",
        "ref": "r01kekkaichiran.xls#事業一覧!154"
      },
      {
        "name": "社会を明るくする運動事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市民部",
        "ka": "総務課",
        "ref": "r01kekkaichiran.xls#事業一覧!155"
      },
      {
        "name": "安全安心街づくり事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市長直轄組織",
        "ka": "危機管理課",
        "ref": "r01kekkaichiran.xls#事業一覧!158"
      },
      {
        "name": "街路灯助成事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市民部",
        "ka": "協働推進課",
        "ref": "r01kekkaichiran.xls#事業一覧!159"
      },
      {
        "name": "学校安全安心推進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "学事課学校教育課",
        "ref": "r01kekkaichiran.xls#事業一覧!160"
      },
      {
        "name": "交通安全施設整備事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "まちづくり部",
        "ka": "道路河川課",
        "ref": "r01kekkaichiran.xls#事業一覧!161"
      },
      {
        "name": "自転車対策事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市民部",
        "ka": "消費生活課",
        "ref": "r01kekkaichiran.xls#事業一覧!162"
      },
      {
        "name": "通学路交通安全対策事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "まちづくり部",
        "ka": "道路河川課",
        "ref": "r01kekkaichiran.xls#事業一覧!163"
      },
      {
        "name": "消費者啓発育成事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市民部",
        "ka": "消費生活課",
        "ref": "r01kekkaichiran.xls#事業一覧!165"
      },
      {
        "name": "計量検査事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市民部",
        "ka": "消費生活課",
        "ref": "r01kekkaichiran.xls#事業一覧!166"
      },
      {
        "name": "社会福祉総務事務",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "総務課",
        "ref": "r01kekkaichiran.xls#事業一覧!167"
      },
      {
        "name": "福祉関係計画推進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "総務課",
        "ref": "r01kekkaichiran.xls#事業一覧!168"
      },
      {
        "name": "民生委員関係事務",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "総務課",
        "ref": "r01kekkaichiran.xls#事業一覧!170"
      },
      {
        "name": "老人保護措置事務",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "高齢者福祉課",
        "ref": "r01kekkaichiran.xls#事業一覧!175"
      },
      {
        "name": "在宅高齢者対策事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "高齢者福祉課",
        "ref": "r01kekkaichiran.xls#事業一覧!179"
      },
      {
        "name": "地域支援事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "健康政策課健康増進課介護保険課介護予防課",
        "ref": "r01kekkaichiran.xls#事業一覧!181"
      },
      {
        "name": "成年後見制度普及促進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "高齢者福祉課",
        "ref": "r01kekkaichiran.xls#事業一覧!182"
      },
      {
        "name": "介護保険対策事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "介護保険課",
        "ref": "r01kekkaichiran.xls#事業一覧!183"
      },
      {
        "name": "自立支援サービス事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "障がい福祉課",
        "ref": "r01kekkaichiran.xls#事業一覧!186"
      },
      {
        "name": "特別障害者手当等支給事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "障がい福祉課",
        "ref": "r01kekkaichiran.xls#事業一覧!187"
      },
      {
        "name": "自立支援医療事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "障がい福祉課",
        "ref": "r01kekkaichiran.xls#事業一覧!189"
      },
      {
        "name": "自立支援補装具事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "障がい福祉課",
        "ref": "r01kekkaichiran.xls#事業一覧!190"
      },
      {
        "name": "自立支援給付審査会事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "障がい福祉課",
        "ref": "r01kekkaichiran.xls#事業一覧!191"
      },
      {
        "name": "障害児通所支援事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "障がい福祉課",
        "ref": "r01kekkaichiran.xls#事業一覧!192"
      },
      {
        "name": "地域生活支援事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "障がい福祉課",
        "ref": "r01kekkaichiran.xls#事業一覧!195"
      },
      {
        "name": "障害者センター事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "障がい福祉課",
        "ref": "r01kekkaichiran.xls#事業一覧!196"
      },
      {
        "name": "身体障害者福祉事務",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "障がい福祉課",
        "ref": "r01kekkaichiran.xls#事業一覧!197"
      },
      {
        "name": "生活保護扶助事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "生活福祉課",
        "ref": "r01kekkaichiran.xls#事業一覧!198"
      },
      {
        "name": "生活困窮者自立支援事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "生活福祉課",
        "ref": "r01kekkaichiran.xls#事業一覧!199"
      },
      {
        "name": "行旅病人死亡人取扱事務",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "生活福祉課",
        "ref": "r01kekkaichiran.xls#事業一覧!200"
      },
      {
        "name": "生活保護総務事務",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "生活福祉課",
        "ref": "r01kekkaichiran.xls#事業一覧!201"
      },
      {
        "name": "生活保護適正実施推進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "生活福祉課",
        "ref": "r01kekkaichiran.xls#事業一覧!202"
      },
      {
        "name": "中国残留邦人生活支援事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "生活福祉課",
        "ref": "r01kekkaichiran.xls#事業一覧!203"
      },
      {
        "name": "生活保護受給者就労支援事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "生活福祉課",
        "ref": "r01kekkaichiran.xls#事業一覧!204"
      },
      {
        "name": "国民健康保険事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市民部",
        "ka": "国民健康保険課",
        "ref": "r01kekkaichiran.xls#事業一覧!206"
      },
      {
        "name": "後期高齢者医療事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "高齢者福祉課",
        "ref": "r01kekkaichiran.xls#事業一覧!207"
      },
      {
        "name": "介護保険運営事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "介護保険課",
        "ref": "r01kekkaichiran.xls#事業一覧!208"
      },
      {
        "name": "国民年金事務",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市民部",
        "ka": "市民課",
        "ref": "r01kekkaichiran.xls#事業一覧!209"
      },
      {
        "name": "健康づくり推進事業",
        "grade": "A",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "健康政策課健康増進課",
        "ref": "r01kekkaichiran.xls#事業一覧!210"
      },
      {
        "name": "健康づくり推進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "子ども未来部",
        "ka": "母子保健課",
        "ref": "r01kekkaichiran.xls#事業一覧!211"
      },
      {
        "name": "健康ポイント事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "健康政策課",
        "ref": "r01kekkaichiran.xls#事業一覧!212"
      },
      {
        "name": "保健施設管理事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "健康政策課",
        "ref": "r01kekkaichiran.xls#事業一覧!213"
      },
      {
        "name": "市民いこいの里管理事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "産業部",
        "ka": "雇用創生課",
        "ref": "r01kekkaichiran.xls#事業一覧!214"
      },
      {
        "name": "健康診査事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "健康増進課",
        "ref": "r01kekkaichiran.xls#事業一覧!216"
      },
      {
        "name": "各種予防事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "医務感染症課",
        "ref": "r01kekkaichiran.xls#事業一覧!217"
      },
      {
        "name": "国民健康保険事業（直営診療）",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市民部",
        "ka": "国民健康保険課",
        "ref": "r01kekkaichiran.xls#事業一覧!223"
      },
      {
        "name": "救急医療体制整備事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "医務感染症課",
        "ref": "r01kekkaichiran.xls#事業一覧!225"
      },
      {
        "name": "救急医療体制整備事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "子ども未来部",
        "ka": "母子保健課",
        "ref": "r01kekkaichiran.xls#事業一覧!226"
      },
      {
        "name": "地域医療センター管理事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "医務感染症課",
        "ref": "r01kekkaichiran.xls#事業一覧!227"
      },
      {
        "name": "地球温暖化対策事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "環境部",
        "ka": "環境保全課",
        "ref": "r01kekkaichiran.xls#事業一覧!229"
      },
      {
        "name": "都市美化事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "環境部",
        "ka": "収集衛生課",
        "ref": "r01kekkaichiran.xls#事業一覧!231"
      },
      {
        "name": "環境対策事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "環境部",
        "ka": "環境保全課",
        "ref": "r01kekkaichiran.xls#事業一覧!232"
      },
      {
        "name": "森林保護事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "産業部",
        "ka": "林政課",
        "ref": "r01kekkaichiran.xls#事業一覧!233"
      },
      {
        "name": "マウントピア黒平管理事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "産業部",
        "ka": "林政課",
        "ref": "r01kekkaichiran.xls#事業一覧!234"
      },
      {
        "name": "右左口の里維持管理事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "産業部",
        "ka": "農政課",
        "ref": "r01kekkaichiran.xls#事業一覧!235"
      },
      {
        "name": "動物園整備事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "まちづくり部",
        "ka": "公園緑地課",
        "ref": "r01kekkaichiran.xls#事業一覧!237"
      },
      {
        "name": "都市公園管理事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "まちづくり部",
        "ka": "公園緑地課",
        "ref": "r01kekkaichiran.xls#事業一覧!238"
      },
      {
        "name": "圃場管理事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "まちづくり部",
        "ka": "公園緑地課",
        "ref": "r01kekkaichiran.xls#事業一覧!240"
      },
      {
        "name": "環境リサイクルフェア事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "環境部",
        "ka": "環境保全課",
        "ref": "r01kekkaichiran.xls#事業一覧!241"
      },
      {
        "name": "明るくきれいなまちづくり基金事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "環境部",
        "ka": "減量課",
        "ref": "r01kekkaichiran.xls#事業一覧!242"
      },
      {
        "name": "学校給食事業（小学校）（食品ロス対策）",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "学事課",
        "ref": "r01kekkaichiran.xls#事業一覧!244"
      },
      {
        "name": "塵芥収集事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "環境部",
        "ka": "収集衛生課",
        "ref": "r01kekkaichiran.xls#事業一覧!245"
      },
      {
        "name": "最終処分場事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "環境部",
        "ka": "廃棄物対策課",
        "ref": "r01kekkaichiran.xls#事業一覧!246"
      },
      {
        "name": "附属焼却工場事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "環境部",
        "ka": "廃棄物対策課",
        "ref": "r01kekkaichiran.xls#事業一覧!247"
      },
      {
        "name": "一般廃棄物処理事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "環境部",
        "ka": "廃棄物対策課",
        "ref": "r01kekkaichiran.xls#事業一覧!248"
      },
      {
        "name": "リサイクルプラザ管理運営事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "環境部",
        "ka": "減量課",
        "ref": "r01kekkaichiran.xls#事業一覧!249"
      },
      {
        "name": "環境総務事務",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "環境部",
        "ka": "総務課",
        "ref": "r01kekkaichiran.xls#事業一覧!250"
      },
      {
        "name": "環境センター地域環境整備事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "環境部",
        "ka": "総務課",
        "ref": "r01kekkaichiran.xls#事業一覧!252"
      },
      {
        "name": "景観まちづくり推進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "まちづくり部",
        "ka": "都市計画課",
        "ref": "r01kekkaichiran.xls#事業一覧!253"
      },
      {
        "name": "屋外広告物指導事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "まちづくり部",
        "ka": "都市計画課",
        "ref": "r01kekkaichiran.xls#事業一覧!254"
      },
      {
        "name": "公営住宅整備事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "まちづくり部",
        "ka": "住宅課",
        "ref": "r01kekkaichiran.xls#事業一覧!255"
      },
      {
        "name": "水源保全活動推進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "上下水道局",
        "ka": "水保全課",
        "ref": "r01kekkaichiran.xls#事業一覧!261"
      },
      {
        "name": "水源域の水質調査事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "上下水道局",
        "ka": "浄水課",
        "ref": "r01kekkaichiran.xls#事業一覧!262"
      },
      {
        "name": "水質検査事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "上下水道局",
        "ka": "浄水課",
        "ref": "r01kekkaichiran.xls#事業一覧!263"
      },
      {
        "name": "貯水槽水道管理指導事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "上下水道局",
        "ka": "給排水課",
        "ref": "r01kekkaichiran.xls#事業一覧!264"
      },
      {
        "name": "水道管路耐震化事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "上下水道局",
        "ka": "水道課",
        "ref": "r01kekkaichiran.xls#事業一覧!267"
      },
      {
        "name": "浄水施設等更新事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "上下水道局",
        "ka": "浄水課",
        "ref": "r01kekkaichiran.xls#事業一覧!269"
      },
      {
        "name": "水道管移設整備事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "健康増進課",
        "ref": "r01kekkaichiran.xls#事業一覧!270"
      },
      {
        "name": "汚水管きょ整備事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "上下水道局",
        "ka": "下水道課",
        "ref": "r01kekkaichiran.xls#事業一覧!271"
      },
      {
        "name": "下水道接続促進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "上下水道局",
        "ka": "給排水課",
        "ref": "r01kekkaichiran.xls#事業一覧!272"
      },
      {
        "name": "下水道地震対策事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "上下水道局",
        "ka": "下水道課浄化センター",
        "ref": "r01kekkaichiran.xls#事業一覧!273"
      },
      {
        "name": "管路施設の調査及び改築事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "上下水道局",
        "ka": "下水道課",
        "ref": "r01kekkaichiran.xls#事業一覧!274"
      },
      {
        "name": "処理場等施設の調査及び改築事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "上下水道局",
        "ka": "浄化センター",
        "ref": "r01kekkaichiran.xls#事業一覧!275"
      },
      {
        "name": "生活排水対策事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "環境部",
        "ka": "環境保全課",
        "ref": "r01kekkaichiran.xls#事業一覧!276"
      },
      {
        "name": "浄化槽事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "環境部",
        "ka": "環境保全課",
        "ref": "r01kekkaichiran.xls#事業一覧!277"
      },
      {
        "name": "農業集落排水事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "産業部",
        "ka": "農政課",
        "ref": "r01kekkaichiran.xls#事業一覧!278"
      },
      {
        "name": "し尿処理事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "環境部",
        "ka": "廃棄物対策課",
        "ref": "r01kekkaichiran.xls#事業一覧!279"
      },
      {
        "name": "斎場管理事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "医務感染症課",
        "ref": "r01kekkaichiran.xls#事業一覧!280"
      },
      {
        "name": "つつじが崎霊園管理事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "まちづくり部",
        "ka": "公園緑地課",
        "ref": "r01kekkaichiran.xls#事業一覧!281"
      },
      {
        "name": "動物愛護事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "生活衛生薬務課",
        "ref": "r01kekkaichiran.xls#事業一覧!282"
      },
      {
        "name": "環境衛生事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "環境部",
        "ka": "収集衛生課",
        "ref": "r01kekkaichiran.xls#事業一覧!283"
      },
      {
        "name": "公共交通体系整備推進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "まちづくり部",
        "ka": "交通政策課",
        "ref": "r01kekkaichiran.xls#事業一覧!285"
      },
      {
        "name": "公共交通体系整備推進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "まちづくり部",
        "ka": "リニア政策課",
        "ref": "r01kekkaichiran.xls#事業一覧!286"
      },
      {
        "name": "バス利用促進対策事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "まちづくり部",
        "ka": "交通政策課",
        "ref": "r01kekkaichiran.xls#事業一覧!287"
      },
      {
        "name": "在来鉄道の利便性向上事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "まちづくり部",
        "ka": "交通政策課",
        "ref": "r01kekkaichiran.xls#事業一覧!288"
      },
      {
        "name": "都市基本計画推進事業（都市計画道路の整備）",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "まちづくり部",
        "ka": "都市計画課",
        "ref": "r01kekkaichiran.xls#事業一覧!289"
      },
      {
        "name": "和戸町竜王線整備事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "まちづくり部",
        "ka": "都市整備課",
        "ref": "r01kekkaichiran.xls#事業一覧!290"
      },
      {
        "name": "市道新設改良事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "まちづくり部",
        "ka": "都市整備課",
        "ref": "r01kekkaichiran.xls#事業一覧!291"
      },
      {
        "name": "高速交通体系整備事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "まちづくり部",
        "ka": "都市計画課",
        "ref": "r01kekkaichiran.xls#事業一覧!292"
      },
      {
        "name": "市単独街路事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "まちづくり部",
        "ka": "都市整備課",
        "ref": "r01kekkaichiran.xls#事業一覧!293"
      },
      {
        "name": "橋りょう長寿命化修繕事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "まちづくり部",
        "ka": "道路河川課",
        "ref": "r01kekkaichiran.xls#事業一覧!294"
      },
      {
        "name": "道路維持管理事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "まちづくり部",
        "ka": "道路河川課",
        "ref": "r01kekkaichiran.xls#事業一覧!295"
      },
      {
        "name": "道路河川維持事務",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "まちづくり部",
        "ka": "道路河川課",
        "ref": "r01kekkaichiran.xls#事業一覧!296"
      },
      {
        "name": "道路用地管理事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "まちづくり部",
        "ka": "道路河川課",
        "ref": "r01kekkaichiran.xls#事業一覧!297"
      },
      {
        "name": "市道側溝整備事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "まちづくり部",
        "ka": "道路河川課",
        "ref": "r01kekkaichiran.xls#事業一覧!298"
      },
      {
        "name": "市道舗装（補修）事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "まちづくり部",
        "ka": "道路河川課",
        "ref": "r01kekkaichiran.xls#事業一覧!299"
      },
      {
        "name": "歩道整備事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "まちづくり部",
        "ka": "道路河川課",
        "ref": "r01kekkaichiran.xls#事業一覧!300"
      },
      {
        "name": "落石防止柵設置事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "まちづくり部",
        "ka": "道路河川課",
        "ref": "r01kekkaichiran.xls#事業一覧!301"
      },
      {
        "name": "濁川西地区整備事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "まちづくり部",
        "ka": "都市整備課",
        "ref": "r01kekkaichiran.xls#事業一覧!303"
      },
      {
        "name": "都市計画事務",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "まちづくり部",
        "ka": "都市計画課",
        "ref": "r01kekkaichiran.xls#事業一覧!304"
      },
      {
        "name": "土地開発指導事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "まちづくり部",
        "ka": "都市計画課",
        "ref": "r01kekkaichiran.xls#事業一覧!305"
      },
      {
        "name": "建築指導事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "まちづくり部",
        "ka": "建築指導課",
        "ref": "r01kekkaichiran.xls#事業一覧!306"
      },
      {
        "name": "都市基本計画推進事業（立地適正化計画の策定）",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "まちづくり部",
        "ka": "都市計画課",
        "ref": "r01kekkaichiran.xls#事業一覧!307"
      },
      {
        "name": "まちづくり計画推進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市民部",
        "ka": "協働推進課",
        "ref": "r01kekkaichiran.xls#事業一覧!309"
      },
      {
        "name": "協働づくり推進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市民部",
        "ka": "協働推進課",
        "ref": "r01kekkaichiran.xls#事業一覧!310"
      },
      {
        "name": "地域集会施設整備助成事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市民部",
        "ka": "協働推進課",
        "ref": "r01kekkaichiran.xls#事業一覧!311"
      },
      {
        "name": "広報推進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市長直轄組織",
        "ka": "ｼﾃｨﾌﾟﾛﾓｰｼｮﾝ課",
        "ref": "r01kekkaichiran.xls#事業一覧!315"
      },
      {
        "name": "広聴活動事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市民部",
        "ka": "協働推進課",
        "ref": "r01kekkaichiran.xls#事業一覧!316"
      },
      {
        "name": "広域行政推進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "企画部",
        "ka": "企画課",
        "ref": "r01kekkaichiran.xls#事業一覧!317"
      },
      {
        "name": "こうふ開府500年記念事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "企画部",
        "ka": "開府企画課開府事業課",
        "ref": "r01kekkaichiran.xls#事業一覧!319"
      },
      {
        "name": "総務事務",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "総務部",
        "ka": "総務課",
        "ref": "r01kekkaichiran.xls#事業一覧!321"
      },
      {
        "name": "庁舎管理事務",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "総務部",
        "ka": "管財課",
        "ref": "r01kekkaichiran.xls#事業一覧!322"
      },
      {
        "name": "こうふDO計画推進事業（情報システム事業）",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "総務部",
        "ka": "情報政策課",
        "ref": "r01kekkaichiran.xls#事業一覧!323"
      },
      {
        "name": "企画事務",
        "grade": "A",
        "prevGrade": null,
        "budgetName": null,
        "bu": "企画部",
        "ka": "総務課",
        "ref": "r01kekkaichiran.xls#事業一覧!324"
      },
      {
        "name": "新事業形成事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "企画部",
        "ka": "企画課",
        "ref": "r01kekkaichiran.xls#事業一覧!325"
      },
      {
        "name": "窓口センター事務",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市民部",
        "ka": "総務課",
        "ref": "r01kekkaichiran.xls#事業一覧!326"
      },
      {
        "name": "中道支所事務",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市民部",
        "ka": "中道支所",
        "ref": "r01kekkaichiran.xls#事業一覧!327"
      },
      {
        "name": "上九一色出張所事務",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市民部",
        "ka": "上九一色出張所",
        "ref": "r01kekkaichiran.xls#事業一覧!328"
      },
      {
        "name": "戸籍住民基本台帳事務",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市民部",
        "ka": "市民課",
        "ref": "r01kekkaichiran.xls#事業一覧!329"
      },
      {
        "name": "個人番号制度管理事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市民部",
        "ka": "市民課",
        "ref": "r01kekkaichiran.xls#事業一覧!330"
      },
      {
        "name": "職員研修事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "総務部",
        "ka": "職員課",
        "ref": "r01kekkaichiran.xls#事業一覧!334"
      },
      {
        "name": "職員福利厚生及び健康管理事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "総務部",
        "ka": "職員課",
        "ref": "r01kekkaichiran.xls#事業一覧!335"
      },
      {
        "name": "公共施設等マネジメント推進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "総務部",
        "ka": "財産活用課",
        "ref": "r01kekkaichiran.xls#事業一覧!336"
      },
      {
        "name": "計画調整事務",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "企画部",
        "ka": "財政課",
        "ref": "r01kekkaichiran.xls#事業一覧!338"
      },
      {
        "name": "市民税賦課事務",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市民部",
        "ka": "市民税課",
        "ref": "r01kekkaichiran.xls#事業一覧!339"
      },
      {
        "name": "市民税等収納事務",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市民部",
        "ka": "収納課",
        "ref": "r01kekkaichiran.xls#事業一覧!340"
      },
      {
        "name": "市民税等滞納整理事務",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市民部",
        "ka": "滞納整理課",
        "ref": "r01kekkaichiran.xls#事業一覧!341"
      },
      {
        "name": "固定資産税賦課事務",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市民部",
        "ka": "資産税課",
        "ref": "r01kekkaichiran.xls#事業一覧!342"
      },
      {
        "name": "外部評価の実施事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "企画部",
        "ka": "行政経営課",
        "ref": "r01kekkaichiran.xls#事業一覧!343"
      },
      {
        "name": "シティプロモーション事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市長直轄組織",
        "ka": "ｼﾃｨﾌﾟﾛﾓｰｼｮﾝ課",
        "ref": "r01kekkaichiran.xls#事業一覧!345"
      }
    ]
  },
  {
    "fy": "H30",
    "fyLabel": "平成30年度",
    "sourceTitle": "平成30年度 甲府市行政評価（事務事業評価）結果一覧",
    "sourceUrl": "https://web.archive.org/web/20260712141434/https://www.city.kofu.yamanashi.jp/zaise/documents/30kekkaitiran.xls",
    "originUrl": "https://www.city.kofu.yamanashi.jp/zaise/documents/30kekkaitiran.xls",
    "sourceLocalUrl": "/sources/kofu-gyousei-hyouka-h30/30kekkaitiran.xls",
    "items": [
      {
        "name": "放課後児童クラブ事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "子ども未来部",
        "ka": "子ども保育課",
        "ref": "30kekkaitiran.xls#事業一覧!4"
      },
      {
        "name": "教育･保育施設等運営給付事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "子ども未来部",
        "ka": "子ども保育課",
        "ref": "30kekkaitiran.xls#事業一覧!5"
      },
      {
        "name": "公立保育所事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "子ども未来部",
        "ka": "子ども保育課",
        "ref": "30kekkaitiran.xls#事業一覧!6"
      },
      {
        "name": "幼稚園就園奨励事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "子ども未来部",
        "ka": "子ども保育課",
        "ref": "30kekkaitiran.xls#事業一覧!7"
      },
      {
        "name": "子育て短期支援事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "子ども未来部",
        "ka": "子ども保育課",
        "ref": "30kekkaitiran.xls#事業一覧!8"
      },
      {
        "name": "すこやか子育て医療費助成事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "子ども未来部",
        "ka": "子ども支援課",
        "ref": "30kekkaitiran.xls#事業一覧!9"
      },
      {
        "name": "ひとり親家庭等医療費助成事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "子ども未来部",
        "ka": "子ども支援課",
        "ref": "30kekkaitiran.xls#事業一覧!10"
      },
      {
        "name": "多子世帯等への利用者負担額（保育料）軽減事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "子ども未来部",
        "ka": "子ども支援課",
        "ref": "30kekkaitiran.xls#事業一覧!11"
      },
      {
        "name": "母子生活支援施設等措置事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "子ども未来部",
        "ka": "子ども支援課",
        "ref": "30kekkaitiran.xls#事業一覧!12"
      },
      {
        "name": "児童手当支給事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "子ども未来部",
        "ka": "子ども支援課",
        "ref": "30kekkaitiran.xls#事業一覧!13"
      },
      {
        "name": "ひとり親等福祉事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "子ども未来部",
        "ka": "子ども支援課",
        "ref": "30kekkaitiran.xls#事業一覧!14"
      },
      {
        "name": "養育医療事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "子ども未来部",
        "ka": "母子保健課",
        "ref": "30kekkaitiran.xls#事業一覧!15"
      },
      {
        "name": "子育て総合相談窓口運営事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "子ども未来部",
        "ka": "子ども支援課",
        "ref": "30kekkaitiran.xls#事業一覧!16"
      },
      {
        "name": "子ども・子育て支援事務",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "子ども未来部",
        "ka": "子ども支援課",
        "ref": "30kekkaitiran.xls#事業一覧!18"
      },
      {
        "name": "放課後子供教室推進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "生涯学習課",
        "ref": "30kekkaitiran.xls#事業一覧!20"
      },
      {
        "name": "子育て・お助け隊派遣事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "子ども未来部",
        "ka": "子ども支援課",
        "ref": "30kekkaitiran.xls#事業一覧!21"
      },
      {
        "name": "幼児教育センター事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "子ども未来部",
        "ka": "子ども支援課",
        "ref": "30kekkaitiran.xls#事業一覧!24"
      },
      {
        "name": "小学校外国語活動推進事業",
        "grade": "A",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "学校教育課",
        "ref": "30kekkaitiran.xls#事業一覧!25"
      },
      {
        "name": "外国人講師による英語指導事業（中学校）",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "学校教育課",
        "ref": "30kekkaitiran.xls#事業一覧!26"
      },
      {
        "name": "きめ細かな教育推進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "学校教育課",
        "ref": "30kekkaitiran.xls#事業一覧!27"
      },
      {
        "name": "サポートティチャー事業(小学校)",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "学校教育課",
        "ref": "30kekkaitiran.xls#事業一覧!28"
      },
      {
        "name": "サポートティチャー事業(中学校)",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "学校教育課",
        "ref": "30kekkaitiran.xls#事業一覧!29"
      },
      {
        "name": "維持管理事務（中学校）",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "学事課",
        "ref": "30kekkaitiran.xls#事業一覧!31"
      },
      {
        "name": "学校行事事務（小学校）",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "学事課",
        "ref": "30kekkaitiran.xls#事業一覧!32"
      },
      {
        "name": "学校行事事務（中学校）",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "学事課",
        "ref": "30kekkaitiran.xls#事業一覧!33"
      },
      {
        "name": "教育指導事業（小学校）",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "学校教育課",
        "ref": "30kekkaitiran.xls#事業一覧!34"
      },
      {
        "name": "教育指導事業（中学校）",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "学校教育課",
        "ref": "30kekkaitiran.xls#事業一覧!35"
      },
      {
        "name": "新しい時代を担う人づくり基金事業(甲府の教育推進事業）",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "学校教育課",
        "ref": "30kekkaitiran.xls#事業一覧!36"
      },
      {
        "name": "学校危機管理体制整備事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "学校教育課",
        "ref": "30kekkaitiran.xls#事業一覧!37"
      },
      {
        "name": "研修研究事業",
        "grade": "F",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "学校教育課",
        "ref": "30kekkaitiran.xls#事業一覧!38"
      },
      {
        "name": "教育指導研究センター事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "学校教育課",
        "ref": "30kekkaitiran.xls#事業一覧!39"
      },
      {
        "name": "教育研修所事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "学校教育課",
        "ref": "30kekkaitiran.xls#事業一覧!40"
      },
      {
        "name": "学校給食事業（小学校）",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "学事課",
        "ref": "30kekkaitiran.xls#事業一覧!41"
      },
      {
        "name": "学校保健事業（小学校）",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "学事課",
        "ref": "30kekkaitiran.xls#事業一覧!43"
      },
      {
        "name": "学校保健事業（中学校）",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "学事課",
        "ref": "30kekkaitiran.xls#事業一覧!44"
      },
      {
        "name": "小学校老朽化リニューアル事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "建設部",
        "ka": "建築営繕課",
        "ref": "30kekkaitiran.xls#事業一覧!45"
      },
      {
        "name": "中学校老朽化リニューアル事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "建設部",
        "ka": "建築営繕課",
        "ref": "30kekkaitiran.xls#事業一覧!46"
      },
      {
        "name": "中道北小学校移転事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "建設部",
        "ka": "建築営繕課",
        "ref": "30kekkaitiran.xls#事業一覧!48"
      },
      {
        "name": "教材・情報環境整備事業（小学校）",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "学事課",
        "ref": "30kekkaitiran.xls#事業一覧!49"
      },
      {
        "name": "教材・情報環境整備事業（中学校）",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "学事課",
        "ref": "30kekkaitiran.xls#事業一覧!50"
      },
      {
        "name": "小学校給食室整備事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "建設部",
        "ka": "建築営繕課",
        "ref": "30kekkaitiran.xls#事業一覧!51"
      },
      {
        "name": "学校営繕事業（小学校）",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "教育施設課",
        "ref": "30kekkaitiran.xls#事業一覧!52"
      },
      {
        "name": "学校営繕事業（中学校）",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "教育施設課",
        "ref": "30kekkaitiran.xls#事業一覧!53"
      },
      {
        "name": "教育振興事業（小学校）",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "学事課",
        "ref": "30kekkaitiran.xls#事業一覧!55"
      },
      {
        "name": "教育振興事業（中学校）",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "学事課",
        "ref": "30kekkaitiran.xls#事業一覧!56"
      },
      {
        "name": "教育振興助成事務（小学校）",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "学事課",
        "ref": "30kekkaitiran.xls#事業一覧!57"
      },
      {
        "name": "教育振興助成事務（中学校）",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "学事課",
        "ref": "30kekkaitiran.xls#事業一覧!58"
      },
      {
        "name": "外国人講師による英語指導事業（高校）",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "学校教育課",
        "ref": "30kekkaitiran.xls#事業一覧!60"
      },
      {
        "name": "商業高等学校事務",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "商業事務局",
        "ref": "30kekkaitiran.xls#事業一覧!61"
      },
      {
        "name": "商業高等学校保健厚生事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "商業事務局",
        "ref": "30kekkaitiran.xls#事業一覧!63"
      },
      {
        "name": "商業高等学校振興事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "商業事務局",
        "ref": "30kekkaitiran.xls#事業一覧!64"
      },
      {
        "name": "商科専門学校事務",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "商科事務局",
        "ref": "30kekkaitiran.xls#事業一覧!65"
      },
      {
        "name": "商科専門学校振興事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "商科事務局",
        "ref": "30kekkaitiran.xls#事業一覧!67"
      },
      {
        "name": "青少年健全育成事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "子ども未来部",
        "ka": "子ども支援課",
        "ref": "30kekkaitiran.xls#事業一覧!68"
      },
      {
        "name": "チビッコ広場整備事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "子ども未来部",
        "ka": "子ども支援課",
        "ref": "30kekkaitiran.xls#事業一覧!69"
      },
      {
        "name": "成人式事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "生涯学習課",
        "ref": "30kekkaitiran.xls#事業一覧!70"
      },
      {
        "name": "生涯学習振興事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "生涯学習課",
        "ref": "30kekkaitiran.xls#事業一覧!71"
      },
      {
        "name": "総合市民会館管理運営事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "生涯学習課",
        "ref": "30kekkaitiran.xls#事業一覧!74"
      },
      {
        "name": "スポーツ振興事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "スポーツ課",
        "ref": "30kekkaitiran.xls#事業一覧!76"
      },
      {
        "name": "東京オリンピック・パラリンピック事前合宿誘致推進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "企画部",
        "ka": "企画課",
        "ref": "30kekkaitiran.xls#事業一覧!77"
      },
      {
        "name": "藤村記念館事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "歴史文化財課",
        "ref": "30kekkaitiran.xls#事業一覧!83"
      },
      {
        "name": "開府500年・甲府の歴史を学ぶ事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "歴史文化財課",
        "ref": "30kekkaitiran.xls#事業一覧!84"
      },
      {
        "name": "史跡武田氏館跡整備事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "歴史文化財課",
        "ref": "30kekkaitiran.xls#事業一覧!86"
      },
      {
        "name": "人権推進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市民部",
        "ka": "人権男女参画課",
        "ref": "30kekkaitiran.xls#事業一覧!90"
      },
      {
        "name": "平和都市宣言事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市民部",
        "ka": "総務課",
        "ref": "30kekkaitiran.xls#事業一覧!91"
      },
      {
        "name": "男女共同参画推進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市民部",
        "ka": "人権男女参画課",
        "ref": "30kekkaitiran.xls#事業一覧!93"
      },
      {
        "name": "国際交流事業",
        "grade": "A",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市長直轄組織",
        "ka": "秘書課国際交流都市",
        "ref": "30kekkaitiran.xls#事業一覧!94"
      },
      {
        "name": "新しい時代を担う人づくり基金事業(姉妹・友好都市教育交流事業)",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "学校教育課",
        "ref": "30kekkaitiran.xls#事業一覧!96"
      },
      {
        "name": "多文化共生推進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市民部",
        "ka": "市民課",
        "ref": "30kekkaitiran.xls#事業一覧!97"
      },
      {
        "name": "融資対策事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "産業部",
        "ka": "商工課",
        "ref": "30kekkaitiran.xls#事業一覧!101"
      },
      {
        "name": "産業立地等推進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "産業部",
        "ka": "産業立地課",
        "ref": "30kekkaitiran.xls#事業一覧!102"
      },
      {
        "name": "農業経営基盤強化促進対策事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "産業部",
        "ka": "農政課就農支援課",
        "ref": "30kekkaitiran.xls#事業一覧!104"
      },
      {
        "name": "農業振興地域管理事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "産業部",
        "ka": "農政課",
        "ref": "30kekkaitiran.xls#事業一覧!107"
      },
      {
        "name": "中山間地域等直接支払事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "産業部",
        "ka": "農政課",
        "ref": "30kekkaitiran.xls#事業一覧!108"
      },
      {
        "name": "農業委員会事務",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "農業委員会",
        "ka": null,
        "ref": "30kekkaitiran.xls#事業一覧!110"
      },
      {
        "name": "地域整備事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "産業部",
        "ka": "農政課",
        "ref": "30kekkaitiran.xls#事業一覧!113"
      },
      {
        "name": "農業施設等管理事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "産業部",
        "ka": "農政課",
        "ref": "30kekkaitiran.xls#事業一覧!114"
      },
      {
        "name": "こうふフューチャーサーチ普及促進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "企画部",
        "ka": "企画課",
        "ref": "30kekkaitiran.xls#事業一覧!123"
      },
      {
        "name": "雇用促進対策事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "産業部",
        "ka": "雇用創生課",
        "ref": "30kekkaitiran.xls#事業一覧!124"
      },
      {
        "name": "労働福祉事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "産業部",
        "ka": "雇用創生課",
        "ref": "30kekkaitiran.xls#事業一覧!125"
      },
      {
        "name": "勤労者福祉センター管理事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "産業部",
        "ka": "雇用創生課",
        "ref": "30kekkaitiran.xls#事業一覧!126"
      },
      {
        "name": "地方卸売市場運営事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "産業部",
        "ka": "経営管理課",
        "ref": "30kekkaitiran.xls#事業一覧!127"
      },
      {
        "name": "地方卸売市場施設整備事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "産業部",
        "ka": "経営管理課",
        "ref": "30kekkaitiran.xls#事業一覧!128"
      },
      {
        "name": "まつり推進事業",
        "grade": "A",
        "prevGrade": null,
        "budgetName": null,
        "bu": "産業部",
        "ka": "観光課",
        "ref": "30kekkaitiran.xls#事業一覧!129"
      },
      {
        "name": "観光開発事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "産業部",
        "ka": "観光課",
        "ref": "30kekkaitiran.xls#事業一覧!130"
      },
      {
        "name": "観光施設整備事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "産業部",
        "ka": "観光課",
        "ref": "30kekkaitiran.xls#事業一覧!131"
      },
      {
        "name": "観光振興事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "産業部",
        "ka": "観光課",
        "ref": "30kekkaitiran.xls#事業一覧!132"
      },
      {
        "name": "甲府駅周辺拠点形成事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "建設部",
        "ka": "区画整理課",
        "ref": "30kekkaitiran.xls#事業一覧!136"
      },
      {
        "name": "甲府城周辺地域活性化計画整備事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "建設部",
        "ka": "都市計画課",
        "ref": "30kekkaitiran.xls#事業一覧!137"
      },
      {
        "name": "防災対策整備事業",
        "grade": "A",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市長直轄組織",
        "ka": "防災企画課防災指導課",
        "ref": "30kekkaitiran.xls#事業一覧!140"
      },
      {
        "name": "防災行政用無線管理事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市長直轄組織",
        "ka": "防災企画課",
        "ref": "30kekkaitiran.xls#事業一覧!142"
      },
      {
        "name": "災害救助事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "生活福祉課",
        "ref": "30kekkaitiran.xls#事業一覧!143"
      },
      {
        "name": "防災事務",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市長直轄組織",
        "ka": "防災企画課",
        "ref": "30kekkaitiran.xls#事業一覧!144"
      },
      {
        "name": "一般河川改修事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "建設部",
        "ka": "道路河川課",
        "ref": "30kekkaitiran.xls#事業一覧!145"
      },
      {
        "name": "水防事務",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "建設部",
        "ka": "道路河川課",
        "ref": "30kekkaitiran.xls#事業一覧!146"
      },
      {
        "name": "危機管理対策事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市長直轄組織",
        "ka": "危機管理課",
        "ref": "30kekkaitiran.xls#事業一覧!147"
      },
      {
        "name": "消火栓設置事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "消防本部",
        "ka": "警防課",
        "ref": "30kekkaitiran.xls#事業一覧!148"
      },
      {
        "name": "消防施設等整備事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "消防本部",
        "ka": "警防課",
        "ref": "30kekkaitiran.xls#事業一覧!149"
      },
      {
        "name": "非常備消防事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "消防本部",
        "ka": "警防課人事課",
        "ref": "30kekkaitiran.xls#事業一覧!150"
      },
      {
        "name": "常備消防事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "消防本部",
        "ka": "警防課",
        "ref": "30kekkaitiran.xls#事業一覧!151"
      },
      {
        "name": "普通救命事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市長直轄組織",
        "ka": "防災指導課",
        "ref": "30kekkaitiran.xls#事業一覧!152"
      },
      {
        "name": "交通安全対策事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市民部",
        "ka": "消費生活課",
        "ref": "30kekkaitiran.xls#事業一覧!153"
      },
      {
        "name": "社会を明るくする運動事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市民部",
        "ka": "総務課",
        "ref": "30kekkaitiran.xls#事業一覧!154"
      },
      {
        "name": "運転免許証返納高齢者支援事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市民部",
        "ka": "消費生活課",
        "ref": "30kekkaitiran.xls#事業一覧!155"
      },
      {
        "name": "安全安心街づくり事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市長直轄組織",
        "ka": "危機管理課",
        "ref": "30kekkaitiran.xls#事業一覧!156"
      },
      {
        "name": "街路灯助成事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市民部",
        "ka": "協働推進課",
        "ref": "30kekkaitiran.xls#事業一覧!157"
      },
      {
        "name": "学校安全安心推進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "学事課学校教育課",
        "ref": "30kekkaitiran.xls#事業一覧!158"
      },
      {
        "name": "交通安全施設整備事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "建設部",
        "ka": "道路河川課",
        "ref": "30kekkaitiran.xls#事業一覧!159"
      },
      {
        "name": "自転車対策事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市民部",
        "ka": "消費生活課",
        "ref": "30kekkaitiran.xls#事業一覧!160"
      },
      {
        "name": "通学路交通安全対策事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "建設部",
        "ka": "道路河川課",
        "ref": "30kekkaitiran.xls#事業一覧!161"
      },
      {
        "name": "消費者啓発育成事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市民部",
        "ka": "消費生活課",
        "ref": "30kekkaitiran.xls#事業一覧!163"
      },
      {
        "name": "計量検査事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市民部",
        "ka": "消費生活課",
        "ref": "30kekkaitiran.xls#事業一覧!164"
      },
      {
        "name": "社会福祉総務事務",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "総務課",
        "ref": "30kekkaitiran.xls#事業一覧!165"
      },
      {
        "name": "福祉関係計画推進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "総務課",
        "ref": "30kekkaitiran.xls#事業一覧!166"
      },
      {
        "name": "民生委員関係事務",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "総務課",
        "ref": "30kekkaitiran.xls#事業一覧!167"
      },
      {
        "name": "戦没者・原水爆被爆者等援護事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "障がい福祉課",
        "ref": "30kekkaitiran.xls#事業一覧!168"
      },
      {
        "name": "生きがい対策事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "高齢者福祉課",
        "ref": "30kekkaitiran.xls#事業一覧!169"
      },
      {
        "name": "福祉センター建設事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "高齢者福祉課",
        "ref": "30kekkaitiran.xls#事業一覧!170"
      },
      {
        "name": "福祉センター事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "高齢者福祉課",
        "ref": "30kekkaitiran.xls#事業一覧!171"
      },
      {
        "name": "老人保護措置事務",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "高齢者福祉課",
        "ref": "30kekkaitiran.xls#事業一覧!172"
      },
      {
        "name": "在日外国人高齢者等福祉給付金支給事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "高齢者福祉課",
        "ref": "30kekkaitiran.xls#事業一覧!174"
      },
      {
        "name": "在宅高齢者対策事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "高齢者福祉課",
        "ref": "30kekkaitiran.xls#事業一覧!175"
      },
      {
        "name": "若竹ねぎらい事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "高齢者福祉課",
        "ref": "30kekkaitiran.xls#事業一覧!176"
      },
      {
        "name": "介護保険サービス事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "健康政策課健康増進課介護保険課",
        "ref": "30kekkaitiran.xls#事業一覧!177"
      },
      {
        "name": "成年後見制度普及促進事業",
        "grade": "A",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "高齢者福祉課",
        "ref": "30kekkaitiran.xls#事業一覧!178"
      },
      {
        "name": "介護保険対策事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "介護保険課",
        "ref": "30kekkaitiran.xls#事業一覧!179"
      },
      {
        "name": "重度心身障害者医療費助成事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "障がい福祉課",
        "ref": "30kekkaitiran.xls#事業一覧!180"
      },
      {
        "name": "自立支援サービス事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "障がい福祉課",
        "ref": "30kekkaitiran.xls#事業一覧!181"
      },
      {
        "name": "特別障害者手当等支給事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "障がい福祉課",
        "ref": "30kekkaitiran.xls#事業一覧!182"
      },
      {
        "name": "心身障害児童福祉手当支給事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "障がい福祉課",
        "ref": "30kekkaitiran.xls#事業一覧!183"
      },
      {
        "name": "自立支援医療事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "障がい福祉課",
        "ref": "30kekkaitiran.xls#事業一覧!184"
      },
      {
        "name": "自立支援補装具事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "障がい福祉課",
        "ref": "30kekkaitiran.xls#事業一覧!185"
      },
      {
        "name": "自立支援給付審査会事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "障がい福祉課",
        "ref": "30kekkaitiran.xls#事業一覧!186"
      },
      {
        "name": "障害児通所支援事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "障がい福祉課",
        "ref": "30kekkaitiran.xls#事業一覧!187"
      },
      {
        "name": "障害者のすみよいまちづくり事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "障がい福祉課",
        "ref": "30kekkaitiran.xls#事業一覧!188"
      },
      {
        "name": "地域生活支援事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "障がい福祉課",
        "ref": "30kekkaitiran.xls#事業一覧!189"
      },
      {
        "name": "障害者センター事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "障がい福祉課",
        "ref": "30kekkaitiran.xls#事業一覧!190"
      },
      {
        "name": "身体障害者福祉事務",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "障がい福祉課",
        "ref": "30kekkaitiran.xls#事業一覧!191"
      },
      {
        "name": "生活保護扶助事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "生活福祉課",
        "ref": "30kekkaitiran.xls#事業一覧!192"
      },
      {
        "name": "行旅病人死亡人取扱事務",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "生活福祉課",
        "ref": "30kekkaitiran.xls#事業一覧!194"
      },
      {
        "name": "生活保護総務事務",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "生活福祉課",
        "ref": "30kekkaitiran.xls#事業一覧!195"
      },
      {
        "name": "生活保護適正実施推進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "生活福祉課",
        "ref": "30kekkaitiran.xls#事業一覧!196"
      },
      {
        "name": "中国残留邦人生活支援事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "生活福祉課",
        "ref": "30kekkaitiran.xls#事業一覧!197"
      },
      {
        "name": "生活保護受給者就労支援事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "生活福祉課",
        "ref": "30kekkaitiran.xls#事業一覧!198"
      },
      {
        "name": "国民健康保険事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市民部",
        "ka": "国民健康保険課",
        "ref": "30kekkaitiran.xls#事業一覧!200"
      },
      {
        "name": "後期高齢者医療事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "高齢者福祉課",
        "ref": "30kekkaitiran.xls#事業一覧!201"
      },
      {
        "name": "介護保険運営事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "介護保険課",
        "ref": "30kekkaitiran.xls#事業一覧!202"
      },
      {
        "name": "国民年金事務",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市民部",
        "ka": "市民課",
        "ref": "30kekkaitiran.xls#事業一覧!203"
      },
      {
        "name": "健康づくり推進事業",
        "grade": "A",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "健康政策課健康増進課",
        "ref": "30kekkaitiran.xls#事業一覧!204"
      },
      {
        "name": "健康づくり推進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "子ども未来部",
        "ka": "母子保健課",
        "ref": "30kekkaitiran.xls#事業一覧!205"
      },
      {
        "name": "健康ポイント事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "健康政策課健康増進課",
        "ref": "30kekkaitiran.xls#事業一覧!206"
      },
      {
        "name": "保健施設管理事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "健康増進課",
        "ref": "30kekkaitiran.xls#事業一覧!208"
      },
      {
        "name": "健康診査事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "健康増進課",
        "ref": "30kekkaitiran.xls#事業一覧!210"
      },
      {
        "name": "各種予防事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "健康増進課",
        "ref": "30kekkaitiran.xls#事業一覧!211"
      },
      {
        "name": "各種予防事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "子ども未来部",
        "ka": "母子保健課",
        "ref": "30kekkaitiran.xls#事業一覧!212"
      },
      {
        "name": "母子保健事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "子ども未来部",
        "ka": "母子保健課",
        "ref": "30kekkaitiran.xls#事業一覧!213"
      },
      {
        "name": "医療機器等整備事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市立甲府病院事務局",
        "ka": "総務課",
        "ref": "30kekkaitiran.xls#事業一覧!216"
      },
      {
        "name": "国民健康保険事業（直営診療）",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市民部",
        "ka": "国民健康保険課",
        "ref": "30kekkaitiran.xls#事業一覧!217"
      },
      {
        "name": "救急医療体制整備事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "健康政策課",
        "ref": "30kekkaitiran.xls#事業一覧!218"
      },
      {
        "name": "地域医療センター管理事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "健康増進課",
        "ref": "30kekkaitiran.xls#事業一覧!220"
      },
      {
        "name": "地球温暖化対策事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "環境部",
        "ka": "環境保全課",
        "ref": "30kekkaitiran.xls#事業一覧!221"
      },
      {
        "name": "都市美化事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "環境部",
        "ka": "収集課",
        "ref": "30kekkaitiran.xls#事業一覧!223"
      },
      {
        "name": "環境対策事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "環境部",
        "ka": "環境保全課",
        "ref": "30kekkaitiran.xls#事業一覧!224"
      },
      {
        "name": "動物園整備事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "建設部",
        "ka": "公園緑地課",
        "ref": "30kekkaitiran.xls#事業一覧!229"
      },
      {
        "name": "都市公園管理事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "建設部",
        "ka": "公園緑地課",
        "ref": "30kekkaitiran.xls#事業一覧!230"
      },
      {
        "name": "圃場管理事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "建設部",
        "ka": "公園緑地課",
        "ref": "30kekkaitiran.xls#事業一覧!232"
      },
      {
        "name": "環境リサイクルフェア事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "環境部",
        "ka": "環境保全課",
        "ref": "30kekkaitiran.xls#事業一覧!233"
      },
      {
        "name": "明るくきれいなまちづくり基金事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "環境部",
        "ka": "減量課",
        "ref": "30kekkaitiran.xls#事業一覧!234"
      },
      {
        "name": "学校給食事業（小学校）（食品ロス対策）",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "学事課",
        "ref": "30kekkaitiran.xls#事業一覧!236"
      },
      {
        "name": "塵芥収集事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "環境部",
        "ka": "収集課",
        "ref": "30kekkaitiran.xls#事業一覧!237"
      },
      {
        "name": "最終処分場事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "環境部",
        "ka": "処理課",
        "ref": "30kekkaitiran.xls#事業一覧!238"
      },
      {
        "name": "附属焼却工場事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "環境部",
        "ka": "処理課",
        "ref": "30kekkaitiran.xls#事業一覧!239"
      },
      {
        "name": "一般廃棄物処理事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "環境部",
        "ka": "処理課",
        "ref": "30kekkaitiran.xls#事業一覧!240"
      },
      {
        "name": "リサイクルプラザ管理運営事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "環境部",
        "ka": "減量課",
        "ref": "30kekkaitiran.xls#事業一覧!241"
      },
      {
        "name": "環境総務事務",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "環境部",
        "ka": "総務課",
        "ref": "30kekkaitiran.xls#事業一覧!242"
      },
      {
        "name": "最終処分場建設事業",
        "grade": "F",
        "prevGrade": null,
        "budgetName": null,
        "bu": "環境部",
        "ka": "処理課",
        "ref": "30kekkaitiran.xls#事業一覧!243"
      },
      {
        "name": "環境センター地域環境整備事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "環境部",
        "ka": "総務課",
        "ref": "30kekkaitiran.xls#事業一覧!244"
      },
      {
        "name": "景観まちづくり推進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "建設部",
        "ka": "都市計画課",
        "ref": "30kekkaitiran.xls#事業一覧!245"
      },
      {
        "name": "屋外広告物指導事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "建設部",
        "ka": "都市計画課",
        "ref": "30kekkaitiran.xls#事業一覧!246"
      },
      {
        "name": "公営住宅整備事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "建設部",
        "ka": "住宅課",
        "ref": "30kekkaitiran.xls#事業一覧!247"
      },
      {
        "name": "空家等対策推進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "建設部",
        "ka": "空き家対策課",
        "ref": "30kekkaitiran.xls#事業一覧!251"
      },
      {
        "name": "水源保全活動推進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "上下水道局",
        "ka": "水保全課",
        "ref": "30kekkaitiran.xls#事業一覧!252"
      },
      {
        "name": "水源域の水質調査事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "上下水道局",
        "ka": "浄水課",
        "ref": "30kekkaitiran.xls#事業一覧!253"
      },
      {
        "name": "水質検査事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "上下水道局",
        "ka": "浄水課",
        "ref": "30kekkaitiran.xls#事業一覧!254"
      },
      {
        "name": "貯水槽水道管理指導事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "上下水道局",
        "ka": "給排水課",
        "ref": "30kekkaitiran.xls#事業一覧!255"
      },
      {
        "name": "水道管路耐震化事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "上下水道局",
        "ka": "水道課",
        "ref": "30kekkaitiran.xls#事業一覧!258"
      },
      {
        "name": "浄水施設等更新事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "上下水道局",
        "ka": "浄水課",
        "ref": "30kekkaitiran.xls#事業一覧!260"
      },
      {
        "name": "水道管移設整備事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "健康増進課",
        "ref": "30kekkaitiran.xls#事業一覧!261"
      },
      {
        "name": "汚水管きょ整備事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "上下水道局",
        "ka": "下水道課",
        "ref": "30kekkaitiran.xls#事業一覧!262"
      },
      {
        "name": "下水道接続促進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "上下水道局",
        "ka": "給排水課",
        "ref": "30kekkaitiran.xls#事業一覧!263"
      },
      {
        "name": "下水道地震対策事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "上下水道局",
        "ka": "下水道課浄化センター",
        "ref": "30kekkaitiran.xls#事業一覧!264"
      },
      {
        "name": "処理場等施設の調査及び改築事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "上下水道局",
        "ka": "浄化センター",
        "ref": "30kekkaitiran.xls#事業一覧!266"
      },
      {
        "name": "生活排水対策事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "環境部",
        "ka": "環境保全課",
        "ref": "30kekkaitiran.xls#事業一覧!267"
      },
      {
        "name": "浄化槽事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "環境部",
        "ka": "環境保全課",
        "ref": "30kekkaitiran.xls#事業一覧!268"
      },
      {
        "name": "農業集落排水事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "産業部",
        "ka": "農政課",
        "ref": "30kekkaitiran.xls#事業一覧!269"
      },
      {
        "name": "し尿処理事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "環境部",
        "ka": "処理課",
        "ref": "30kekkaitiran.xls#事業一覧!270"
      },
      {
        "name": "斎場管理事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "健康増進課",
        "ref": "30kekkaitiran.xls#事業一覧!271"
      },
      {
        "name": "つつじが崎霊園管理事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "建設部",
        "ka": "公園緑地課",
        "ref": "30kekkaitiran.xls#事業一覧!272"
      },
      {
        "name": "公衆衛生事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "健康増進課",
        "ref": "30kekkaitiran.xls#事業一覧!274"
      },
      {
        "name": "環境衛生事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "環境部",
        "ka": "収集課",
        "ref": "30kekkaitiran.xls#事業一覧!275"
      },
      {
        "name": "公共交通体系整備推進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "企画部",
        "ka": "交通政策課",
        "ref": "30kekkaitiran.xls#事業一覧!276"
      },
      {
        "name": "公共交通体系整備推進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "企画部",
        "ka": "リニア政策課",
        "ref": "30kekkaitiran.xls#事業一覧!277"
      },
      {
        "name": "バス利用促進対策事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "企画部",
        "ka": "交通政策課",
        "ref": "30kekkaitiran.xls#事業一覧!278"
      },
      {
        "name": "在来鉄道の利便性向上事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "企画部",
        "ka": "交通政策課",
        "ref": "30kekkaitiran.xls#事業一覧!279"
      },
      {
        "name": "都市基本計画推進事業（都市計画道路の整備）",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "建設部",
        "ka": "都市計画課",
        "ref": "30kekkaitiran.xls#事業一覧!280"
      },
      {
        "name": "和戸町竜王線整備事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "建設部",
        "ka": "都市整備課",
        "ref": "30kekkaitiran.xls#事業一覧!281"
      },
      {
        "name": "市道新設改良事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "建設部",
        "ka": "都市整備課",
        "ref": "30kekkaitiran.xls#事業一覧!282"
      },
      {
        "name": "高速交通体系整備事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "建設部",
        "ka": "都市計画課",
        "ref": "30kekkaitiran.xls#事業一覧!283"
      },
      {
        "name": "市単独街路事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "建設部",
        "ka": "都市整備課",
        "ref": "30kekkaitiran.xls#事業一覧!284"
      },
      {
        "name": "都市整備事務",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "建設部",
        "ka": "都市整備課",
        "ref": "30kekkaitiran.xls#事業一覧!285"
      },
      {
        "name": "橋りょう長寿命化修繕事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "建設部",
        "ka": "道路河川課",
        "ref": "30kekkaitiran.xls#事業一覧!286"
      },
      {
        "name": "道路維持管理事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "建設部",
        "ka": "道路河川課",
        "ref": "30kekkaitiran.xls#事業一覧!287"
      },
      {
        "name": "春日本通り線外整備事業",
        "grade": "F",
        "prevGrade": null,
        "budgetName": null,
        "bu": "建設部",
        "ka": "道路河川課",
        "ref": "30kekkaitiran.xls#事業一覧!288"
      },
      {
        "name": "道路用地管理事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "建設部",
        "ka": "道路河川課",
        "ref": "30kekkaitiran.xls#事業一覧!289"
      },
      {
        "name": "道路河川維持事務",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "建設部",
        "ka": "道路河川課",
        "ref": "30kekkaitiran.xls#事業一覧!290"
      },
      {
        "name": "市道舗装（補修）事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "建設部",
        "ka": "道路河川課",
        "ref": "30kekkaitiran.xls#事業一覧!291"
      },
      {
        "name": "市道側溝整備事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "建設部",
        "ka": "道路河川課",
        "ref": "30kekkaitiran.xls#事業一覧!292"
      },
      {
        "name": "落石防止柵設置事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "建設部",
        "ka": "道路河川課",
        "ref": "30kekkaitiran.xls#事業一覧!293"
      },
      {
        "name": "歩道整備事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "建設部",
        "ka": "道路河川課",
        "ref": "30kekkaitiran.xls#事業一覧!294"
      },
      {
        "name": "濁川西地区整備事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "建設部",
        "ka": "都市整備課",
        "ref": "30kekkaitiran.xls#事業一覧!297"
      },
      {
        "name": "都市計画事務",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "建設部",
        "ka": "都市計画課",
        "ref": "30kekkaitiran.xls#事業一覧!298"
      },
      {
        "name": "土地開発指導事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "建設部",
        "ka": "都市計画課",
        "ref": "30kekkaitiran.xls#事業一覧!299"
      },
      {
        "name": "建築指導事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "建設部",
        "ka": "建築指導課",
        "ref": "30kekkaitiran.xls#事業一覧!300"
      },
      {
        "name": "都市基本計画推進事業（立地適正化計画の策定）",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "建設部",
        "ka": "都市計画課",
        "ref": "30kekkaitiran.xls#事業一覧!301"
      },
      {
        "name": "地籍調査事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "建設部",
        "ka": "地籍調査課",
        "ref": "30kekkaitiran.xls#事業一覧!302"
      },
      {
        "name": "まちづくり計画推進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市民部",
        "ka": "協働推進課",
        "ref": "30kekkaitiran.xls#事業一覧!303"
      },
      {
        "name": "協働づくり推進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市民部",
        "ka": "協働推進課",
        "ref": "30kekkaitiran.xls#事業一覧!304"
      },
      {
        "name": "地域集会施設整備助成事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市民部",
        "ka": "協働推進課",
        "ref": "30kekkaitiran.xls#事業一覧!305"
      },
      {
        "name": "広報推進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市長直轄組織",
        "ka": "ｼﾃｨﾌﾟﾛﾓｰｼｮﾝ課",
        "ref": "30kekkaitiran.xls#事業一覧!309"
      },
      {
        "name": "広聴活動事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市民部",
        "ka": "協働推進課",
        "ref": "30kekkaitiran.xls#事業一覧!310"
      },
      {
        "name": "広域行政推進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "企画部",
        "ka": "企画課",
        "ref": "30kekkaitiran.xls#事業一覧!311"
      },
      {
        "name": "こうふ開府500年記念事業",
        "grade": "A",
        "prevGrade": null,
        "budgetName": null,
        "bu": "企画部",
        "ka": "開府企画課開府事業課",
        "ref": "30kekkaitiran.xls#事業一覧!313"
      },
      {
        "name": "基本戦略推進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市長直轄組織",
        "ka": "都市戦略課",
        "ref": "30kekkaitiran.xls#事業一覧!314"
      },
      {
        "name": "庁舎管理事務",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "総務部",
        "ka": "管財課",
        "ref": "30kekkaitiran.xls#事業一覧!315"
      },
      {
        "name": "新事業形成事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "企画部",
        "ka": "企画課",
        "ref": "30kekkaitiran.xls#事業一覧!318"
      },
      {
        "name": "窓口センター事務",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市民部",
        "ka": "総務課",
        "ref": "30kekkaitiran.xls#事業一覧!319"
      },
      {
        "name": "中道支所事務",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市民部",
        "ka": "中道支所",
        "ref": "30kekkaitiran.xls#事業一覧!320"
      },
      {
        "name": "上九一色出張所事務",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市民部",
        "ka": "上九一色出張所",
        "ref": "30kekkaitiran.xls#事業一覧!321"
      },
      {
        "name": "戸籍住民基本台帳事務",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市民部",
        "ka": "市民課",
        "ref": "30kekkaitiran.xls#事業一覧!322"
      },
      {
        "name": "個人番号制度管理事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市民部",
        "ka": "市民課",
        "ref": "30kekkaitiran.xls#事業一覧!323"
      },
      {
        "name": "公共施設等マネジメント推進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "総務部",
        "ka": "財産活用課",
        "ref": "30kekkaitiran.xls#事業一覧!329"
      },
      {
        "name": "中核市移行推進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市長直轄組織",
        "ka": "中核市推進課",
        "ref": "30kekkaitiran.xls#事業一覧!338"
      },
      {
        "name": "保健所準備事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "保健所設置課",
        "ref": "30kekkaitiran.xls#事業一覧!339"
      }
    ]
  },
  {
    "fy": "H29",
    "fyLabel": "平成29年度",
    "sourceTitle": "平成29年度 甲府市行政評価（事務事業評価）結果一覧",
    "sourceUrl": "https://web.archive.org/web/20260712141740/https://www.city.kofu.yamanashi.jp/zaise/documents/kekkaitiran.xls",
    "originUrl": "https://www.city.kofu.yamanashi.jp/zaise/documents/kekkaitiran.xls",
    "sourceLocalUrl": "/sources/kofu-gyousei-hyouka-h29/kekkaitiran.xls",
    "items": [
      {
        "name": "幼稚園就園奨励事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "子ども未来部",
        "ka": "子ども保育課",
        "ref": "kekkaitiran.xls#事業一覧!4"
      },
      {
        "name": "公立保育所事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "子ども未来部",
        "ka": "子ども保育課",
        "ref": "kekkaitiran.xls#事業一覧!5"
      },
      {
        "name": "教育･保育施設等運営給付事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "子ども未来部",
        "ka": "子ども保育課",
        "ref": "kekkaitiran.xls#事業一覧!7"
      },
      {
        "name": "教育･保育施設等整備事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "子ども未来部",
        "ka": "子ども保育課",
        "ref": "kekkaitiran.xls#事業一覧!8"
      },
      {
        "name": "すこやか子育て医療費助成事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "子ども未来部",
        "ka": "子ども支援課",
        "ref": "kekkaitiran.xls#事業一覧!10"
      },
      {
        "name": "ひとり親家庭等医療費助成事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "子ども未来部",
        "ka": "子ども支援課",
        "ref": "kekkaitiran.xls#事業一覧!11"
      },
      {
        "name": "多子世帯等への利用者負担額（保育料）軽減事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "子ども未来部",
        "ka": "子ども支援課",
        "ref": "kekkaitiran.xls#事業一覧!12"
      },
      {
        "name": "児童手当支給事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "子ども未来部",
        "ka": "子ども支援課",
        "ref": "kekkaitiran.xls#事業一覧!13"
      },
      {
        "name": "ひとり親等福祉事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "子ども未来部",
        "ka": "子ども支援課",
        "ref": "kekkaitiran.xls#事業一覧!14"
      },
      {
        "name": "母子生活支援施設等措置事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "子ども未来部",
        "ka": "子ども支援課",
        "ref": "kekkaitiran.xls#事業一覧!15"
      },
      {
        "name": "養育医療事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "子ども未来部",
        "ka": "母子保健課",
        "ref": "kekkaitiran.xls#事業一覧!16"
      },
      {
        "name": "子育て総合相談窓口運営事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "子ども未来部",
        "ka": "子ども支援課",
        "ref": "kekkaitiran.xls#事業一覧!17"
      },
      {
        "name": "子ども・子育て支援事務",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "子ども未来部",
        "ka": "子ども保育課",
        "ref": "kekkaitiran.xls#事業一覧!18"
      },
      {
        "name": "幼児教育センター事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "子ども未来部",
        "ka": "子ども支援課",
        "ref": "kekkaitiran.xls#事業一覧!20"
      },
      {
        "name": "子育て・お助け隊派遣事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "子ども未来部",
        "ka": "子ども支援課",
        "ref": "kekkaitiran.xls#事業一覧!23"
      },
      {
        "name": "小学校外国語活動推進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "学校教育課",
        "ref": "kekkaitiran.xls#事業一覧!24"
      },
      {
        "name": "きめ細かな教育推進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "学校教育課",
        "ref": "kekkaitiran.xls#事業一覧!26"
      },
      {
        "name": "サポートティチャー事業(小学校)",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "学校教育課",
        "ref": "kekkaitiran.xls#事業一覧!27"
      },
      {
        "name": "サポートティチャー事業(中学校)",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "学校教育課",
        "ref": "kekkaitiran.xls#事業一覧!28"
      },
      {
        "name": "教育指導事業（小学校）",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "学校教育課",
        "ref": "kekkaitiran.xls#事業一覧!29"
      },
      {
        "name": "維持管理事務（中学校）",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "学事課",
        "ref": "kekkaitiran.xls#事業一覧!32"
      },
      {
        "name": "学校行事事務（小学校）",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "学事課",
        "ref": "kekkaitiran.xls#事業一覧!33"
      },
      {
        "name": "学校行事事務（中学校）",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "学事課",
        "ref": "kekkaitiran.xls#事業一覧!34"
      },
      {
        "name": "新しい時代を担う人づくり基金事業(甲府の教育推進事業）",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "学校教育課",
        "ref": "kekkaitiran.xls#事業一覧!35"
      },
      {
        "name": "教育指導研究センター事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "学校教育課",
        "ref": "kekkaitiran.xls#事業一覧!39"
      },
      {
        "name": "教育研修所事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "学校教育課",
        "ref": "kekkaitiran.xls#事業一覧!40"
      },
      {
        "name": "学校保健事業（小学校）",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教",
        "ka": "学事課",
        "ref": "kekkaitiran.xls#事業一覧!43"
      },
      {
        "name": "学校保健事業（中学校）",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教",
        "ka": "学事課",
        "ref": "kekkaitiran.xls#事業一覧!44"
      },
      {
        "name": "小学校老朽化リニューアル事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "建設部",
        "ka": "建築営繕課",
        "ref": "kekkaitiran.xls#事業一覧!45"
      },
      {
        "name": "中学校老朽化リニューアル事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "建設部",
        "ka": "建築営繕課",
        "ref": "kekkaitiran.xls#事業一覧!46"
      },
      {
        "name": "教材・情報環境整備事業（小学校）",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "学事課",
        "ref": "kekkaitiran.xls#事業一覧!47"
      },
      {
        "name": "教材・情報環境整備事業（中学校）",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "学事課",
        "ref": "kekkaitiran.xls#事業一覧!48"
      },
      {
        "name": "小学校給食室整備事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "建設部",
        "ka": "建築営繕課",
        "ref": "kekkaitiran.xls#事業一覧!49"
      },
      {
        "name": "学校営繕事業（小学校）",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "教育施設課",
        "ref": "kekkaitiran.xls#事業一覧!50"
      },
      {
        "name": "学校営繕事業（中学校）",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "教育施設課",
        "ref": "kekkaitiran.xls#事業一覧!51"
      },
      {
        "name": "教育振興助成事務（小学校）",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "学事課",
        "ref": "kekkaitiran.xls#事業一覧!54"
      },
      {
        "name": "教育振興助成事務（中学校）",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "学事課",
        "ref": "kekkaitiran.xls#事業一覧!55"
      },
      {
        "name": "外国人講師による英語指導事業（高校）",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "学校教育課",
        "ref": "kekkaitiran.xls#事業一覧!57"
      },
      {
        "name": "商業高等学校管理事務",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "商業事務局",
        "ref": "kekkaitiran.xls#事業一覧!60"
      },
      {
        "name": "商業高等学校保健厚生事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "商業事務局",
        "ref": "kekkaitiran.xls#事業一覧!63"
      },
      {
        "name": "商科専門学校事務",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "商科事務局",
        "ref": "kekkaitiran.xls#事業一覧!64"
      },
      {
        "name": "商科専門学校振興事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "商科事務局",
        "ref": "kekkaitiran.xls#事業一覧!66"
      },
      {
        "name": "青少年宿泊施設管理事業",
        "grade": "F",
        "prevGrade": null,
        "budgetName": null,
        "bu": "子ども未来部",
        "ka": "子ども支援課",
        "ref": "kekkaitiran.xls#事業一覧!67"
      },
      {
        "name": "チビッコ広場整備事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "子ども未来部",
        "ka": "子ども支援課",
        "ref": "kekkaitiran.xls#事業一覧!68"
      },
      {
        "name": "青少年健全育成事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "子ども未来部",
        "ka": "子ども支援課",
        "ref": "kekkaitiran.xls#事業一覧!69"
      },
      {
        "name": "成人式事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "生涯学習文化課",
        "ref": "kekkaitiran.xls#事業一覧!70"
      },
      {
        "name": "公民館管理運営事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "生涯学習文化課",
        "ref": "kekkaitiran.xls#事業一覧!73"
      },
      {
        "name": "総合市民会館管理運営事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "生涯学習文化課",
        "ref": "kekkaitiran.xls#事業一覧!74"
      },
      {
        "name": "開府500年・甲府の歴史を学ぶ事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "生涯学習文化課",
        "ref": "kekkaitiran.xls#事業一覧!80"
      },
      {
        "name": "藤村記念館事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "生涯学習文化課",
        "ref": "kekkaitiran.xls#事業一覧!81"
      },
      {
        "name": "人権推進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市民部",
        "ka": "人権男女参画課",
        "ref": "kekkaitiran.xls#事業一覧!87"
      },
      {
        "name": "平和都市宣言事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市民部",
        "ka": "総務課",
        "ref": "kekkaitiran.xls#事業一覧!88"
      },
      {
        "name": "融資対策事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "産業部",
        "ka": "商工課",
        "ref": "kekkaitiran.xls#事業一覧!95"
      },
      {
        "name": "地場産業振興対策事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "産業部",
        "ka": "商工課",
        "ref": "kekkaitiran.xls#事業一覧!97"
      },
      {
        "name": "農業経営基盤強化促進対策事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "産業部",
        "ka": "農政課",
        "ref": "kekkaitiran.xls#事業一覧!98"
      },
      {
        "name": "農業振興地域管理事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "産業部",
        "ka": "農政課",
        "ref": "kekkaitiran.xls#事業一覧!101"
      },
      {
        "name": "中山間地域等直接支払事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "産業部",
        "ka": "農政課",
        "ref": "kekkaitiran.xls#事業一覧!102"
      },
      {
        "name": "農業委員会事務",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "農業委員会",
        "ka": "農政課",
        "ref": "kekkaitiran.xls#事業一覧!103"
      },
      {
        "name": "地域整備事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "産業部",
        "ka": "農政課",
        "ref": "kekkaitiran.xls#事業一覧!105"
      },
      {
        "name": "森づくり推進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "産業部",
        "ka": "林政課",
        "ref": "kekkaitiran.xls#事業一覧!108"
      },
      {
        "name": "小規模治山事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "産業部",
        "ka": "林政課",
        "ref": "kekkaitiran.xls#事業一覧!109"
      },
      {
        "name": "既設林道維持管理事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "産業部",
        "ka": "林政課",
        "ref": "kekkaitiran.xls#事業一覧!110"
      },
      {
        "name": "こうふフューチャーサーチ普及促進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "企画部",
        "ka": "企画課",
        "ref": "kekkaitiran.xls#事業一覧!115"
      },
      {
        "name": "雇用促進対策事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "産業部",
        "ka": "雇用創生課",
        "ref": "kekkaitiran.xls#事業一覧!116"
      },
      {
        "name": "労働福祉事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "産業部",
        "ka": "雇用創生課",
        "ref": "kekkaitiran.xls#事業一覧!119"
      },
      {
        "name": "地方卸売市場運営事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "産業部",
        "ka": "経営管理課",
        "ref": "kekkaitiran.xls#事業一覧!120"
      },
      {
        "name": "地方卸売市場施設整備事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "産業部",
        "ka": "経営管理課",
        "ref": "kekkaitiran.xls#事業一覧!121"
      },
      {
        "name": "観光開発事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "産業部",
        "ka": "観光課",
        "ref": "kekkaitiran.xls#事業一覧!123"
      },
      {
        "name": "観光施設整備事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "産業部",
        "ka": "観光課",
        "ref": "kekkaitiran.xls#事業一覧!125"
      },
      {
        "name": "優良建築物等整備事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "建設部",
        "ka": "都市計画課",
        "ref": "kekkaitiran.xls#事業一覧!128"
      },
      {
        "name": "中心市街地定住促進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "建設部",
        "ka": "都市計画課",
        "ref": "kekkaitiran.xls#事業一覧!129"
      },
      {
        "name": "甲府駅周辺拠点形成事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "建設部",
        "ka": "区画整理課",
        "ref": "kekkaitiran.xls#事業一覧!130"
      },
      {
        "name": "移住・定住促進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "企画部",
        "ka": "地域振興課",
        "ref": "kekkaitiran.xls#事業一覧!132"
      },
      {
        "name": "防災事務",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市長直轄組織",
        "ka": "防災企画課",
        "ref": "kekkaitiran.xls#事業一覧!133"
      },
      {
        "name": "総合防災訓練事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市長直轄組織",
        "ka": "防災企画課",
        "ref": "kekkaitiran.xls#事業一覧!134"
      },
      {
        "name": "防災行政用無線管理事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市長直轄組織",
        "ka": "防災企画課",
        "ref": "kekkaitiran.xls#事業一覧!135"
      },
      {
        "name": "防災対策整備事業",
        "grade": "A",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市長直轄組織",
        "ka": "防災企画課",
        "ref": "kekkaitiran.xls#事業一覧!136"
      },
      {
        "name": "災害救助事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "生活福祉課",
        "ref": "kekkaitiran.xls#事業一覧!137"
      },
      {
        "name": "水防事務",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "建設部",
        "ka": "道路河川課",
        "ref": "kekkaitiran.xls#事業一覧!138"
      },
      {
        "name": "危機管理対策事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市長直轄組織",
        "ka": "危機管理課",
        "ref": "kekkaitiran.xls#事業一覧!140"
      },
      {
        "name": "常備消防事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "消防本部",
        "ka": "警防課",
        "ref": "kekkaitiran.xls#事業一覧!141"
      },
      {
        "name": "消火栓設置事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "消防本部",
        "ka": "警防課",
        "ref": "kekkaitiran.xls#事業一覧!142"
      },
      {
        "name": "消防施設等整備事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "消防本部",
        "ka": "警防",
        "ref": "kekkaitiran.xls#事業一覧!143"
      },
      {
        "name": "非常備消防事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "消防本部",
        "ka": "警防課人事課",
        "ref": "kekkaitiran.xls#事業一覧!144"
      },
      {
        "name": "交通安全対策事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市民部",
        "ka": "消費生活課",
        "ref": "kekkaitiran.xls#事業一覧!146"
      },
      {
        "name": "社会を明るくする運動事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市民部",
        "ka": "総務課",
        "ref": "kekkaitiran.xls#事業一覧!147"
      },
      {
        "name": "運転免許証返納高齢者支援事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市民部",
        "ka": "消費生活課",
        "ref": "kekkaitiran.xls#事業一覧!148"
      },
      {
        "name": "安全安心街づくり事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市長直轄組織",
        "ka": "危機管理課",
        "ref": "kekkaitiran.xls#事業一覧!149"
      },
      {
        "name": "街路灯助成事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市民部",
        "ka": "協働推進課",
        "ref": "kekkaitiran.xls#事業一覧!150"
      },
      {
        "name": "学校安全安心推進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "教育部",
        "ka": "学事課学校教育課",
        "ref": "kekkaitiran.xls#事業一覧!151"
      },
      {
        "name": "交通安全施設整備事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "建設部",
        "ka": "道路河川課",
        "ref": "kekkaitiran.xls#事業一覧!152"
      },
      {
        "name": "通学路交通安全対策事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "建設部",
        "ka": "道路河川課",
        "ref": "kekkaitiran.xls#事業一覧!154"
      },
      {
        "name": "消費者啓発育成事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市民部",
        "ka": "消費生活課",
        "ref": "kekkaitiran.xls#事業一覧!156"
      },
      {
        "name": "計量検査事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市民部",
        "ka": "消費生活課",
        "ref": "kekkaitiran.xls#事業一覧!157"
      },
      {
        "name": "社会福祉総務事務",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "総務課",
        "ref": "kekkaitiran.xls#事業一覧!158"
      },
      {
        "name": "民生委員関係事務",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "総務課",
        "ref": "kekkaitiran.xls#事業一覧!160"
      },
      {
        "name": "戦没者・原水爆被爆者等援護事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "障がい福祉課",
        "ref": "kekkaitiran.xls#事業一覧!161"
      },
      {
        "name": "福祉センター建設事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "高齢者福祉課",
        "ref": "kekkaitiran.xls#事業一覧!163"
      },
      {
        "name": "福祉センター事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "高齢者福祉課",
        "ref": "kekkaitiran.xls#事業一覧!164"
      },
      {
        "name": "若竹ねぎらい事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "高齢者福祉課",
        "ref": "kekkaitiran.xls#事業一覧!166"
      },
      {
        "name": "在日外国人高齢者等福祉給付金支給事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "高齢者福祉課",
        "ref": "kekkaitiran.xls#事業一覧!168"
      },
      {
        "name": "老人保護措置事務",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "高齢者福祉課",
        "ref": "kekkaitiran.xls#事業一覧!169"
      },
      {
        "name": "介護保険対策事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "介護保険課",
        "ref": "kekkaitiran.xls#事業一覧!170"
      },
      {
        "name": "介護保険サービス事業",
        "grade": "A",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "高齢者福祉課",
        "ref": "kekkaitiran.xls#事業一覧!172"
      },
      {
        "name": "重度心身障害者医療費助成事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "障がい福祉課",
        "ref": "kekkaitiran.xls#事業一覧!173"
      },
      {
        "name": "障害児通所支援事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "障がい福祉課",
        "ref": "kekkaitiran.xls#事業一覧!174"
      },
      {
        "name": "自立支援サービス事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "障がい福祉課",
        "ref": "kekkaitiran.xls#事業一覧!175"
      },
      {
        "name": "自立支援医療事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "障がい福祉課",
        "ref": "kekkaitiran.xls#事業一覧!176"
      },
      {
        "name": "自立支援補装具事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "障がい福祉課",
        "ref": "kekkaitiran.xls#事業一覧!177"
      },
      {
        "name": "自立支援給付審査会事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "障がい福祉課",
        "ref": "kekkaitiran.xls#事業一覧!178"
      },
      {
        "name": "特別障害者手当等支給事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "障がい福祉課",
        "ref": "kekkaitiran.xls#事業一覧!179"
      },
      {
        "name": "心身障害児童福祉手当支給事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "障がい福祉課",
        "ref": "kekkaitiran.xls#事業一覧!180"
      },
      {
        "name": "障害者のすみよいまちづくり事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "障がい福祉課",
        "ref": "kekkaitiran.xls#事業一覧!181"
      },
      {
        "name": "地域生活支援事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "障がい福祉課",
        "ref": "kekkaitiran.xls#事業一覧!182"
      },
      {
        "name": "障害者センター事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "障がい福祉課",
        "ref": "kekkaitiran.xls#事業一覧!183"
      },
      {
        "name": "身体障害者福祉事務",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "障がい福祉課",
        "ref": "kekkaitiran.xls#事業一覧!184"
      },
      {
        "name": "行旅病人死亡人取扱事務",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "生活福祉課",
        "ref": "kekkaitiran.xls#事業一覧!185"
      },
      {
        "name": "生活保護総務事務",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "生活福祉課",
        "ref": "kekkaitiran.xls#事業一覧!186"
      },
      {
        "name": "中国残留邦人生活支援事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "生活福祉課",
        "ref": "kekkaitiran.xls#事業一覧!187"
      },
      {
        "name": "生活保護受給者就労支援事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "生活福祉課",
        "ref": "kekkaitiran.xls#事業一覧!188"
      },
      {
        "name": "生活保護適正実施推進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "生活福祉課",
        "ref": "kekkaitiran.xls#事業一覧!189"
      },
      {
        "name": "生活保護扶助事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "生活福祉課",
        "ref": "kekkaitiran.xls#事業一覧!190"
      },
      {
        "name": "国民健康保険事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市民部",
        "ka": "国民健康保険課",
        "ref": "kekkaitiran.xls#事業一覧!193"
      },
      {
        "name": "後期高齢者医療事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "高齢者福祉課",
        "ref": "kekkaitiran.xls#事業一覧!194"
      },
      {
        "name": "介護保険運営事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "介護保険課",
        "ref": "kekkaitiran.xls#事業一覧!195"
      },
      {
        "name": "国民年金事務",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市民部",
        "ka": "市民課",
        "ref": "kekkaitiran.xls#事業一覧!196"
      },
      {
        "name": "市民いこいの里管理事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "産業部",
        "ka": "雇用創生課",
        "ref": "kekkaitiran.xls#事業一覧!201"
      },
      {
        "name": "健康診査事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "健康衛生課",
        "ref": "kekkaitiran.xls#事業一覧!202"
      },
      {
        "name": "母子保健事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "子ども未来部",
        "ka": "母子保健課",
        "ref": "kekkaitiran.xls#事業一覧!205"
      },
      {
        "name": "地域医療連携事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市立甲府病院事務局",
        "ka": "総務課",
        "ref": "kekkaitiran.xls#事業一覧!207"
      },
      {
        "name": "医療機器等整備事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市立甲府病院事務局",
        "ka": "総務課",
        "ref": "kekkaitiran.xls#事業一覧!208"
      },
      {
        "name": "国民健康保険事業（直営診療）",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市民部",
        "ka": "国民健康保険課",
        "ref": "kekkaitiran.xls#事業一覧!209"
      },
      {
        "name": "地域医療センター管理事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "健康衛生課",
        "ref": "kekkaitiran.xls#事業一覧!212"
      },
      {
        "name": "都市公園等照明灯改修事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "建設部",
        "ka": "公園緑地課",
        "ref": "kekkaitiran.xls#事業一覧!214"
      },
      {
        "name": "都市美化事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "環境部",
        "ka": "収集課",
        "ref": "kekkaitiran.xls#事業一覧!215"
      },
      {
        "name": "環境対策事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "環境部",
        "ka": "環境保全課",
        "ref": "kekkaitiran.xls#事業一覧!216"
      },
      {
        "name": "森林保護事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "産業部",
        "ka": "林政課",
        "ref": "kekkaitiran.xls#事業一覧!217"
      },
      {
        "name": "動物園管理事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "建設部",
        "ka": "公園緑地課",
        "ref": "kekkaitiran.xls#事業一覧!222"
      },
      {
        "name": "都市公園管理事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "建設部",
        "ka": "公園緑地課",
        "ref": "kekkaitiran.xls#事業一覧!223"
      },
      {
        "name": "圃場管理事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "建設部",
        "ka": "公園緑地課",
        "ref": "kekkaitiran.xls#事業一覧!224"
      },
      {
        "name": "明るくきれいなまちづくり基金事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "環境部",
        "ka": "減量課",
        "ref": "kekkaitiran.xls#事業一覧!226"
      },
      {
        "name": "塵芥収集事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "環境部",
        "ka": "収集課",
        "ref": "kekkaitiran.xls#事業一覧!228"
      },
      {
        "name": "リサイクルプラザ管理運営事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "環境部",
        "ka": "減量課",
        "ref": "kekkaitiran.xls#事業一覧!229"
      },
      {
        "name": "最終処分場事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "環境部",
        "ka": "処理課",
        "ref": "kekkaitiran.xls#事業一覧!230"
      },
      {
        "name": "附属破砕工場事業",
        "grade": "F",
        "prevGrade": null,
        "budgetName": null,
        "bu": "環境部",
        "ka": "処理課",
        "ref": "kekkaitiran.xls#事業一覧!232"
      },
      {
        "name": "施設運営事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "環境部",
        "ka": "処理課",
        "ref": "kekkaitiran.xls#事業一覧!233"
      },
      {
        "name": "最終処分場建設事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "環境部",
        "ka": "処理課",
        "ref": "kekkaitiran.xls#事業一覧!234"
      },
      {
        "name": "環境センター地域環境整備事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "環境部",
        "ka": "総務課",
        "ref": "kekkaitiran.xls#事業一覧!235"
      },
      {
        "name": "甲府駅南口周辺地域修景計画事業",
        "grade": "F",
        "prevGrade": null,
        "budgetName": null,
        "bu": "建設部",
        "ka": "都市計画課",
        "ref": "kekkaitiran.xls#事業一覧!236"
      },
      {
        "name": "景観まちづくり推進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "建設部",
        "ka": "都市計画課",
        "ref": "kekkaitiran.xls#事業一覧!237"
      },
      {
        "name": "公営住宅整備事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "建設部",
        "ka": "住宅課",
        "ref": "kekkaitiran.xls#事業一覧!239"
      },
      {
        "name": "水源保全事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "上下水道局工務部",
        "ka": "水保全課",
        "ref": "kekkaitiran.xls#事業一覧!245"
      },
      {
        "name": "水質対策事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "上下水道局工務部",
        "ka": "水保全課浄水課",
        "ref": "kekkaitiran.xls#事業一覧!246"
      },
      {
        "name": "水質検査体制事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "上下水道局工務部",
        "ka": "浄水課",
        "ref": "kekkaitiran.xls#事業一覧!247"
      },
      {
        "name": "古関・梯町簡易水道事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "上下水道局工務部",
        "ka": "水保全課",
        "ref": "kekkaitiran.xls#事業一覧!249"
      },
      {
        "name": "簡易水道等事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "上下水道局工務部",
        "ka": "水保全課",
        "ref": "kekkaitiran.xls#事業一覧!250"
      },
      {
        "name": "浄水場等施設更新事業（管路施設を除く）",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "上下水道局工務部",
        "ka": "浄水課",
        "ref": "kekkaitiran.xls#事業一覧!252"
      },
      {
        "name": "経年管路更新（耐震化）事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "上下水道局工務部",
        "ka": "水道課",
        "ref": "kekkaitiran.xls#事業一覧!254"
      },
      {
        "name": "汚水管きょ整備事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "上下水道局工務部",
        "ka": "下水道課",
        "ref": "kekkaitiran.xls#事業一覧!255"
      },
      {
        "name": "下水道地震対策整備事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "上下水道局工務部",
        "ka": "下水道課浄化センター",
        "ref": "kekkaitiran.xls#事業一覧!257"
      },
      {
        "name": "甲府市浄化センター施設改築（更新）計画事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "上下水道局工務部",
        "ka": "浄化センター",
        "ref": "kekkaitiran.xls#事業一覧!259"
      },
      {
        "name": "ポンプ場施設改築（更新）計画事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "上下水道局工務部",
        "ka": "浄化センター",
        "ref": "kekkaitiran.xls#事業一覧!260"
      },
      {
        "name": "浄化槽事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "環境部",
        "ka": "環境保全課",
        "ref": "kekkaitiran.xls#事業一覧!261"
      },
      {
        "name": "生活排水対策事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "環境部",
        "ka": "環境保全課",
        "ref": "kekkaitiran.xls#事業一覧!262"
      },
      {
        "name": "農業集落排水事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "産業部",
        "ka": "農政課",
        "ref": "kekkaitiran.xls#事業一覧!263"
      },
      {
        "name": "し尿処理事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "環境部",
        "ka": "処理課",
        "ref": "kekkaitiran.xls#事業一覧!264"
      },
      {
        "name": "斎場管理事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "健康衛生課",
        "ref": "kekkaitiran.xls#事業一覧!265"
      },
      {
        "name": "つつじが崎霊園管理事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "建設部",
        "ka": "公園緑地課",
        "ref": "kekkaitiran.xls#事業一覧!266"
      },
      {
        "name": "公衆衛生事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "健康衛生課",
        "ref": "kekkaitiran.xls#事業一覧!269"
      },
      {
        "name": "在来鉄道の利便性向上事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "企画部",
        "ka": "交通政策課",
        "ref": "kekkaitiran.xls#事業一覧!273"
      },
      {
        "name": "城東三丁目敷島線整備事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "建設部",
        "ka": "都市計画課",
        "ref": "kekkaitiran.xls#事業一覧!274"
      },
      {
        "name": "高速交通体系整備事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "建設部",
        "ka": "都市計画課",
        "ref": "kekkaitiran.xls#事業一覧!275"
      },
      {
        "name": "和戸町竜王線整備事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "建設部",
        "ka": "都市整備課",
        "ref": "kekkaitiran.xls#事業一覧!277"
      },
      {
        "name": "都市整備事務",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "建設部",
        "ka": "都市整備課",
        "ref": "kekkaitiran.xls#事業一覧!279"
      },
      {
        "name": "市道側溝整備事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "建設部",
        "ka": "道路河川課",
        "ref": "kekkaitiran.xls#事業一覧!282"
      },
      {
        "name": "橋りょう整備事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "建設部",
        "ka": "道路河川課",
        "ref": "kekkaitiran.xls#事業一覧!284"
      },
      {
        "name": "橋りょう長寿命化修繕事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "建設部",
        "ka": "道路河川課",
        "ref": "kekkaitiran.xls#事業一覧!285"
      },
      {
        "name": "道路用地管理事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "建設部",
        "ka": "道路河川課",
        "ref": "kekkaitiran.xls#事業一覧!286"
      },
      {
        "name": "道路維持管理事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "建設部",
        "ka": "道路河川課",
        "ref": "kekkaitiran.xls#事業一覧!287"
      },
      {
        "name": "市道舗装（補修）事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "建設部",
        "ka": "道路河川課",
        "ref": "kekkaitiran.xls#事業一覧!288"
      },
      {
        "name": "落石防止柵設置事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "建設部",
        "ka": "道路河川課",
        "ref": "kekkaitiran.xls#事業一覧!289"
      },
      {
        "name": "濁川西地区整備事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "建設部",
        "ka": "都市整備課",
        "ref": "kekkaitiran.xls#事業一覧!291"
      },
      {
        "name": "都市計画事務",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "建設部",
        "ka": "都市計画課",
        "ref": "kekkaitiran.xls#事業一覧!292"
      },
      {
        "name": "土地開発指導事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "建設部",
        "ka": "都市計画課",
        "ref": "kekkaitiran.xls#事業一覧!293"
      },
      {
        "name": "建築指導事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "建設部",
        "ka": "建築指導課",
        "ref": "kekkaitiran.xls#事業一覧!294"
      },
      {
        "name": "地籍調査事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "建設部",
        "ka": "地籍調査課",
        "ref": "kekkaitiran.xls#事業一覧!297"
      },
      {
        "name": "地域集会施設整備助成事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市民部",
        "ka": "協働推進課",
        "ref": "kekkaitiran.xls#事業一覧!300"
      },
      {
        "name": "悠遊館等施設管理事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市民部",
        "ka": "協働推進課",
        "ref": "kekkaitiran.xls#事業一覧!303"
      },
      {
        "name": "広報推進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市民部",
        "ka": "ｼﾃｨﾌﾟﾛﾓｰｼｮﾝ課",
        "ref": "kekkaitiran.xls#事業一覧!304"
      },
      {
        "name": "広聴活動事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市民部",
        "ka": "協働推進課",
        "ref": "kekkaitiran.xls#事業一覧!305"
      },
      {
        "name": "広域行政推進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "企画部",
        "ka": "企画課",
        "ref": "kekkaitiran.xls#事業一覧!306"
      },
      {
        "name": "地域連携軸形成事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "企画部",
        "ka": "企画課",
        "ref": "kekkaitiran.xls#事業一覧!307"
      },
      {
        "name": "庁舎管理事務",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "総務部",
        "ka": "管財課",
        "ref": "kekkaitiran.xls#事業一覧!310"
      },
      {
        "name": "財産管理事務",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "総務部",
        "ka": "管財課",
        "ref": "kekkaitiran.xls#事業一覧!311"
      },
      {
        "name": "車両管理事務",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "総務部",
        "ka": "管財課",
        "ref": "kekkaitiran.xls#事業一覧!312"
      },
      {
        "name": "こうふ開府500年記念事業",
        "grade": "A",
        "prevGrade": null,
        "budgetName": null,
        "bu": "企画部",
        "ka": "開府500年企画課開府500年事業課",
        "ref": "kekkaitiran.xls#事業一覧!313"
      },
      {
        "name": "新事業形成事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "企画部",
        "ka": "企画課",
        "ref": "kekkaitiran.xls#事業一覧!315"
      },
      {
        "name": "個人番号制度管理事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市民部",
        "ka": "市民課",
        "ref": "kekkaitiran.xls#事業一覧!318"
      },
      {
        "name": "住居番号街区表示板整理事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市民部",
        "ka": "市民課",
        "ref": "kekkaitiran.xls#事業一覧!319"
      },
      {
        "name": "上九一色出張所事務",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市民部",
        "ka": "上九一色窓口センター",
        "ref": "kekkaitiran.xls#事業一覧!320"
      },
      {
        "name": "窓口センター事務",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市民部",
        "ka": "総務課",
        "ref": "kekkaitiran.xls#事業一覧!321"
      },
      {
        "name": "中道支所事務",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市民部",
        "ka": "中道窓口センター",
        "ref": "kekkaitiran.xls#事業一覧!322"
      },
      {
        "name": "企画事務",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "企画部",
        "ka": "総務課",
        "ref": "kekkaitiran.xls#事業一覧!323"
      },
      {
        "name": "市民税等滞納整理事務",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市民部",
        "ka": "滞納整理課",
        "ref": "kekkaitiran.xls#事業一覧!326"
      },
      {
        "name": "市民税等収納事務",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市民部",
        "ka": "収納課",
        "ref": "kekkaitiran.xls#事業一覧!327"
      },
      {
        "name": "市民税賦課事務",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市民部",
        "ka": "市民税課",
        "ref": "kekkaitiran.xls#事業一覧!328"
      },
      {
        "name": "固定資産税賦課事務",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市民部",
        "ka": "資産税課",
        "ref": "kekkaitiran.xls#事業一覧!329"
      },
      {
        "name": "財政管理事務",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "企画部",
        "ka": "財政課",
        "ref": "kekkaitiran.xls#事業一覧!331"
      },
      {
        "name": "公共施設等マネジメント推進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "総務部",
        "ka": "財産活用課",
        "ref": "kekkaitiran.xls#事業一覧!332"
      },
      {
        "name": "中核市移行推進事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "市長直轄組織",
        "ka": "中核市推進課",
        "ref": "kekkaitiran.xls#事業一覧!335"
      },
      {
        "name": "保健所準備事業",
        "grade": "B",
        "prevGrade": null,
        "budgetName": null,
        "bu": "福祉保健部",
        "ka": "保健所設置課",
        "ref": "kekkaitiran.xls#事業一覧!336"
      }
    ]
  }
];
