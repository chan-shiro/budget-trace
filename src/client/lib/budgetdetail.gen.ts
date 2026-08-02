// このファイルは自動生成です。手で編集しないこと。
// 再生成: bun run pipeline:derive（pipeline/derive-app-data.ts）
// **款より下（項・目）の内訳**。金額は億円（原典の千円値を 1e5 で割った正確値）。
// ⚠ 節・細節は載せていない（歳出の節は性質別区分で款項目の目的別とは軸が違う。parsed には在る）。
// ⚠ 一般会計のみ（parsed は全17会計を持つ）。

/** ⚠ prevV は資料によって null（CSV 版 R6〜R8 は当年度のみ。XLSX 版 R5〜R3 は前年度つき） */
export type BudgetDetailKo = { name: string; v: number; prevV: number | null; moku: { name: string; v: number; prevV: number | null }[] };
export type BudgetDetailYear = {
  fy: string;
  fyLabel: string;
  byKan: Record<"revenue" | "expenditure", Record<string, BudgetDetailKo[]>>;
  sourceTitle: string;
  localUrl: string;
  refLabel: string;
  originUrl: string;
  archiveUrl: string;
};

/** 団体コード → 年度（新しい順）。款ドリルの「項・目の内訳」が使う */
export const BUDGET_DETAIL: Record<string, BudgetDetailYear[]> = {
  "141003": [
    {
      "fy": "R8",
      "fyLabel": "令和8年度 当初予算",
      "byKan": {
        "revenue": {
          "市税": [
            {
              "name": "市民税",
              "v": 5499.65,
              "prevV": null,
              "moku": [
                {
                  "name": "個人",
                  "v": 4863,
                  "prevV": null
                },
                {
                  "name": "法人",
                  "v": 636.65,
                  "prevV": null
                }
              ]
            },
            {
              "name": "固定資産税",
              "v": 3114.32,
              "prevV": null,
              "moku": [
                {
                  "name": "固定資産税",
                  "v": 3105.33,
                  "prevV": null
                },
                {
                  "name": "国有資産等所在市町村交付金及び納付金",
                  "v": 8.99,
                  "prevV": null
                }
              ]
            },
            {
              "name": "都市計画税",
              "v": 675.89,
              "prevV": null,
              "moku": [
                {
                  "name": "都市計画税",
                  "v": 675.89,
                  "prevV": null
                }
              ]
            },
            {
              "name": "市たばこ税",
              "v": 230.87,
              "prevV": null,
              "moku": [
                {
                  "name": "市たばこ税",
                  "v": 230.87,
                  "prevV": null
                }
              ]
            },
            {
              "name": "事業所税",
              "v": 202.03,
              "prevV": null,
              "moku": [
                {
                  "name": "事業所税",
                  "v": 202.03,
                  "prevV": null
                }
              ]
            },
            {
              "name": "軽自動車税",
              "v": 35.36,
              "prevV": null,
              "moku": [
                {
                  "name": "種別割",
                  "v": 34.68,
                  "prevV": null
                },
                {
                  "name": "環境性能割",
                  "v": 0.68,
                  "prevV": null
                }
              ]
            },
            {
              "name": "入湯税",
              "v": 0.85,
              "prevV": null,
              "moku": [
                {
                  "name": "入湯税",
                  "v": 0.85,
                  "prevV": null
                }
              ]
            }
          ],
          "地方譲与税": [
            {
              "name": "自動車重量譲与税",
              "v": 50.17,
              "prevV": null,
              "moku": [
                {
                  "name": "自動車重量譲与税",
                  "v": 50.17,
                  "prevV": null
                }
              ]
            },
            {
              "name": "地方揮発油譲与税",
              "v": 22.16,
              "prevV": null,
              "moku": [
                {
                  "name": "地方揮発油譲与税",
                  "v": 22.16,
                  "prevV": null
                }
              ]
            },
            {
              "name": "特別とん譲与税",
              "v": 10.15,
              "prevV": null,
              "moku": [
                {
                  "name": "特別とん譲与税",
                  "v": 10.15,
                  "prevV": null
                }
              ]
            },
            {
              "name": "森林環境譲与税",
              "v": 4.6,
              "prevV": null,
              "moku": [
                {
                  "name": "森林環境譲与税",
                  "v": 4.6,
                  "prevV": null
                }
              ]
            },
            {
              "name": "石油ガス譲与税",
              "v": 0.19,
              "prevV": null,
              "moku": [
                {
                  "name": "石油ガス譲与税",
                  "v": 0.19,
                  "prevV": null
                }
              ]
            }
          ],
          "利子割交付金": [
            {
              "name": "利子割交付金",
              "v": 19.88,
              "prevV": null,
              "moku": [
                {
                  "name": "利子割交付金",
                  "v": 19.88,
                  "prevV": null
                }
              ]
            }
          ],
          "配当割交付金": [
            {
              "name": "配当割交付金",
              "v": 94.53,
              "prevV": null,
              "moku": [
                {
                  "name": "配当割交付金",
                  "v": 94.53,
                  "prevV": null
                }
              ]
            }
          ],
          "株式等譲渡所得割交付金": [
            {
              "name": "株式等譲渡所得割交付金",
              "v": 126.66,
              "prevV": null,
              "moku": [
                {
                  "name": "株式等譲渡所得割交付金",
                  "v": 126.66,
                  "prevV": null
                }
              ]
            }
          ],
          "分離課税所得割交付金": [
            {
              "name": "分離課税所得割交付金",
              "v": 14.06,
              "prevV": null,
              "moku": [
                {
                  "name": "分離課税所得割交付金",
                  "v": 14.06,
                  "prevV": null
                }
              ]
            }
          ],
          "法人事業税交付金": [
            {
              "name": "法人事業税交付金",
              "v": 107.6,
              "prevV": null,
              "moku": [
                {
                  "name": "法人事業税交付金",
                  "v": 107.6,
                  "prevV": null
                }
              ]
            }
          ],
          "地方消費税交付金": [
            {
              "name": "地方消費税交付金",
              "v": 1073.01,
              "prevV": null,
              "moku": [
                {
                  "name": "地方消費税交付金",
                  "v": 1073.01,
                  "prevV": null
                }
              ]
            }
          ],
          "ゴルフ場利用税交付金": [
            {
              "name": "ゴルフ場利用税交付金",
              "v": 1.55,
              "prevV": null,
              "moku": [
                {
                  "name": "ゴルフ場利用税交付金",
                  "v": 1.55,
                  "prevV": null
                }
              ]
            }
          ],
          "環境性能割交付金": [
            {
              "name": "環境性能割交付金",
              "v": 0.0002,
              "prevV": null,
              "moku": [
                {
                  "name": "環境性能割交付金",
                  "v": 0.00019,
                  "prevV": null
                },
                {
                  "name": "旧法による自動車取得税交付金",
                  "v": 0.00001,
                  "prevV": null
                }
              ]
            }
          ],
          "軽油引取税交付金": [
            {
              "name": "軽油引取税交付金",
              "v": 76.5698,
              "prevV": null,
              "moku": [
                {
                  "name": "軽油引取税交付金",
                  "v": 76.5598,
                  "prevV": null
                },
                {
                  "name": "旧法による軽油引取税交付金",
                  "v": 0.01,
                  "prevV": null
                }
              ]
            }
          ],
          "国有提供施設等所在市町村助成交付金": [
            {
              "name": "国有提供施設等所在市町村助成交付金",
              "v": 5,
              "prevV": null,
              "moku": [
                {
                  "name": "国有提供施設等所在市町村助成交付金",
                  "v": 5,
                  "prevV": null
                }
              ]
            }
          ],
          "地方特例交付金": [
            {
              "name": "地方特例交付金",
              "v": 121.9,
              "prevV": null,
              "moku": [
                {
                  "name": "地方特例交付金",
                  "v": 121.9,
                  "prevV": null
                }
              ]
            },
            {
              "name": "新型コロナウイルス感染症対策地方税減収補填特別交付金",
              "v": 0.11,
              "prevV": null,
              "moku": [
                {
                  "name": "新型コロナウイルス感染症対策地方税減収補填特別交付金",
                  "v": 0.11,
                  "prevV": null
                }
              ]
            }
          ],
          "地方交付税": [
            {
              "name": "地方交付税",
              "v": 280,
              "prevV": null,
              "moku": [
                {
                  "name": "地方交付税",
                  "v": 280,
                  "prevV": null
                }
              ]
            }
          ],
          "交通安全対策特別交付金": [
            {
              "name": "交通安全対策特別交付金",
              "v": 6.55,
              "prevV": null,
              "moku": [
                {
                  "name": "交通安全対策特別交付金",
                  "v": 6.55,
                  "prevV": null
                }
              ]
            }
          ],
          "分担金及び負担金": [
            {
              "name": "負担金",
              "v": 224.68794,
              "prevV": null,
              "moku": [
                {
                  "name": "こども青少年費負担金",
                  "v": 103.20408,
                  "prevV": null
                },
                {
                  "name": "教育費負担金",
                  "v": 63.62211,
                  "prevV": null
                },
                {
                  "name": "健康福祉費負担金",
                  "v": 47.83784,
                  "prevV": null
                },
                {
                  "name": "道路費負担金",
                  "v": 8.64559,
                  "prevV": null
                },
                {
                  "name": "港湾費負担金",
                  "v": 1.00517,
                  "prevV": null
                },
                {
                  "name": "資源循環費負担金",
                  "v": 0.139,
                  "prevV": null
                },
                {
                  "name": "総務費負担金",
                  "v": 0.1,
                  "prevV": null
                },
                {
                  "name": "市民費負担金",
                  "v": 0.1,
                  "prevV": null
                },
                {
                  "name": "消防費負担金",
                  "v": 0.02281,
                  "prevV": null
                },
                {
                  "name": "河川費負担金",
                  "v": 0.01134,
                  "prevV": null
                }
              ]
            }
          ],
          "使用料及び手数料": [
            {
              "name": "使用料",
              "v": 395.82135,
              "prevV": null,
              "moku": [
                {
                  "name": "建築使用料",
                  "v": 109.92561,
                  "prevV": null
                },
                {
                  "name": "港湾使用料",
                  "v": 104.2845,
                  "prevV": null
                },
                {
                  "name": "道路使用料",
                  "v": 71.98361,
                  "prevV": null
                },
                {
                  "name": "こども青少年使用料",
                  "v": 69.02879,
                  "prevV": null
                },
                {
                  "name": "みどり環境使用料",
                  "v": 13.65044,
                  "prevV": null
                },
                {
                  "name": "健康福祉使用料",
                  "v": 12.54153,
                  "prevV": null
                },
                {
                  "name": "教育使用料",
                  "v": 8.90432,
                  "prevV": null
                },
                {
                  "name": "総務使用料",
                  "v": 2.17465,
                  "prevV": null
                },
                {
                  "name": "河川使用料",
                  "v": 1.68759,
                  "prevV": null
                },
                {
                  "name": "消防使用料",
                  "v": 0.72831,
                  "prevV": null
                },
                {
                  "name": "市民使用料",
                  "v": 0.40055,
                  "prevV": null
                },
                {
                  "name": "にぎわいスポーツ文化使用料",
                  "v": 0.36763,
                  "prevV": null
                },
                {
                  "name": "経済使用料",
                  "v": 0.11594,
                  "prevV": null
                },
                {
                  "name": "医療使用料",
                  "v": 0.02788,
                  "prevV": null
                }
              ]
            },
            {
              "name": "手数料",
              "v": 105.65605,
              "prevV": null,
              "moku": [
                {
                  "name": "資源循環手数料",
                  "v": 55.3633,
                  "prevV": null
                },
                {
                  "name": "道路手数料",
                  "v": 23.23096,
                  "prevV": null
                },
                {
                  "name": "市民手数料",
                  "v": 16.35875,
                  "prevV": null
                },
                {
                  "name": "医療手数料",
                  "v": 3.2008,
                  "prevV": null
                },
                {
                  "name": "建築手数料",
                  "v": 2.31462,
                  "prevV": null
                },
                {
                  "name": "総務手数料",
                  "v": 2.05942,
                  "prevV": null
                },
                {
                  "name": "消防手数料",
                  "v": 1.94505,
                  "prevV": null
                },
                {
                  "name": "都市整備手数料",
                  "v": 0.83946,
                  "prevV": null
                },
                {
                  "name": "教育手数料",
                  "v": 0.23081,
                  "prevV": null
                },
                {
                  "name": "経済手数料",
                  "v": 0.09,
                  "prevV": null
                },
                {
                  "name": "健康福祉手数料",
                  "v": 0.01273,
                  "prevV": null
                },
                {
                  "name": "みどり環境手数料",
                  "v": 0.01006,
                  "prevV": null
                },
                {
                  "name": "港湾手数料",
                  "v": 0.00006,
                  "prevV": null
                },
                {
                  "name": "こども青少年手数料",
                  "v": 0.00003,
                  "prevV": null
                }
              ]
            }
          ],
          "国庫支出金": [
            {
              "name": "国庫負担金",
              "v": 3667.56458,
              "prevV": null,
              "moku": [
                {
                  "name": "健康福祉費国庫負担金",
                  "v": 1691.03,
                  "prevV": null
                },
                {
                  "name": "こども青少年費国庫負担金",
                  "v": 1521.63989,
                  "prevV": null
                },
                {
                  "name": "教育費国庫負担金",
                  "v": 448.74282,
                  "prevV": null
                },
                {
                  "name": "医療費国庫負担金",
                  "v": 5.93314,
                  "prevV": null
                },
                {
                  "name": "消防費国庫負担金",
                  "v": 0.21873,
                  "prevV": null
                }
              ]
            },
            {
              "name": "国庫補助金",
              "v": 811.87297,
              "prevV": null,
              "moku": [
                {
                  "name": "こども青少年費国庫補助金",
                  "v": 186.94298,
                  "prevV": null
                },
                {
                  "name": "道路費国庫補助金",
                  "v": 126.19963,
                  "prevV": null
                },
                {
                  "name": "健康福祉費国庫補助金",
                  "v": 102.61521,
                  "prevV": null
                },
                {
                  "name": "教育費国庫補助金",
                  "v": 94.93548,
                  "prevV": null
                },
                {
                  "name": "建築費国庫補助金",
                  "v": 65.23793,
                  "prevV": null
                },
                {
                  "name": "市民費国庫補助金",
                  "v": 63.16726,
                  "prevV": null
                },
                {
                  "name": "総務費国庫補助金",
                  "v": 61.49413,
                  "prevV": null
                },
                {
                  "name": "物価高騰対応重点支援地方創生臨時交付金",
                  "v": 30.12541,
                  "prevV": null
                },
                {
                  "name": "資源循環費国庫補助金",
                  "v": 29.48654,
                  "prevV": null
                },
                {
                  "name": "みどり環境費国庫補助金",
                  "v": 20.38989,
                  "prevV": null
                },
                {
                  "name": "都市整備費国庫補助金",
                  "v": 7.97087,
                  "prevV": null
                },
                {
                  "name": "医療費国庫補助金",
                  "v": 7.59328,
                  "prevV": null
                },
                {
                  "name": "地域未来交付金",
                  "v": 7.31159,
                  "prevV": null
                },
                {
                  "name": "河川費国庫補助金",
                  "v": 4.46904,
                  "prevV": null
                },
                {
                  "name": "消防費国庫補助金",
                  "v": 2.33403,
                  "prevV": null
                },
                {
                  "name": "港湾費国庫補助金",
                  "v": 0.8907,
                  "prevV": null
                },
                {
                  "name": "にぎわいスポーツ文化費国庫補助金",
                  "v": 0.64,
                  "prevV": null
                },
                {
                  "name": "経済費国庫補助金",
                  "v": 0.069,
                  "prevV": null
                }
              ]
            },
            {
              "name": "国庫委託金",
              "v": 13.36959,
              "prevV": null,
              "moku": [
                {
                  "name": "健康福祉費国庫委託金",
                  "v": 9.63451,
                  "prevV": null
                },
                {
                  "name": "教育費国庫委託金",
                  "v": 1.5002,
                  "prevV": null
                },
                {
                  "name": "経済費国庫委託金",
                  "v": 1.17247,
                  "prevV": null
                },
                {
                  "name": "市民費国庫委託金",
                  "v": 0.5004,
                  "prevV": null
                },
                {
                  "name": "こども青少年費国庫委託金",
                  "v": 0.27419,
                  "prevV": null
                },
                {
                  "name": "医療費国庫委託金",
                  "v": 0.26272,
                  "prevV": null
                },
                {
                  "name": "みどり環境費国庫委託金",
                  "v": 0.018,
                  "prevV": null
                },
                {
                  "name": "都市整備費国庫委託金",
                  "v": 0.0071,
                  "prevV": null
                }
              ]
            }
          ],
          "県支出金": [
            {
              "name": "県負担金",
              "v": 852.4166,
              "prevV": null,
              "moku": [
                {
                  "name": "こども青少年費県負担金",
                  "v": 435.19661,
                  "prevV": null
                },
                {
                  "name": "健康福祉費県負担金",
                  "v": 413.04165,
                  "prevV": null
                },
                {
                  "name": "総務費県負担金",
                  "v": 2.89,
                  "prevV": null
                },
                {
                  "name": "みどり環境費県負担金",
                  "v": 0.64135,
                  "prevV": null
                },
                {
                  "name": "医療費県負担金",
                  "v": 0.57589,
                  "prevV": null
                },
                {
                  "name": "道路費県負担金",
                  "v": 0.0648,
                  "prevV": null
                },
                {
                  "name": "市民費県負担金",
                  "v": 0.004,
                  "prevV": null
                },
                {
                  "name": "建築費県負担金",
                  "v": 0.0023,
                  "prevV": null
                }
              ]
            },
            {
              "name": "県補助金",
              "v": 352.65596,
              "prevV": null,
              "moku": [
                {
                  "name": "健康福祉費県補助金",
                  "v": 133.88234,
                  "prevV": null
                },
                {
                  "name": "こども青少年費県補助金",
                  "v": 109.47956,
                  "prevV": null
                },
                {
                  "name": "教育費県補助金",
                  "v": 94.14446,
                  "prevV": null
                },
                {
                  "name": "消防費県補助金",
                  "v": 4.95502,
                  "prevV": null
                },
                {
                  "name": "河川費県補助金",
                  "v": 3.46904,
                  "prevV": null
                },
                {
                  "name": "道路費県補助金",
                  "v": 2,
                  "prevV": null
                },
                {
                  "name": "建築費県補助金",
                  "v": 1.42268,
                  "prevV": null
                },
                {
                  "name": "みどり環境費県補助金",
                  "v": 1.11805,
                  "prevV": null
                },
                {
                  "name": "医療費県補助金",
                  "v": 0.94411,
                  "prevV": null
                },
                {
                  "name": "市民費県補助金",
                  "v": 0.69776,
                  "prevV": null
                },
                {
                  "name": "経済費県補助金",
                  "v": 0.37291,
                  "prevV": null
                },
                {
                  "name": "総務費県補助金",
                  "v": 0.10253,
                  "prevV": null
                },
                {
                  "name": "港湾費県補助金",
                  "v": 0.0675,
                  "prevV": null
                }
              ]
            },
            {
              "name": "県委託金",
              "v": 79.37306,
              "prevV": null,
              "moku": [
                {
                  "name": "総務費県委託金",
                  "v": 78.84518,
                  "prevV": null
                },
                {
                  "name": "健康福祉費県委託金",
                  "v": 0.47718,
                  "prevV": null
                },
                {
                  "name": "みどり環境費県委託金",
                  "v": 0.01886,
                  "prevV": null
                },
                {
                  "name": "港湾費県委託金",
                  "v": 0.0129,
                  "prevV": null
                },
                {
                  "name": "医療費県委託金",
                  "v": 0.00894,
                  "prevV": null
                },
                {
                  "name": "こども青少年費県委託金",
                  "v": 0.0075,
                  "prevV": null
                },
                {
                  "name": "教育費県委託金",
                  "v": 0.0025,
                  "prevV": null
                }
              ]
            }
          ],
          "財産収入": [
            {
              "name": "財産運用収入",
              "v": 75.94119,
              "prevV": null,
              "moku": [
                {
                  "name": "財産貸付収入",
                  "v": 70.12665,
                  "prevV": null
                },
                {
                  "name": "利子及び配当金",
                  "v": 5.81454,
                  "prevV": null
                }
              ]
            },
            {
              "name": "財産売払収入",
              "v": 57.47798,
              "prevV": null,
              "moku": [
                {
                  "name": "不動産売払収入",
                  "v": 56.7916,
                  "prevV": null
                },
                {
                  "name": "物品売払収入",
                  "v": 0.65933,
                  "prevV": null
                },
                {
                  "name": "生産物売払収入",
                  "v": 0.02705,
                  "prevV": null
                }
              ]
            }
          ],
          "寄附金": [
            {
              "name": "寄附金",
              "v": 78.12501,
              "prevV": null,
              "moku": [
                {
                  "name": "一般寄附金",
                  "v": 76.09021,
                  "prevV": null
                },
                {
                  "name": "指定寄附金",
                  "v": 2.0348,
                  "prevV": null
                }
              ]
            }
          ],
          "繰入金": [
            {
              "name": "基金繰入金",
              "v": 464.85992,
              "prevV": null,
              "moku": [
                {
                  "name": "財政調整基金繰入金",
                  "v": 273,
                  "prevV": null
                },
                {
                  "name": "減債基金繰入金",
                  "v": 100,
                  "prevV": null
                },
                {
                  "name": "資産活用推進基金繰入金",
                  "v": 43.21726,
                  "prevV": null
                },
                {
                  "name": "GREEN×EXPO 2027推進基金繰入金",
                  "v": 36.42883,
                  "prevV": null
                },
                {
                  "name": "学校施設整備基金繰入金",
                  "v": 4,
                  "prevV": null
                },
                {
                  "name": "社会福祉基金繰入金",
                  "v": 2.62039,
                  "prevV": null
                },
                {
                  "name": "災害救助基金繰入金",
                  "v": 1.8,
                  "prevV": null
                },
                {
                  "name": "環境保全基金繰入金",
                  "v": 1.01387,
                  "prevV": null
                },
                {
                  "name": "スポーツ基金繰入金",
                  "v": 0.855,
                  "prevV": null
                },
                {
                  "name": "市民活動推進基金繰入金",
                  "v": 0.76185,
                  "prevV": null
                },
                {
                  "name": "都市整備基金繰入金",
                  "v": 0.43252,
                  "prevV": null
                },
                {
                  "name": "動物園基金繰入金",
                  "v": 0.24,
                  "prevV": null
                },
                {
                  "name": "世界を目指す若者応援基金繰入金",
                  "v": 0.2102,
                  "prevV": null
                },
                {
                  "name": "文化基金繰入金",
                  "v": 0.1,
                  "prevV": null
                },
                {
                  "name": "協働の森基金繰入金",
                  "v": 0.1,
                  "prevV": null
                },
                {
                  "name": "区づくり推進基金繰入金",
                  "v": 0.08,
                  "prevV": null
                }
              ]
            },
            {
              "name": "他会計繰入金",
              "v": 41.35225,
              "prevV": null,
              "moku": [
                {
                  "name": "下水道事業会計繰入金",
                  "v": 40,
                  "prevV": null
                },
                {
                  "name": "母子父子寡婦福祉資金会計繰入金",
                  "v": 1.35225,
                  "prevV": null
                }
              ]
            }
          ],
          "繰越金": [
            {
              "name": "繰越金",
              "v": 0.00001,
              "prevV": null,
              "moku": [
                {
                  "name": "繰越金",
                  "v": 0.00001,
                  "prevV": null
                }
              ]
            }
          ],
          "諸収入": [
            {
              "name": "預託金元利収入",
              "v": 348.21,
              "prevV": null,
              "moku": [
                {
                  "name": "経済費預託金元利収入",
                  "v": 348.01,
                  "prevV": null
                },
                {
                  "name": "みどり環境費預託金元利収入",
                  "v": 0.2,
                  "prevV": null
                }
              ]
            },
            {
              "name": "雑入",
              "v": 192.74651,
              "prevV": null,
              "moku": [
                {
                  "name": "資源循環費雑入",
                  "v": 69.93179,
                  "prevV": null
                },
                {
                  "name": "健康福祉費雑入",
                  "v": 44.29808,
                  "prevV": null
                },
                {
                  "name": "総務費雑入",
                  "v": 35.93689,
                  "prevV": null
                },
                {
                  "name": "こども青少年費雑入",
                  "v": 10.07907,
                  "prevV": null
                },
                {
                  "name": "港湾費雑入",
                  "v": 7.21817,
                  "prevV": null
                },
                {
                  "name": "雑入",
                  "v": 5.95847,
                  "prevV": null
                },
                {
                  "name": "道路費雑入",
                  "v": 3.26548,
                  "prevV": null
                },
                {
                  "name": "経済費雑入",
                  "v": 3.09181,
                  "prevV": null
                },
                {
                  "name": "みどり環境費雑入",
                  "v": 2.78944,
                  "prevV": null
                },
                {
                  "name": "建築費雑入",
                  "v": 2.60383,
                  "prevV": null
                },
                {
                  "name": "消防費雑入",
                  "v": 2.49479,
                  "prevV": null
                },
                {
                  "name": "市民費雑入",
                  "v": 2.14628,
                  "prevV": null
                },
                {
                  "name": "教育費雑入",
                  "v": 1.46795,
                  "prevV": null
                },
                {
                  "name": "都市整備費雑入",
                  "v": 1.13213,
                  "prevV": null
                },
                {
                  "name": "にぎわいスポーツ文化費雑入",
                  "v": 0.3123,
                  "prevV": null
                },
                {
                  "name": "医療費雑入",
                  "v": 0.02,
                  "prevV": null
                },
                {
                  "name": "河川費雑入",
                  "v": 0.00003,
                  "prevV": null
                }
              ]
            },
            {
              "name": "収益事業収入",
              "v": 110,
              "prevV": null,
              "moku": [
                {
                  "name": "宝くじ収入",
                  "v": 110,
                  "prevV": null
                }
              ]
            },
            {
              "name": "貸付金元利収入",
              "v": 39.31181,
              "prevV": null,
              "moku": [
                {
                  "name": "総務費貸付金元利収入",
                  "v": 21.33013,
                  "prevV": null
                },
                {
                  "name": "にぎわいスポーツ文化費貸付金元利収入",
                  "v": 9.42599,
                  "prevV": null
                },
                {
                  "name": "道路費貸付金元利収入",
                  "v": 7,
                  "prevV": null
                },
                {
                  "name": "港湾費貸付金元利収入",
                  "v": 1.01285,
                  "prevV": null
                },
                {
                  "name": "建築費貸付金元利収入",
                  "v": 0.44313,
                  "prevV": null
                },
                {
                  "name": "市民費貸付金元利収入",
                  "v": 0.055,
                  "prevV": null
                },
                {
                  "name": "経済費貸付金元利収入",
                  "v": 0.02681,
                  "prevV": null
                },
                {
                  "name": "教育費貸付金元利収入",
                  "v": 0.01186,
                  "prevV": null
                },
                {
                  "name": "健康福祉費貸付金元利収入",
                  "v": 0.00604,
                  "prevV": null
                }
              ]
            },
            {
              "name": "延滞金、加算金及び過料",
              "v": 2.53194,
              "prevV": null,
              "moku": [
                {
                  "name": "延滞金",
                  "v": 2.49182,
                  "prevV": null
                },
                {
                  "name": "過料",
                  "v": 0.04011,
                  "prevV": null
                },
                {
                  "name": "加算金",
                  "v": 0.00001,
                  "prevV": null
                }
              ]
            },
            {
              "name": "市預金利子",
              "v": 0.52,
              "prevV": null,
              "moku": [
                {
                  "name": "市預金利子",
                  "v": 0.52,
                  "prevV": null
                }
              ]
            },
            {
              "name": "収納資金貸付金元利収入",
              "v": 0.36652,
              "prevV": null,
              "moku": [
                {
                  "name": "市民費収納資金貸付金元利収入",
                  "v": 0.2409,
                  "prevV": null
                },
                {
                  "name": "総務費収納資金貸付金元利収入",
                  "v": 0.09552,
                  "prevV": null
                },
                {
                  "name": "資源循環費収納資金貸付金元利収入",
                  "v": 0.0101,
                  "prevV": null
                },
                {
                  "name": "建築費収納資金貸付金元利収入",
                  "v": 0.01,
                  "prevV": null
                },
                {
                  "name": "教育費収納資金貸付金元利収入",
                  "v": 0.0044,
                  "prevV": null
                },
                {
                  "name": "健康福祉費収納資金貸付金元利収入",
                  "v": 0.0033,
                  "prevV": null
                },
                {
                  "name": "みどり環境費収納資金貸付金元利収入",
                  "v": 0.0014,
                  "prevV": null
                },
                {
                  "name": "医療費収納資金貸付金元利収入",
                  "v": 0.0008,
                  "prevV": null
                },
                {
                  "name": "港湾費収納資金貸付金元利収入",
                  "v": 0.0001,
                  "prevV": null
                }
              ]
            }
          ],
          "市債": [
            {
              "name": "市債",
              "v": 1304.9,
              "prevV": null,
              "moku": [
                {
                  "name": "教育債",
                  "v": 356.03,
                  "prevV": null
                },
                {
                  "name": "健康福祉債",
                  "v": 218.92,
                  "prevV": null
                },
                {
                  "name": "道路債",
                  "v": 161.13,
                  "prevV": null
                },
                {
                  "name": "総務債",
                  "v": 134.89,
                  "prevV": null
                },
                {
                  "name": "建築債",
                  "v": 97.79,
                  "prevV": null
                },
                {
                  "name": "諸支出債",
                  "v": 69.45,
                  "prevV": null
                },
                {
                  "name": "資源循環債",
                  "v": 64.08,
                  "prevV": null
                },
                {
                  "name": "みどり環境債",
                  "v": 63.75,
                  "prevV": null
                },
                {
                  "name": "港湾債",
                  "v": 41.21,
                  "prevV": null
                },
                {
                  "name": "消防債",
                  "v": 28.91,
                  "prevV": null
                },
                {
                  "name": "都市整備債",
                  "v": 26.62,
                  "prevV": null
                },
                {
                  "name": "市民債",
                  "v": 11.84,
                  "prevV": null
                },
                {
                  "name": "こども青少年債",
                  "v": 9.79,
                  "prevV": null
                },
                {
                  "name": "にぎわいスポーツ文化債",
                  "v": 8.09,
                  "prevV": null
                },
                {
                  "name": "河川債",
                  "v": 7.9,
                  "prevV": null
                },
                {
                  "name": "医療債",
                  "v": 4.5,
                  "prevV": null
                }
              ]
            }
          ]
        },
        "expenditure": {
          "議会費": [
            {
              "name": "議会費",
              "v": 32.04636,
              "prevV": null,
              "moku": [
                {
                  "name": "議会費",
                  "v": 32.04636,
                  "prevV": null
                }
              ]
            }
          ],
          "総務費": [
            {
              "name": "総務費",
              "v": 575.36623,
              "prevV": null,
              "moku": [
                {
                  "name": "行政運営費",
                  "v": 265.79059,
                  "prevV": null
                },
                {
                  "name": "人事管理費",
                  "v": 169.9526,
                  "prevV": null
                },
                {
                  "name": "デジタル統括推進費",
                  "v": 111.05703,
                  "prevV": null
                },
                {
                  "name": "危機管理費",
                  "v": 28.56601,
                  "prevV": null
                }
              ]
            },
            {
              "name": "税務費",
              "v": 172.84118,
              "prevV": null,
              "moku": [
                {
                  "name": "税務管理費",
                  "v": 94.87543,
                  "prevV": null
                },
                {
                  "name": "賦課徴収費",
                  "v": 77.96575,
                  "prevV": null
                }
              ]
            },
            {
              "name": "財政費",
              "v": 167.23863,
              "prevV": null,
              "moku": [
                {
                  "name": "財政運営費",
                  "v": 164.31951,
                  "prevV": null
                },
                {
                  "name": "ファシリティマネジメント推進費",
                  "v": 2.91912,
                  "prevV": null
                }
              ]
            },
            {
              "name": "GREEN×EXPO推進事業費",
              "v": 123.16335,
              "prevV": null,
              "moku": [
                {
                  "name": "GREEN×EXPO会場建設等事業費",
                  "v": 86.97215,
                  "prevV": null
                },
                {
                  "name": "GREEN×EXPO推進事業費",
                  "v": 36.1912,
                  "prevV": null
                }
              ]
            },
            {
              "name": "公園整備費",
              "v": 111.28109,
              "prevV": null,
              "moku": [
                {
                  "name": "公園整備費",
                  "v": 111.28109,
                  "prevV": null
                }
              ]
            },
            {
              "name": "脱炭素推進費",
              "v": 78.55208,
              "prevV": null,
              "moku": [
                {
                  "name": "脱炭素推進費",
                  "v": 78.55208,
                  "prevV": null
                }
              ]
            },
            {
              "name": "政策経営費",
              "v": 66.58127,
              "prevV": null,
              "moku": [
                {
                  "name": "政策経営推進費",
                  "v": 64.49467,
                  "prevV": null
                },
                {
                  "name": "統計情報費",
                  "v": 2.0866,
                  "prevV": null
                }
              ]
            },
            {
              "name": "周辺道路整備費",
              "v": 35.59783,
              "prevV": null,
              "moku": [
                {
                  "name": "周辺道路整備費",
                  "v": 35.59783,
                  "prevV": null
                }
              ]
            },
            {
              "name": "交通輸送対策費",
              "v": 34.40647,
              "prevV": null,
              "moku": [
                {
                  "name": "交通輸送対策費",
                  "v": 34.40647,
                  "prevV": null
                }
              ]
            },
            {
              "name": "会計管理費",
              "v": 26.70943,
              "prevV": null,
              "moku": [
                {
                  "name": "会計管理費",
                  "v": 26.70943,
                  "prevV": null
                }
              ]
            },
            {
              "name": "国際費",
              "v": 18.16006,
              "prevV": null,
              "moku": [
                {
                  "name": "国際費",
                  "v": 18.16006,
                  "prevV": null
                }
              ]
            },
            {
              "name": "選挙費",
              "v": 17.25246,
              "prevV": null,
              "moku": [
                {
                  "name": "選挙管理委員会費",
                  "v": 9.85461,
                  "prevV": null
                },
                {
                  "name": "統一地方選挙費",
                  "v": 7.39785,
                  "prevV": null
                }
              ]
            },
            {
              "name": "監査費",
              "v": 4.8357,
              "prevV": null,
              "moku": [
                {
                  "name": "監査委員費",
                  "v": 4.66065,
                  "prevV": null
                },
                {
                  "name": "外部監査費",
                  "v": 0.17505,
                  "prevV": null
                }
              ]
            },
            {
              "name": "人事委員会費",
              "v": 3.50405,
              "prevV": null,
              "moku": [
                {
                  "name": "人事委員会費",
                  "v": 3.50405,
                  "prevV": null
                }
              ]
            }
          ],
          "市民費": [
            {
              "name": "地域行政費",
              "v": 289.52146,
              "prevV": null,
              "moku": [
                {
                  "name": "個性ある区づくり推進費",
                  "v": 181.22675,
                  "prevV": null
                },
                {
                  "name": "戸籍住民登録費",
                  "v": 88.19308,
                  "prevV": null
                },
                {
                  "name": "地域施設費",
                  "v": 20.10163,
                  "prevV": null
                }
              ]
            },
            {
              "name": "市民行政費",
              "v": 167.68155,
              "prevV": null,
              "moku": [
                {
                  "name": "市民総務費",
                  "v": 141.18946,
                  "prevV": null
                },
                {
                  "name": "市民協働推進費",
                  "v": 26.0489,
                  "prevV": null
                },
                {
                  "name": "人権施策推進費",
                  "v": 0.44319,
                  "prevV": null
                }
              ]
            }
          ],
          "にぎわいスポーツ文化費": [
            {
              "name": "にぎわいスポーツ文化費",
              "v": 171.60109,
              "prevV": null,
              "moku": [
                {
                  "name": "にぎわい観光ＭＩＣＥ振興費",
                  "v": 65.9153,
                  "prevV": null
                },
                {
                  "name": "スポーツ振興費",
                  "v": 45.88061,
                  "prevV": null
                },
                {
                  "name": "文化芸術創造都市推進費",
                  "v": 44.69092,
                  "prevV": null
                },
                {
                  "name": "にぎわい総務費",
                  "v": 15.11426,
                  "prevV": null
                }
              ]
            }
          ],
          "経済費": [
            {
              "name": "経済費",
              "v": 453.40124,
              "prevV": null,
              "moku": [
                {
                  "name": "中小企業金融対策費",
                  "v": 352.90336,
                  "prevV": null
                },
                {
                  "name": "ビジネスイノベーション推進費",
                  "v": 59.77608,
                  "prevV": null
                },
                {
                  "name": "経済総務費",
                  "v": 16.05657,
                  "prevV": null
                },
                {
                  "name": "市民経済労働費",
                  "v": 13.83341,
                  "prevV": null
                },
                {
                  "name": "中小企業経営支援費",
                  "v": 10.83182,
                  "prevV": null
                }
              ]
            }
          ],
          "こども青少年費": [
            {
              "name": "子育て支援費",
              "v": 2543.29161,
              "prevV": null,
              "moku": [
                {
                  "name": "保育・教育施設運営費",
                  "v": 2204.63455,
                  "prevV": null
                },
                {
                  "name": "放課後児童育成費",
                  "v": 172.17026,
                  "prevV": null
                },
                {
                  "name": "幼児教育費",
                  "v": 96.48407,
                  "prevV": null
                },
                {
                  "name": "地域子育て支援費",
                  "v": 45.99904,
                  "prevV": null
                },
                {
                  "name": "保育所等整備費",
                  "v": 24.00369,
                  "prevV": null
                }
              ]
            },
            {
              "name": "こども福祉保健費",
              "v": 1419.9733,
              "prevV": null,
              "moku": [
                {
                  "name": "こども手当費",
                  "v": 786.62169,
                  "prevV": null
                },
                {
                  "name": "こども家庭福祉費",
                  "v": 322.92128,
                  "prevV": null
                },
                {
                  "name": "児童措置費",
                  "v": 129.8403,
                  "prevV": null
                },
                {
                  "name": "親子保健費",
                  "v": 102.97048,
                  "prevV": null
                },
                {
                  "name": "児童福祉施設運営費",
                  "v": 44.84115,
                  "prevV": null
                },
                {
                  "name": "児童相談所費",
                  "v": 30.53963,
                  "prevV": null
                },
                {
                  "name": "児童福祉施設整備費",
                  "v": 2.23877,
                  "prevV": null
                }
              ]
            },
            {
              "name": "青少年費",
              "v": 262.2478,
              "prevV": null,
              "moku": [
                {
                  "name": "こども青少年総務費",
                  "v": 242.06145,
                  "prevV": null
                },
                {
                  "name": "青少年育成費",
                  "v": 20.18635,
                  "prevV": null
                }
              ]
            }
          ],
          "健康福祉費": [
            {
              "name": "障害者福祉費",
              "v": 1602.88339,
              "prevV": null,
              "moku": [
                {
                  "name": "障害者福祉費",
                  "v": 1370.59808,
                  "prevV": null
                },
                {
                  "name": "障害者医療費",
                  "v": 169.94508,
                  "prevV": null
                },
                {
                  "name": "リハビリテーションセンター等運営費",
                  "v": 34.06242,
                  "prevV": null
                },
                {
                  "name": "障害者手当費",
                  "v": 13.7335,
                  "prevV": null
                },
                {
                  "name": "こころの健康相談センター等運営費",
                  "v": 7.33617,
                  "prevV": null
                },
                {
                  "name": "障害者福祉施設運営費",
                  "v": 7.20814,
                  "prevV": null
                }
              ]
            },
            {
              "name": "生活援護費",
              "v": 1429.67659,
              "prevV": null,
              "moku": [
                {
                  "name": "生活保護費",
                  "v": 1407.49923,
                  "prevV": null
                },
                {
                  "name": "援護対策費",
                  "v": 22.17736,
                  "prevV": null
                }
              ]
            },
            {
              "name": "社会福祉費",
              "v": 689.69958,
              "prevV": null,
              "moku": [
                {
                  "name": "社会福祉総務費",
                  "v": 278.54875,
                  "prevV": null
                },
                {
                  "name": "小児医療費",
                  "v": 178.96995,
                  "prevV": null
                },
                {
                  "name": "社会福祉事業振興費",
                  "v": 95.24955,
                  "prevV": null
                },
                {
                  "name": "難病対策費",
                  "v": 89.88071,
                  "prevV": null
                },
                {
                  "name": "葬務費",
                  "v": 26.52402,
                  "prevV": null
                },
                {
                  "name": "ひとり親家庭等医療費",
                  "v": 18.18123,
                  "prevV": null
                },
                {
                  "name": "国民年金費",
                  "v": 2.34537,
                  "prevV": null
                }
              ]
            },
            {
              "name": "健康福祉施設整備費",
              "v": 238.13827,
              "prevV": null,
              "moku": [
                {
                  "name": "健康福祉施設整備費",
                  "v": 238.13827,
                  "prevV": null
                }
              ]
            },
            {
              "name": "老人福祉費",
              "v": 154.83717,
              "prevV": null,
              "moku": [
                {
                  "name": "老人福祉費",
                  "v": 122.13641,
                  "prevV": null
                },
                {
                  "name": "老人措置費",
                  "v": 27.70163,
                  "prevV": null
                },
                {
                  "name": "老人福祉施設運営費",
                  "v": 4.99913,
                  "prevV": null
                }
              ]
            },
            {
              "name": "健康推進費",
              "v": 44.22665,
              "prevV": null,
              "moku": [
                {
                  "name": "地域保健推進費",
                  "v": 38.95365,
                  "prevV": null
                },
                {
                  "name": "健康づくり費",
                  "v": 5.273,
                  "prevV": null
                }
              ]
            }
          ],
          "医療費": [
            {
              "name": "公衆衛生費",
              "v": 195.22993,
              "prevV": null,
              "moku": [
                {
                  "name": "健康安全費",
                  "v": 185.72603,
                  "prevV": null
                },
                {
                  "name": "環境衛生費",
                  "v": 9.5039,
                  "prevV": null
                }
              ]
            },
            {
              "name": "医療政策費",
              "v": 78.62175,
              "prevV": null,
              "moku": [
                {
                  "name": "医療政策費",
                  "v": 49.44287,
                  "prevV": null
                },
                {
                  "name": "地域医療費",
                  "v": 29.17888,
                  "prevV": null
                }
              ]
            }
          ],
          "みどり環境費": [
            {
              "name": "公園緑地費",
              "v": 237.83342,
              "prevV": null,
              "moku": [
                {
                  "name": "公園緑地整備費",
                  "v": 125.19304,
                  "prevV": null
                },
                {
                  "name": "公園緑地管理費",
                  "v": 81.15981,
                  "prevV": null
                },
                {
                  "name": "動物園費",
                  "v": 27.823,
                  "prevV": null
                },
                {
                  "name": "環境活動事業費",
                  "v": 3.65757,
                  "prevV": null
                }
              ]
            },
            {
              "name": "みどり環境総務費",
              "v": 99.72761,
              "prevV": null,
              "moku": [
                {
                  "name": "みどり環境総務費",
                  "v": 66.975,
                  "prevV": null
                },
                {
                  "name": "みどり基金積立金",
                  "v": 30.2,
                  "prevV": null
                },
                {
                  "name": "地籍調査費",
                  "v": 0.95802,
                  "prevV": null
                },
                {
                  "name": "みどり環境企画費",
                  "v": 0.91094,
                  "prevV": null
                },
                {
                  "name": "建設発生土対策費",
                  "v": 0.68365,
                  "prevV": null
                }
              ]
            },
            {
              "name": "農政費",
              "v": 7.95353,
              "prevV": null,
              "moku": [
                {
                  "name": "農政推進費",
                  "v": 6.91465,
                  "prevV": null
                },
                {
                  "name": "農業振興費",
                  "v": 1.03888,
                  "prevV": null
                }
              ]
            },
            {
              "name": "環境保全費",
              "v": 5.86913,
              "prevV": null,
              "moku": [
                {
                  "name": "環境保全事業費",
                  "v": 3.94682,
                  "prevV": null
                },
                {
                  "name": "環境科学研究費",
                  "v": 1.92231,
                  "prevV": null
                }
              ]
            }
          ],
          "資源循環費": [
            {
              "name": "適正処理費",
              "v": 318.16656,
              "prevV": null,
              "moku": [
                {
                  "name": "工場費",
                  "v": 141.06562,
                  "prevV": null
                },
                {
                  "name": "適正処理総務費",
                  "v": 111.18473,
                  "prevV": null
                },
                {
                  "name": "処分地費",
                  "v": 62.2876,
                  "prevV": null
                },
                {
                  "name": "産業廃棄物対策費",
                  "v": 3.62861,
                  "prevV": null
                }
              ]
            },
            {
              "name": "資源循環管理費",
              "v": 226.65571,
              "prevV": null,
              "moku": [
                {
                  "name": "資源循環総務費",
                  "v": 166.13242,
                  "prevV": null
                },
                {
                  "name": "減量・リサイクル推進費",
                  "v": 38.9848,
                  "prevV": null
                },
                {
                  "name": "車両管理費",
                  "v": 16.64452,
                  "prevV": null
                },
                {
                  "name": "事務所費",
                  "v": 4.89397,
                  "prevV": null
                }
              ]
            },
            {
              "name": "し尿処理費",
              "v": 6.03776,
              "prevV": null,
              "moku": [
                {
                  "name": "し尿処理施設費",
                  "v": 4.15727,
                  "prevV": null
                },
                {
                  "name": "し尿処理総務費",
                  "v": 1.88049,
                  "prevV": null
                }
              ]
            }
          ],
          "建築費": [
            {
              "name": "住宅費",
              "v": 203.84349,
              "prevV": null,
              "moku": [
                {
                  "name": "市営住宅整備費",
                  "v": 97.78212,
                  "prevV": null
                },
                {
                  "name": "市営住宅管理費",
                  "v": 87.98587,
                  "prevV": null
                },
                {
                  "name": "優良賃貸住宅事業費",
                  "v": 13.80601,
                  "prevV": null
                },
                {
                  "name": "住宅施策推進費",
                  "v": 4.26949,
                  "prevV": null
                }
              ]
            },
            {
              "name": "建築指導費",
              "v": 125.38407,
              "prevV": null,
              "moku": [
                {
                  "name": "建築行政総務費",
                  "v": 79.92038,
                  "prevV": null
                },
                {
                  "name": "公共建築物長寿命化対策費",
                  "v": 43.67223,
                  "prevV": null
                },
                {
                  "name": "都市計画調査費",
                  "v": 1.29953,
                  "prevV": null
                },
                {
                  "name": "工事監理費",
                  "v": 0.49193,
                  "prevV": null
                }
              ]
            }
          ],
          "都市整備費": [
            {
              "name": "都市整備費",
              "v": 108.52808,
              "prevV": null,
              "moku": [
                {
                  "name": "地域整備費",
                  "v": 59.7306,
                  "prevV": null
                },
                {
                  "name": "企画費",
                  "v": 33.6723,
                  "prevV": null
                },
                {
                  "name": "都市交通費",
                  "v": 15.12518,
                  "prevV": null
                }
              ]
            }
          ],
          "道路費": [
            {
              "name": "道路整備費",
              "v": 305.75587,
              "prevV": null,
              "moku": [
                {
                  "name": "道路特別整備費",
                  "v": 156.05143,
                  "prevV": null
                },
                {
                  "name": "街路整備費",
                  "v": 116.28129,
                  "prevV": null
                },
                {
                  "name": "道路費負担金",
                  "v": 32.69167,
                  "prevV": null
                },
                {
                  "name": "高速道路等整備費",
                  "v": 0.73148,
                  "prevV": null
                }
              ]
            },
            {
              "name": "道路維持管理費",
              "v": 268.64902,
              "prevV": null,
              "moku": [
                {
                  "name": "道路等維持費",
                  "v": 146.21691,
                  "prevV": null
                },
                {
                  "name": "道路行政総務費",
                  "v": 67.27624,
                  "prevV": null
                },
                {
                  "name": "道路等管理費",
                  "v": 29.91101,
                  "prevV": null
                },
                {
                  "name": "自転車政策推進費",
                  "v": 25.24486,
                  "prevV": null
                }
              ]
            }
          ],
          "河川費": [
            {
              "name": "河川費",
              "v": 49.00827,
              "prevV": null,
              "moku": [
                {
                  "name": "河川整備費",
                  "v": 27.15688,
                  "prevV": null
                },
                {
                  "name": "河川管理費",
                  "v": 21.85139,
                  "prevV": null
                }
              ]
            }
          ],
          "港湾費": [
            {
              "name": "港湾管理費",
              "v": 84.65779,
              "prevV": null,
              "moku": [
                {
                  "name": "港湾総務費",
                  "v": 29.17467,
                  "prevV": null
                },
                {
                  "name": "みなと賑わい振興費",
                  "v": 24.75852,
                  "prevV": null
                },
                {
                  "name": "港湾施設等維持費",
                  "v": 10.46739,
                  "prevV": null
                },
                {
                  "name": "港湾物流費",
                  "v": 10.4457,
                  "prevV": null
                },
                {
                  "name": "港湾管理費",
                  "v": 9.81151,
                  "prevV": null
                }
              ]
            },
            {
              "name": "港湾整備費",
              "v": 53.35018,
              "prevV": null,
              "moku": [
                {
                  "name": "港湾整備費負担金",
                  "v": 32.64,
                  "prevV": null
                },
                {
                  "name": "港湾施設等改良費",
                  "v": 20.71018,
                  "prevV": null
                }
              ]
            }
          ],
          "消防費": [
            {
              "name": "消防費",
              "v": 457.64721,
              "prevV": null,
              "moku": [
                {
                  "name": "消防総務費",
                  "v": 381.57739,
                  "prevV": null
                },
                {
                  "name": "消防団費",
                  "v": 23.80804,
                  "prevV": null
                },
                {
                  "name": "消防施設費",
                  "v": 19.43552,
                  "prevV": null
                },
                {
                  "name": "警防活動費",
                  "v": 16.14451,
                  "prevV": null
                },
                {
                  "name": "消防研修費",
                  "v": 9.83784,
                  "prevV": null
                },
                {
                  "name": "航空活動費",
                  "v": 4.7024,
                  "prevV": null
                },
                {
                  "name": "予防活動費",
                  "v": 2.14151,
                  "prevV": null
                }
              ]
            }
          ],
          "教育費": [
            {
              "name": "教育総務費",
              "v": 2131.36639,
              "prevV": null,
              "moku": [
                {
                  "name": "教職員費",
                  "v": 1858.6651,
                  "prevV": null
                },
                {
                  "name": "事務局費",
                  "v": 128.18679,
                  "prevV": null
                },
                {
                  "name": "教育指導振興費",
                  "v": 109.51001,
                  "prevV": null
                },
                {
                  "name": "教育相談費",
                  "v": 25.06561,
                  "prevV": null
                },
                {
                  "name": "特別支援教育指導振興費",
                  "v": 8.40014,
                  "prevV": null
                },
                {
                  "name": "教育センター費",
                  "v": 1.32517,
                  "prevV": null
                },
                {
                  "name": "教育委員会費",
                  "v": 0.21357,
                  "prevV": null
                }
              ]
            },
            {
              "name": "教育施設整備費",
              "v": 488.87304,
              "prevV": null,
              "moku": [
                {
                  "name": "学校施設営繕費",
                  "v": 250.06628,
                  "prevV": null
                },
                {
                  "name": "小・中学校整備費",
                  "v": 221.37691,
                  "prevV": null
                },
                {
                  "name": "学校用地費",
                  "v": 13.70515,
                  "prevV": null
                },
                {
                  "name": "特別支援教育施設整備費",
                  "v": 1.76608,
                  "prevV": null
                },
                {
                  "name": "高等学校整備費",
                  "v": 1.28681,
                  "prevV": null
                },
                {
                  "name": "学校施設整備基金積立金",
                  "v": 0.67181,
                  "prevV": null
                }
              ]
            },
            {
              "name": "学校保健体育費",
              "v": 392.98406,
              "prevV": null,
              "moku": [
                {
                  "name": "学校給食費",
                  "v": 192.33424,
                  "prevV": null
                },
                {
                  "name": "学校給食物資購入費",
                  "v": 185.66179,
                  "prevV": null
                },
                {
                  "name": "学校体育費",
                  "v": 7.74399,
                  "prevV": null
                },
                {
                  "name": "学校保健費",
                  "v": 7.24404,
                  "prevV": null
                }
              ]
            },
            {
              "name": "小学校費",
              "v": 151.03101,
              "prevV": null,
              "moku": [
                {
                  "name": "学校管理費",
                  "v": 113.61452,
                  "prevV": null
                },
                {
                  "name": "学校運営費",
                  "v": 37.41649,
                  "prevV": null
                }
              ]
            },
            {
              "name": "中学校費",
              "v": 72.63129,
              "prevV": null,
              "moku": [
                {
                  "name": "学校管理費",
                  "v": 49.86247,
                  "prevV": null
                },
                {
                  "name": "学校運営費",
                  "v": 22.76882,
                  "prevV": null
                }
              ]
            },
            {
              "name": "生涯学習費",
              "v": 69.29305,
              "prevV": null,
              "moku": [
                {
                  "name": "図書館費",
                  "v": 48.3872,
                  "prevV": null
                },
                {
                  "name": "文化財保護費",
                  "v": 12.33062,
                  "prevV": null
                },
                {
                  "name": "生涯学習推進費",
                  "v": 8.57523,
                  "prevV": null
                }
              ]
            },
            {
              "name": "特別支援学校費",
              "v": 19.21615,
              "prevV": null,
              "moku": [
                {
                  "name": "学校管理費",
                  "v": 17.00401,
                  "prevV": null
                },
                {
                  "name": "学校運営費",
                  "v": 2.21214,
                  "prevV": null
                }
              ]
            },
            {
              "name": "高等学校費",
              "v": 11.94161,
              "prevV": null,
              "moku": [
                {
                  "name": "学校管理費",
                  "v": 8.4185,
                  "prevV": null
                },
                {
                  "name": "学校運営費",
                  "v": 3.52311,
                  "prevV": null
                }
              ]
            }
          ],
          "公債費": [
            {
              "name": "公債費",
              "v": 1758.58146,
              "prevV": null,
              "moku": [
                {
                  "name": "元金",
                  "v": 1505.0981,
                  "prevV": null
                },
                {
                  "name": "利子",
                  "v": 241.07512,
                  "prevV": null
                },
                {
                  "name": "公債諸費",
                  "v": 12.40824,
                  "prevV": null
                }
              ]
            },
            {
              "name": "第三セクター等改革推進債公債費",
              "v": 14.26867,
              "prevV": null,
              "moku": [
                {
                  "name": "元金",
                  "v": 13.68557,
                  "prevV": null
                },
                {
                  "name": "利子",
                  "v": 0.57877,
                  "prevV": null
                },
                {
                  "name": "公債諸費",
                  "v": 0.00433,
                  "prevV": null
                }
              ]
            }
          ],
          "諸支出金": [
            {
              "name": "特別会計繰出金",
              "v": 2105.59924,
              "prevV": null,
              "moku": [
                {
                  "name": "介護保険事業費会計繰出金",
                  "v": 546.2544,
                  "prevV": null
                },
                {
                  "name": "後期高齢者医療事業費会計繰出金",
                  "v": 479.2861,
                  "prevV": null
                },
                {
                  "name": "下水道事業会計繰出金",
                  "v": 361.75277,
                  "prevV": null
                },
                {
                  "name": "国民健康保険事業費会計繰出金",
                  "v": 306.10269,
                  "prevV": null
                },
                {
                  "name": "高速鉄道事業会計繰出金",
                  "v": 97.4801,
                  "prevV": null
                },
                {
                  "name": "病院事業会計繰出金",
                  "v": 77.97094,
                  "prevV": null
                },
                {
                  "name": "自動車事業会計繰出金",
                  "v": 60.71717,
                  "prevV": null
                },
                {
                  "name": "水道事業会計繰出金",
                  "v": 46.76306,
                  "prevV": null
                },
                {
                  "name": "市街地開発事業費会計繰出金",
                  "v": 41.00037,
                  "prevV": null
                },
                {
                  "name": "みどり保全創造事業費会計繰出金",
                  "v": 37.73096,
                  "prevV": null
                },
                {
                  "name": "中央と畜場費会計繰出金",
                  "v": 25.79388,
                  "prevV": null
                },
                {
                  "name": "港湾整備事業費会計繰出金",
                  "v": 16.46461,
                  "prevV": null
                },
                {
                  "name": "公共事業用地費会計繰出金",
                  "v": 5.66866,
                  "prevV": null
                },
                {
                  "name": "中央卸売市場費会計繰出金",
                  "v": 1.45,
                  "prevV": null
                },
                {
                  "name": "母子父子寡婦福祉資金会計繰出金",
                  "v": 0.44195,
                  "prevV": null
                },
                {
                  "name": "自動車駐車場事業費会計繰出金",
                  "v": 0.29132,
                  "prevV": null
                },
                {
                  "name": "勤労者福祉共済事業費会計繰出金",
                  "v": 0.20721,
                  "prevV": null
                },
                {
                  "name": "公害被害者救済事業費会計繰出金",
                  "v": 0.19353,
                  "prevV": null
                },
                {
                  "name": "工業用水道事業会計繰出金",
                  "v": 0.02952,
                  "prevV": null
                }
              ]
            }
          ],
          "予備費": [
            {
              "name": "予備費",
              "v": 10,
              "prevV": null,
              "moku": [
                {
                  "name": "予備費",
                  "v": 10,
                  "prevV": null
                }
              ]
            }
          ]
        }
      },
      "sourceTitle": "令和8年度 横浜市予算に関する説明書（歳入・歳出予算 款項目節 CSV）",
      "localUrl": "/sources/yokohama-yosan-meisai-r8/r8sainyu_saisyutsu.zip",
      "refLabel": "r8sainyu_saisyutsu.zip",
      "originUrl": "https://www.city.yokohama.lg.jp/city-info/zaisei/jokyo/yosan/r8/r8yosan.files/r8sainyu_saisyutsu.zip",
      "archiveUrl": "https://www.city.yokohama.lg.jp/city-info/zaisei/jokyo/yosan/r8/r8yosan.files/r8sainyu_saisyutsu.zip"
    },
    {
      "fy": "R6",
      "fyLabel": "令和6年度 当初予算",
      "byKan": {
        "revenue": {
          "市税": [
            {
              "name": "市民税",
              "v": 4725.34,
              "prevV": null,
              "moku": [
                {
                  "name": "個人",
                  "v": 4213.37,
                  "prevV": null
                },
                {
                  "name": "法人",
                  "v": 511.97,
                  "prevV": null
                }
              ]
            },
            {
              "name": "固定資産税",
              "v": 2975.51,
              "prevV": null,
              "moku": [
                {
                  "name": "固定資産税",
                  "v": 2966.44,
                  "prevV": null
                },
                {
                  "name": "国有資産等所在市町村交付金及び納付金",
                  "v": 9.07,
                  "prevV": null
                }
              ]
            },
            {
              "name": "都市計画税",
              "v": 646.62,
              "prevV": null,
              "moku": [
                {
                  "name": "都市計画税",
                  "v": 646.62,
                  "prevV": null
                }
              ]
            },
            {
              "name": "市たばこ税",
              "v": 231.77,
              "prevV": null,
              "moku": [
                {
                  "name": "市たばこ税",
                  "v": 231.77,
                  "prevV": null
                }
              ]
            },
            {
              "name": "事業所税",
              "v": 194.47,
              "prevV": null,
              "moku": [
                {
                  "name": "事業所税",
                  "v": 194.47,
                  "prevV": null
                }
              ]
            },
            {
              "name": "軽自動車税",
              "v": 35.56,
              "prevV": null,
              "moku": [
                {
                  "name": "種別割",
                  "v": 33.2,
                  "prevV": null
                },
                {
                  "name": "環境性能割",
                  "v": 2.36,
                  "prevV": null
                }
              ]
            },
            {
              "name": "入湯税",
              "v": 0.7,
              "prevV": null,
              "moku": [
                {
                  "name": "入湯税",
                  "v": 0.7,
                  "prevV": null
                }
              ]
            }
          ],
          "地方譲与税": [
            {
              "name": "自動車重量譲与税",
              "v": 46.15,
              "prevV": null,
              "moku": [
                {
                  "name": "自動車重量譲与税",
                  "v": 46.15,
                  "prevV": null
                }
              ]
            },
            {
              "name": "地方揮発油譲与税",
              "v": 26.55,
              "prevV": null,
              "moku": [
                {
                  "name": "地方揮発油譲与税",
                  "v": 26.55,
                  "prevV": null
                }
              ]
            },
            {
              "name": "特別とん譲与税",
              "v": 9.62,
              "prevV": null,
              "moku": [
                {
                  "name": "特別とん譲与税",
                  "v": 9.62,
                  "prevV": null
                }
              ]
            },
            {
              "name": "森林環境譲与税",
              "v": 4.43,
              "prevV": null,
              "moku": [
                {
                  "name": "森林環境譲与税",
                  "v": 4.43,
                  "prevV": null
                }
              ]
            },
            {
              "name": "石油ガス譲与税",
              "v": 0.2,
              "prevV": null,
              "moku": [
                {
                  "name": "石油ガス譲与税",
                  "v": 0.2,
                  "prevV": null
                }
              ]
            }
          ],
          "利子割交付金": [
            {
              "name": "利子割交付金",
              "v": 2.2,
              "prevV": null,
              "moku": [
                {
                  "name": "利子割交付金",
                  "v": 2.2,
                  "prevV": null
                }
              ]
            }
          ],
          "配当割交付金": [
            {
              "name": "配当割交付金",
              "v": 53.82,
              "prevV": null,
              "moku": [
                {
                  "name": "配当割交付金",
                  "v": 53.82,
                  "prevV": null
                }
              ]
            }
          ],
          "株式等譲渡所得割交付金": [
            {
              "name": "株式等譲渡所得割交付金",
              "v": 45.44,
              "prevV": null,
              "moku": [
                {
                  "name": "株式等譲渡所得割交付金",
                  "v": 45.44,
                  "prevV": null
                }
              ]
            }
          ],
          "分離課税所得割交付金": [
            {
              "name": "分離課税所得割交付金",
              "v": 10.36,
              "prevV": null,
              "moku": [
                {
                  "name": "分離課税所得割交付金",
                  "v": 10.36,
                  "prevV": null
                }
              ]
            }
          ],
          "法人事業税交付金": [
            {
              "name": "法人事業税交付金",
              "v": 100.76,
              "prevV": null,
              "moku": [
                {
                  "name": "法人事業税交付金",
                  "v": 100.76,
                  "prevV": null
                }
              ]
            }
          ],
          "地方消費税交付金": [
            {
              "name": "地方消費税交付金",
              "v": 833.98,
              "prevV": null,
              "moku": [
                {
                  "name": "地方消費税交付金",
                  "v": 833.98,
                  "prevV": null
                }
              ]
            }
          ],
          "ゴルフ場利用税交付金": [
            {
              "name": "ゴルフ場利用税交付金",
              "v": 1.46,
              "prevV": null,
              "moku": [
                {
                  "name": "ゴルフ場利用税交付金",
                  "v": 1.46,
                  "prevV": null
                }
              ]
            }
          ],
          "環境性能割交付金": [
            {
              "name": "環境性能割交付金",
              "v": 26.99,
              "prevV": null,
              "moku": [
                {
                  "name": "環境性能割交付金",
                  "v": 26.98999,
                  "prevV": null
                },
                {
                  "name": "旧法による自動車取得税交付金",
                  "v": 0.00001,
                  "prevV": null
                }
              ]
            }
          ],
          "軽油引取税交付金": [
            {
              "name": "軽油引取税交付金",
              "v": 121.44,
              "prevV": null,
              "moku": [
                {
                  "name": "軽油引取税交付金",
                  "v": 121.43,
                  "prevV": null
                },
                {
                  "name": "旧法による軽油引取税交付金",
                  "v": 0.01,
                  "prevV": null
                }
              ]
            }
          ],
          "国有提供施設等所在市町村助成交付金": [
            {
              "name": "国有提供施設等所在市町村助成交付金",
              "v": 5,
              "prevV": null,
              "moku": [
                {
                  "name": "国有提供施設等所在市町村助成交付金",
                  "v": 5,
                  "prevV": null
                }
              ]
            }
          ],
          "地方特例交付金": [
            {
              "name": "地方特例交付金",
              "v": 271.74,
              "prevV": null,
              "moku": [
                {
                  "name": "地方特例交付金",
                  "v": 271.74,
                  "prevV": null
                }
              ]
            },
            {
              "name": "新型コロナウイルス感染症対策地方税減収補填特別交付金",
              "v": 0.8,
              "prevV": null,
              "moku": [
                {
                  "name": "新型コロナウイルス感染症対策地方税減収補填特別交付金",
                  "v": 0.8,
                  "prevV": null
                }
              ]
            }
          ],
          "地方交付税": [
            {
              "name": "地方交付税",
              "v": 270,
              "prevV": null,
              "moku": [
                {
                  "name": "地方交付税",
                  "v": 270,
                  "prevV": null
                }
              ]
            }
          ],
          "交通安全対策特別交付金": [
            {
              "name": "交通安全対策特別交付金",
              "v": 7.43,
              "prevV": null,
              "moku": [
                {
                  "name": "交通安全対策特別交付金",
                  "v": 7.43,
                  "prevV": null
                }
              ]
            }
          ],
          "分担金及び負担金": [
            {
              "name": "負担金",
              "v": 288.41114,
              "prevV": null,
              "moku": [
                {
                  "name": "教育費負担金",
                  "v": 120.12616,
                  "prevV": null
                },
                {
                  "name": "こども青少年費負担金",
                  "v": 107.18975,
                  "prevV": null
                },
                {
                  "name": "健康福祉費負担金",
                  "v": 46.59074,
                  "prevV": null
                },
                {
                  "name": "道路費負担金",
                  "v": 8.14937,
                  "prevV": null
                },
                {
                  "name": "都市整備費負担金",
                  "v": 4.32,
                  "prevV": null
                },
                {
                  "name": "港湾費負担金",
                  "v": 0.97528,
                  "prevV": null
                },
                {
                  "name": "消防費負担金",
                  "v": 0.41704,
                  "prevV": null
                },
                {
                  "name": "資源循環費負担金",
                  "v": 0.25544,
                  "prevV": null
                },
                {
                  "name": "総務費負担金",
                  "v": 0.2,
                  "prevV": null
                },
                {
                  "name": "医療費負担金",
                  "v": 0.17,
                  "prevV": null
                },
                {
                  "name": "河川費負担金",
                  "v": 0.01736,
                  "prevV": null
                }
              ]
            }
          ],
          "使用料及び手数料": [
            {
              "name": "使用料",
              "v": 389.45109,
              "prevV": null,
              "moku": [
                {
                  "name": "建築使用料",
                  "v": 109.02846,
                  "prevV": null
                },
                {
                  "name": "港湾使用料",
                  "v": 104.63111,
                  "prevV": null
                },
                {
                  "name": "道路使用料",
                  "v": 71.55363,
                  "prevV": null
                },
                {
                  "name": "こども青少年使用料",
                  "v": 64.61538,
                  "prevV": null
                },
                {
                  "name": "健康福祉使用料",
                  "v": 14.52916,
                  "prevV": null
                },
                {
                  "name": "みどり環境使用料",
                  "v": 11.07661,
                  "prevV": null
                },
                {
                  "name": "教育使用料",
                  "v": 8.90031,
                  "prevV": null
                },
                {
                  "name": "総務使用料",
                  "v": 2.17248,
                  "prevV": null
                },
                {
                  "name": "河川使用料",
                  "v": 1.66571,
                  "prevV": null
                },
                {
                  "name": "消防使用料",
                  "v": 0.50746,
                  "prevV": null
                },
                {
                  "name": "市民使用料",
                  "v": 0.46296,
                  "prevV": null
                },
                {
                  "name": "にぎわいスポーツ文化使用料",
                  "v": 0.20705,
                  "prevV": null
                },
                {
                  "name": "経済使用料",
                  "v": 0.07659,
                  "prevV": null
                },
                {
                  "name": "医療使用料",
                  "v": 0.02418,
                  "prevV": null
                }
              ]
            },
            {
              "name": "手数料",
              "v": 105.21099,
              "prevV": null,
              "moku": [
                {
                  "name": "資源循環手数料",
                  "v": 55.3599,
                  "prevV": null
                },
                {
                  "name": "道路手数料",
                  "v": 22.47976,
                  "prevV": null
                },
                {
                  "name": "市民手数料",
                  "v": 16.8524,
                  "prevV": null
                },
                {
                  "name": "医療手数料",
                  "v": 3.43011,
                  "prevV": null
                },
                {
                  "name": "建築手数料",
                  "v": 2.24543,
                  "prevV": null
                },
                {
                  "name": "総務手数料",
                  "v": 1.88441,
                  "prevV": null
                },
                {
                  "name": "消防手数料",
                  "v": 1.76811,
                  "prevV": null
                },
                {
                  "name": "都市整備手数料",
                  "v": 0.81195,
                  "prevV": null
                },
                {
                  "name": "教育手数料",
                  "v": 0.25428,
                  "prevV": null
                },
                {
                  "name": "経済手数料",
                  "v": 0.102,
                  "prevV": null
                },
                {
                  "name": "健康福祉手数料",
                  "v": 0.01249,
                  "prevV": null
                },
                {
                  "name": "みどり環境手数料",
                  "v": 0.00996,
                  "prevV": null
                },
                {
                  "name": "港湾手数料",
                  "v": 0.0001,
                  "prevV": null
                },
                {
                  "name": "こども青少年手数料",
                  "v": 0.00009,
                  "prevV": null
                }
              ]
            }
          ],
          "国庫支出金": [
            {
              "name": "国庫負担金",
              "v": 3144.86385,
              "prevV": null,
              "moku": [
                {
                  "name": "健康福祉費国庫負担金",
                  "v": 1538.69007,
                  "prevV": null
                },
                {
                  "name": "こども青少年費国庫負担金",
                  "v": 1211.91296,
                  "prevV": null
                },
                {
                  "name": "教育費国庫負担金",
                  "v": 385.69411,
                  "prevV": null
                },
                {
                  "name": "医療費国庫負担金",
                  "v": 8.43251,
                  "prevV": null
                },
                {
                  "name": "消防費国庫負担金",
                  "v": 0.1342,
                  "prevV": null
                }
              ]
            },
            {
              "name": "国庫補助金",
              "v": 681.61653,
              "prevV": null,
              "moku": [
                {
                  "name": "こども青少年費国庫補助金",
                  "v": 181.557,
                  "prevV": null
                },
                {
                  "name": "道路費国庫補助金",
                  "v": 116.46,
                  "prevV": null
                },
                {
                  "name": "市民費国庫補助金",
                  "v": 76.39741,
                  "prevV": null
                },
                {
                  "name": "健康福祉費国庫補助金",
                  "v": 73.84185,
                  "prevV": null
                },
                {
                  "name": "教育費国庫補助金",
                  "v": 72.05926,
                  "prevV": null
                },
                {
                  "name": "建築費国庫補助金",
                  "v": 54.05132,
                  "prevV": null
                },
                {
                  "name": "総務費国庫補助金",
                  "v": 32.53222,
                  "prevV": null
                },
                {
                  "name": "みどり環境費国庫補助金",
                  "v": 25.21077,
                  "prevV": null
                },
                {
                  "name": "資源循環費国庫補助金",
                  "v": 14.47347,
                  "prevV": null
                },
                {
                  "name": "都市整備費国庫補助金",
                  "v": 11.52179,
                  "prevV": null
                },
                {
                  "name": "デジタル田園都市国家構想交付金",
                  "v": 5.5693,
                  "prevV": null
                },
                {
                  "name": "河川費国庫補助金",
                  "v": 4.6,
                  "prevV": null
                },
                {
                  "name": "医療費国庫補助金",
                  "v": 4.49132,
                  "prevV": null
                },
                {
                  "name": "港湾費国庫補助金",
                  "v": 2.8009,
                  "prevV": null
                },
                {
                  "name": "経済費国庫補助金",
                  "v": 2.77465,
                  "prevV": null
                },
                {
                  "name": "消防費国庫補助金",
                  "v": 2.33849,
                  "prevV": null
                },
                {
                  "name": "にぎわいスポーツ文化費国庫補助金",
                  "v": 0.93678,
                  "prevV": null
                }
              ]
            },
            {
              "name": "国庫委託金",
              "v": 13.23287,
              "prevV": null,
              "moku": [
                {
                  "name": "健康福祉費国庫委託金",
                  "v": 9.1038,
                  "prevV": null
                },
                {
                  "name": "教育費国庫委託金",
                  "v": 1.67112,
                  "prevV": null
                },
                {
                  "name": "経済費国庫委託金",
                  "v": 1.41612,
                  "prevV": null
                },
                {
                  "name": "市民費国庫委託金",
                  "v": 0.44296,
                  "prevV": null
                },
                {
                  "name": "こども青少年費国庫委託金",
                  "v": 0.34845,
                  "prevV": null
                },
                {
                  "name": "医療費国庫委託金",
                  "v": 0.23032,
                  "prevV": null
                },
                {
                  "name": "みどり環境費国庫委託金",
                  "v": 0.013,
                  "prevV": null
                },
                {
                  "name": "都市整備費国庫委託金",
                  "v": 0.0071,
                  "prevV": null
                }
              ]
            }
          ],
          "県支出金": [
            {
              "name": "県負担金",
              "v": 746.32206,
              "prevV": null,
              "moku": [
                {
                  "name": "こども青少年費県負担金",
                  "v": 385.3572,
                  "prevV": null
                },
                {
                  "name": "健康福祉費県負担金",
                  "v": 356.30336,
                  "prevV": null
                },
                {
                  "name": "総務費県負担金",
                  "v": 1.93,
                  "prevV": null
                },
                {
                  "name": "道路費県負担金",
                  "v": 1.8558,
                  "prevV": null
                },
                {
                  "name": "みどり環境費県負担金",
                  "v": 0.43923,
                  "prevV": null
                },
                {
                  "name": "医療費県負担金",
                  "v": 0.42385,
                  "prevV": null
                },
                {
                  "name": "建築費県負担金",
                  "v": 0.01262,
                  "prevV": null
                }
              ]
            },
            {
              "name": "県補助金",
              "v": 246.20745,
              "prevV": null,
              "moku": [
                {
                  "name": "健康福祉費県補助金",
                  "v": 128.66331,
                  "prevV": null
                },
                {
                  "name": "こども青少年費県補助金",
                  "v": 103.52102,
                  "prevV": null
                },
                {
                  "name": "消防費県補助金",
                  "v": 4.8663,
                  "prevV": null
                },
                {
                  "name": "河川費県補助金",
                  "v": 3.81,
                  "prevV": null
                },
                {
                  "name": "道路費県補助金",
                  "v": 2,
                  "prevV": null
                },
                {
                  "name": "医療費県補助金",
                  "v": 0.98608,
                  "prevV": null
                },
                {
                  "name": "建築費県補助金",
                  "v": 0.8036,
                  "prevV": null
                },
                {
                  "name": "市民費県補助金",
                  "v": 0.69656,
                  "prevV": null
                },
                {
                  "name": "経済費県補助金",
                  "v": 0.37309,
                  "prevV": null
                },
                {
                  "name": "みどり環境費県補助金",
                  "v": 0.34588,
                  "prevV": null
                },
                {
                  "name": "教育費県補助金",
                  "v": 0.05162,
                  "prevV": null
                },
                {
                  "name": "港湾費県補助金",
                  "v": 0.04852,
                  "prevV": null
                },
                {
                  "name": "総務費県補助金",
                  "v": 0.04147,
                  "prevV": null
                }
              ]
            },
            {
              "name": "県委託金",
              "v": 68.98755,
              "prevV": null,
              "moku": [
                {
                  "name": "総務費県委託金",
                  "v": 68.5066,
                  "prevV": null
                },
                {
                  "name": "健康福祉費県委託金",
                  "v": 0.4383,
                  "prevV": null
                },
                {
                  "name": "みどり環境費県委託金",
                  "v": 0.01886,
                  "prevV": null
                },
                {
                  "name": "港湾費県委託金",
                  "v": 0.0129,
                  "prevV": null
                },
                {
                  "name": "医療費県委託金",
                  "v": 0.00763,
                  "prevV": null
                },
                {
                  "name": "こども青少年費県委託金",
                  "v": 0.00245,
                  "prevV": null
                },
                {
                  "name": "教育費県委託金",
                  "v": 0.00081,
                  "prevV": null
                }
              ]
            }
          ],
          "財産収入": [
            {
              "name": "財産運用収入",
              "v": 67.71939,
              "prevV": null,
              "moku": [
                {
                  "name": "財産貸付収入",
                  "v": 64.96261,
                  "prevV": null
                },
                {
                  "name": "利子及び配当金",
                  "v": 2.75678,
                  "prevV": null
                }
              ]
            },
            {
              "name": "財産売払収入",
              "v": 63.02468,
              "prevV": null,
              "moku": [
                {
                  "name": "不動産売払収入",
                  "v": 58.37192,
                  "prevV": null
                },
                {
                  "name": "有価証券売払収入",
                  "v": 4,
                  "prevV": null
                },
                {
                  "name": "物品売払収入",
                  "v": 0.6251,
                  "prevV": null
                },
                {
                  "name": "生産物売払収入",
                  "v": 0.02766,
                  "prevV": null
                }
              ]
            }
          ],
          "寄附金": [
            {
              "name": "寄附金",
              "v": 54.22823,
              "prevV": null,
              "moku": [
                {
                  "name": "一般寄附金",
                  "v": 51.54296,
                  "prevV": null
                },
                {
                  "name": "指定寄附金",
                  "v": 2.68527,
                  "prevV": null
                }
              ]
            }
          ],
          "繰入金": [
            {
              "name": "基金繰入金",
              "v": 474.40096,
              "prevV": null,
              "moku": [
                {
                  "name": "財政調整基金繰入金",
                  "v": 240.55915,
                  "prevV": null
                },
                {
                  "name": "減債基金繰入金",
                  "v": 184.80428,
                  "prevV": null
                },
                {
                  "name": "資産活用推進基金繰入金",
                  "v": 41.72672,
                  "prevV": null
                },
                {
                  "name": "都市整備基金繰入金",
                  "v": 2.19668,
                  "prevV": null
                },
                {
                  "name": "社会福祉基金繰入金",
                  "v": 1.95213,
                  "prevV": null
                },
                {
                  "name": "学校給食費調整基金繰入金",
                  "v": 1.15477,
                  "prevV": null
                },
                {
                  "name": "環境保全基金繰入金",
                  "v": 1.05498,
                  "prevV": null
                },
                {
                  "name": "市民活動推進基金繰入金",
                  "v": 0.39225,
                  "prevV": null
                },
                {
                  "name": "都市交通基盤整備基金繰入金",
                  "v": 0.16,
                  "prevV": null
                },
                {
                  "name": "世界を目指す若者応援基金繰入金",
                  "v": 0.16,
                  "prevV": null
                },
                {
                  "name": "協働の森基金繰入金",
                  "v": 0.15,
                  "prevV": null
                },
                {
                  "name": "動物園基金繰入金",
                  "v": 0.09,
                  "prevV": null
                }
              ]
            },
            {
              "name": "他会計繰入金",
              "v": 40.09214,
              "prevV": null,
              "moku": [
                {
                  "name": "下水道事業会計繰入金",
                  "v": 40,
                  "prevV": null
                },
                {
                  "name": "母子父子寡婦福祉資金会計繰入金",
                  "v": 0.09214,
                  "prevV": null
                }
              ]
            }
          ],
          "繰越金": [
            {
              "name": "繰越金",
              "v": 0.00001,
              "prevV": null,
              "moku": [
                {
                  "name": "繰越金",
                  "v": 0.00001,
                  "prevV": null
                }
              ]
            }
          ],
          "諸収入": [
            {
              "name": "預託金元利収入",
              "v": 736.13,
              "prevV": null,
              "moku": [
                {
                  "name": "経済費預託金元利収入",
                  "v": 735.63,
                  "prevV": null
                },
                {
                  "name": "みどり環境費預託金元利収入",
                  "v": 0.5,
                  "prevV": null
                }
              ]
            },
            {
              "name": "雑入",
              "v": 187.08784,
              "prevV": null,
              "moku": [
                {
                  "name": "資源循環費雑入",
                  "v": 68.60125,
                  "prevV": null
                },
                {
                  "name": "健康福祉費雑入",
                  "v": 36.2597,
                  "prevV": null
                },
                {
                  "name": "雑入",
                  "v": 24.88841,
                  "prevV": null
                },
                {
                  "name": "総務費雑入",
                  "v": 23.03431,
                  "prevV": null
                },
                {
                  "name": "こども青少年費雑入",
                  "v": 8.71844,
                  "prevV": null
                },
                {
                  "name": "港湾費雑入",
                  "v": 5.38081,
                  "prevV": null
                },
                {
                  "name": "みどり環境費雑入",
                  "v": 3.9195,
                  "prevV": null
                },
                {
                  "name": "消防費雑入",
                  "v": 3.34179,
                  "prevV": null
                },
                {
                  "name": "道路費雑入",
                  "v": 3.30209,
                  "prevV": null
                },
                {
                  "name": "経済費雑入",
                  "v": 3.23867,
                  "prevV": null
                },
                {
                  "name": "市民費雑入",
                  "v": 2.16015,
                  "prevV": null
                },
                {
                  "name": "建築費雑入",
                  "v": 2.01867,
                  "prevV": null
                },
                {
                  "name": "教育費雑入",
                  "v": 1.35441,
                  "prevV": null
                },
                {
                  "name": "都市整備費雑入",
                  "v": 0.42901,
                  "prevV": null
                },
                {
                  "name": "にぎわいスポーツ文化費雑入",
                  "v": 0.3711,
                  "prevV": null
                },
                {
                  "name": "医療費雑入",
                  "v": 0.0695,
                  "prevV": null
                },
                {
                  "name": "河川費雑入",
                  "v": 0.00003,
                  "prevV": null
                }
              ]
            },
            {
              "name": "収益事業収入",
              "v": 100,
              "prevV": null,
              "moku": [
                {
                  "name": "宝くじ収入",
                  "v": 100,
                  "prevV": null
                }
              ]
            },
            {
              "name": "貸付金元利収入",
              "v": 31.26536,
              "prevV": null,
              "moku": [
                {
                  "name": "総務費貸付金元利収入",
                  "v": 20.44756,
                  "prevV": null
                },
                {
                  "name": "道路費貸付金元利収入",
                  "v": 7,
                  "prevV": null
                },
                {
                  "name": "港湾費貸付金元利収入",
                  "v": 1.57337,
                  "prevV": null
                },
                {
                  "name": "にぎわいスポーツ文化費貸付金元利収入",
                  "v": 1.16883,
                  "prevV": null
                },
                {
                  "name": "建築費貸付金元利収入",
                  "v": 0.68081,
                  "prevV": null
                },
                {
                  "name": "経済費貸付金元利収入",
                  "v": 0.31014,
                  "prevV": null
                },
                {
                  "name": "市民費貸付金元利収入",
                  "v": 0.06,
                  "prevV": null
                },
                {
                  "name": "教育費貸付金元利収入",
                  "v": 0.01644,
                  "prevV": null
                },
                {
                  "name": "健康福祉費貸付金元利収入",
                  "v": 0.00821,
                  "prevV": null
                }
              ]
            },
            {
              "name": "延滞金、加算金及び過料",
              "v": 2.7952,
              "prevV": null,
              "moku": [
                {
                  "name": "延滞金",
                  "v": 2.75508,
                  "prevV": null
                },
                {
                  "name": "過料",
                  "v": 0.04011,
                  "prevV": null
                },
                {
                  "name": "加算金",
                  "v": 0.00001,
                  "prevV": null
                }
              ]
            },
            {
              "name": "収納資金貸付金元利収入",
              "v": 0.3774,
              "prevV": null,
              "moku": [
                {
                  "name": "市民費収納資金貸付金元利収入",
                  "v": 0.25189,
                  "prevV": null
                },
                {
                  "name": "総務費収納資金貸付金元利収入",
                  "v": 0.09552,
                  "prevV": null
                },
                {
                  "name": "建築費収納資金貸付金元利収入",
                  "v": 0.01,
                  "prevV": null
                },
                {
                  "name": "資源循環費収納資金貸付金元利収入",
                  "v": 0.00999,
                  "prevV": null
                },
                {
                  "name": "教育費収納資金貸付金元利収入",
                  "v": 0.0044,
                  "prevV": null
                },
                {
                  "name": "健康福祉費収納資金貸付金元利収入",
                  "v": 0.0036,
                  "prevV": null
                },
                {
                  "name": "みどり環境費収納資金貸付金元利収入",
                  "v": 0.0011,
                  "prevV": null
                },
                {
                  "name": "医療費収納資金貸付金元利収入",
                  "v": 0.0008,
                  "prevV": null
                },
                {
                  "name": "港湾費収納資金貸付金元利収入",
                  "v": 0.0001,
                  "prevV": null
                }
              ]
            },
            {
              "name": "市預金利子",
              "v": 0.004,
              "prevV": null,
              "moku": [
                {
                  "name": "市預金利子",
                  "v": 0.004,
                  "prevV": null
                }
              ]
            }
          ],
          "市債": [
            {
              "name": "市債",
              "v": 1065.77,
              "prevV": null,
              "moku": [
                {
                  "name": "教育債",
                  "v": 240.65,
                  "prevV": null
                },
                {
                  "name": "道路債",
                  "v": 156.17,
                  "prevV": null
                },
                {
                  "name": "建築債",
                  "v": 77.24,
                  "prevV": null
                },
                {
                  "name": "みどり環境債",
                  "v": 74.67,
                  "prevV": null
                },
                {
                  "name": "にぎわいスポーツ文化債",
                  "v": 72.24,
                  "prevV": null
                },
                {
                  "name": "臨時財政対策債",
                  "v": 70,
                  "prevV": null
                },
                {
                  "name": "港湾債",
                  "v": 69.3,
                  "prevV": null
                },
                {
                  "name": "健康福祉債",
                  "v": 57.62,
                  "prevV": null
                },
                {
                  "name": "諸支出債",
                  "v": 49.99,
                  "prevV": null
                },
                {
                  "name": "資源循環債",
                  "v": 48.37,
                  "prevV": null
                },
                {
                  "name": "消防債",
                  "v": 44.44,
                  "prevV": null
                },
                {
                  "name": "総務債",
                  "v": 42.59,
                  "prevV": null
                },
                {
                  "name": "都市整備債",
                  "v": 27.74,
                  "prevV": null
                },
                {
                  "name": "こども青少年債",
                  "v": 15.69,
                  "prevV": null
                },
                {
                  "name": "市民債",
                  "v": 12.08,
                  "prevV": null
                },
                {
                  "name": "河川債",
                  "v": 6.6,
                  "prevV": null
                },
                {
                  "name": "医療債",
                  "v": 0.38,
                  "prevV": null
                }
              ]
            }
          ]
        },
        "expenditure": {
          "議会費": [
            {
              "name": "議会費",
              "v": 31.76115,
              "prevV": null,
              "moku": [
                {
                  "name": "議会費",
                  "v": 31.76115,
                  "prevV": null
                }
              ]
            }
          ],
          "総務費": [
            {
              "name": "総務費",
              "v": 518.17666,
              "prevV": null,
              "moku": [
                {
                  "name": "行政運営費",
                  "v": 253.77415,
                  "prevV": null
                },
                {
                  "name": "人事管理費",
                  "v": 155.31916,
                  "prevV": null
                },
                {
                  "name": "デジタル統括推進費",
                  "v": 97.42657,
                  "prevV": null
                },
                {
                  "name": "危機管理費",
                  "v": 11.65678,
                  "prevV": null
                }
              ]
            },
            {
              "name": "税務費",
              "v": 144.2908,
              "prevV": null,
              "moku": [
                {
                  "name": "税務管理費",
                  "v": 88.31238,
                  "prevV": null
                },
                {
                  "name": "賦課徴収費",
                  "v": 55.97842,
                  "prevV": null
                }
              ]
            },
            {
              "name": "GREEN×EXPO推進費",
              "v": 96.59876,
              "prevV": null,
              "moku": [
                {
                  "name": "GREEN×EXPO推進費",
                  "v": 96.59876,
                  "prevV": null
                }
              ]
            },
            {
              "name": "政策経営費",
              "v": 51.51987,
              "prevV": null,
              "moku": [
                {
                  "name": "政策経営推進費",
                  "v": 51.11371,
                  "prevV": null
                },
                {
                  "name": "統計情報費",
                  "v": 0.40616,
                  "prevV": null
                }
              ]
            },
            {
              "name": "脱炭素推進費",
              "v": 51.13409,
              "prevV": null,
              "moku": [
                {
                  "name": "脱炭素推進費",
                  "v": 51.13409,
                  "prevV": null
                }
              ]
            },
            {
              "name": "財政費",
              "v": 44.53684,
              "prevV": null,
              "moku": [
                {
                  "name": "財政運営費",
                  "v": 41.66204,
                  "prevV": null
                },
                {
                  "name": "ファシリティマネジメント推進費",
                  "v": 2.8748,
                  "prevV": null
                }
              ]
            },
            {
              "name": "会計管理費",
              "v": 27.39545,
              "prevV": null,
              "moku": [
                {
                  "name": "会計管理費",
                  "v": 27.39545,
                  "prevV": null
                }
              ]
            },
            {
              "name": "国際費",
              "v": 20.71929,
              "prevV": null,
              "moku": [
                {
                  "name": "国際費",
                  "v": 20.71929,
                  "prevV": null
                }
              ]
            },
            {
              "name": "選挙費",
              "v": 9.15597,
              "prevV": null,
              "moku": [
                {
                  "name": "選挙管理委員会費",
                  "v": 9.15597,
                  "prevV": null
                }
              ]
            },
            {
              "name": "監査費",
              "v": 4.48739,
              "prevV": null,
              "moku": [
                {
                  "name": "監査委員費",
                  "v": 4.31234,
                  "prevV": null
                },
                {
                  "name": "外部監査費",
                  "v": 0.17505,
                  "prevV": null
                }
              ]
            },
            {
              "name": "人事委員会費",
              "v": 3.29685,
              "prevV": null,
              "moku": [
                {
                  "name": "人事委員会費",
                  "v": 3.29685,
                  "prevV": null
                }
              ]
            }
          ],
          "市民費": [
            {
              "name": "地域行政費",
              "v": 287.75076,
              "prevV": null,
              "moku": [
                {
                  "name": "個性ある区づくり推進費",
                  "v": 166.26832,
                  "prevV": null
                },
                {
                  "name": "戸籍住民登録費",
                  "v": 91.04294,
                  "prevV": null
                },
                {
                  "name": "地域施設費",
                  "v": 30.4395,
                  "prevV": null
                }
              ]
            },
            {
              "name": "市民行政費",
              "v": 155.53554,
              "prevV": null,
              "moku": [
                {
                  "name": "市民総務費",
                  "v": 133.82063,
                  "prevV": null
                },
                {
                  "name": "市民協働推進費",
                  "v": 21.22339,
                  "prevV": null
                },
                {
                  "name": "人権施策推進費",
                  "v": 0.49152,
                  "prevV": null
                }
              ]
            }
          ],
          "にぎわいスポーツ文化費": [
            {
              "name": "にぎわいスポーツ文化費",
              "v": 218.7826,
              "prevV": null,
              "moku": [
                {
                  "name": "文化芸術創造都市推進費",
                  "v": 100.41712,
                  "prevV": null
                },
                {
                  "name": "スポーツ振興費",
                  "v": 57.06734,
                  "prevV": null
                },
                {
                  "name": "にぎわい観光ＭＩＣＥ振興費",
                  "v": 46.84138,
                  "prevV": null
                },
                {
                  "name": "にぎわい総務費",
                  "v": 14.45676,
                  "prevV": null
                }
              ]
            }
          ],
          "経済費": [
            {
              "name": "経済費",
              "v": 824.49344,
              "prevV": null,
              "moku": [
                {
                  "name": "中小企業金融対策費",
                  "v": 740.82961,
                  "prevV": null
                },
                {
                  "name": "誘致イノベーション推進費",
                  "v": 48.69326,
                  "prevV": null
                },
                {
                  "name": "経済総務費",
                  "v": 14.69451,
                  "prevV": null
                },
                {
                  "name": "市民経済労働費",
                  "v": 12.53074,
                  "prevV": null
                },
                {
                  "name": "中小企業経営支援費",
                  "v": 7.74532,
                  "prevV": null
                }
              ]
            }
          ],
          "こども青少年費": [
            {
              "name": "子育て支援費",
              "v": 2239.66019,
              "prevV": null,
              "moku": [
                {
                  "name": "保育・教育施設運営費",
                  "v": 1911.00128,
                  "prevV": null
                },
                {
                  "name": "放課後児童育成費",
                  "v": 150.21386,
                  "prevV": null
                },
                {
                  "name": "幼児教育費",
                  "v": 111.58273,
                  "prevV": null
                },
                {
                  "name": "地域子育て支援費",
                  "v": 38.74804,
                  "prevV": null
                },
                {
                  "name": "保育所等整備費",
                  "v": 28.11428,
                  "prevV": null
                }
              ]
            },
            {
              "name": "こども福祉保健費",
              "v": 1215.12592,
              "prevV": null,
              "moku": [
                {
                  "name": "こども手当費",
                  "v": 647.32197,
                  "prevV": null
                },
                {
                  "name": "こども家庭福祉費",
                  "v": 258.58016,
                  "prevV": null
                },
                {
                  "name": "児童措置費",
                  "v": 113.87833,
                  "prevV": null
                },
                {
                  "name": "親子保健費",
                  "v": 99.77453,
                  "prevV": null
                },
                {
                  "name": "児童福祉施設運営費",
                  "v": 45.89125,
                  "prevV": null
                },
                {
                  "name": "児童相談所費",
                  "v": 27.52918,
                  "prevV": null
                },
                {
                  "name": "児童福祉施設整備費",
                  "v": 22.1505,
                  "prevV": null
                }
              ]
            },
            {
              "name": "青少年費",
              "v": 240.41432,
              "prevV": null,
              "moku": [
                {
                  "name": "こども青少年総務費",
                  "v": 223.71283,
                  "prevV": null
                },
                {
                  "name": "青少年育成費",
                  "v": 16.70149,
                  "prevV": null
                }
              ]
            }
          ],
          "健康福祉費": [
            {
              "name": "障害者福祉費",
              "v": 1400.73665,
              "prevV": null,
              "moku": [
                {
                  "name": "障害者福祉費",
                  "v": 1184.31762,
                  "prevV": null
                },
                {
                  "name": "重度障害者医療費",
                  "v": 157.40031,
                  "prevV": null
                },
                {
                  "name": "リハビリテーションセンター等運営費",
                  "v": 33.60479,
                  "prevV": null
                },
                {
                  "name": "障害者手当費",
                  "v": 12.58648,
                  "prevV": null
                },
                {
                  "name": "障害者福祉施設運営費",
                  "v": 6.5328,
                  "prevV": null
                },
                {
                  "name": "こころの健康相談センター等運営費",
                  "v": 6.29465,
                  "prevV": null
                }
              ]
            },
            {
              "name": "生活援護費",
              "v": 1369.47502,
              "prevV": null,
              "moku": [
                {
                  "name": "生活保護費",
                  "v": 1348.02647,
                  "prevV": null
                },
                {
                  "name": "援護対策費",
                  "v": 21.44855,
                  "prevV": null
                }
              ]
            },
            {
              "name": "社会福祉費",
              "v": 520.29561,
              "prevV": null,
              "moku": [
                {
                  "name": "社会福祉総務費",
                  "v": 255.05162,
                  "prevV": null
                },
                {
                  "name": "小児医療費",
                  "v": 143.53938,
                  "prevV": null
                },
                {
                  "name": "社会福祉事業振興費",
                  "v": 76.05447,
                  "prevV": null
                },
                {
                  "name": "葬務費",
                  "v": 27.18144,
                  "prevV": null
                },
                {
                  "name": "ひとり親家庭等医療費",
                  "v": 16.82574,
                  "prevV": null
                },
                {
                  "name": "国民年金費",
                  "v": 1.64296,
                  "prevV": null
                }
              ]
            },
            {
              "name": "老人福祉費",
              "v": 136.72541,
              "prevV": null,
              "moku": [
                {
                  "name": "老人福祉費",
                  "v": 104.0144,
                  "prevV": null
                },
                {
                  "name": "老人措置費",
                  "v": 30.70392,
                  "prevV": null
                },
                {
                  "name": "老人福祉施設運営費",
                  "v": 2.00709,
                  "prevV": null
                }
              ]
            },
            {
              "name": "健康推進費",
              "v": 104.99284,
              "prevV": null,
              "moku": [
                {
                  "name": "地域保健推進費",
                  "v": 99.36792,
                  "prevV": null
                },
                {
                  "name": "健康づくり費",
                  "v": 5.62492,
                  "prevV": null
                }
              ]
            },
            {
              "name": "健康福祉施設整備費",
              "v": 88.55428,
              "prevV": null,
              "moku": [
                {
                  "name": "健康福祉施設整備費",
                  "v": 88.55428,
                  "prevV": null
                }
              ]
            }
          ],
          "医療費": [
            {
              "name": "公衆衛生費",
              "v": 198.22223,
              "prevV": null,
              "moku": [
                {
                  "name": "健康安全費",
                  "v": 190.02575,
                  "prevV": null
                },
                {
                  "name": "環境衛生費",
                  "v": 8.19648,
                  "prevV": null
                }
              ]
            },
            {
              "name": "医療政策費",
              "v": 68.32961,
              "prevV": null,
              "moku": [
                {
                  "name": "医療政策費",
                  "v": 39.8639,
                  "prevV": null
                },
                {
                  "name": "地域医療費",
                  "v": 28.46571,
                  "prevV": null
                }
              ]
            }
          ],
          "みどり環境費": [
            {
              "name": "環境整備費",
              "v": 130.54144,
              "prevV": null,
              "moku": [
                {
                  "name": "公園緑地整備費",
                  "v": 130.54144,
                  "prevV": null
                }
              ]
            },
            {
              "name": "環境施設費",
              "v": 99.12085,
              "prevV": null,
              "moku": [
                {
                  "name": "公園緑地管理費",
                  "v": 74.32497,
                  "prevV": null
                },
                {
                  "name": "動物園費",
                  "v": 24.79588,
                  "prevV": null
                }
              ]
            },
            {
              "name": "みどり環境総務費",
              "v": 91.7588,
              "prevV": null,
              "moku": [
                {
                  "name": "みどり環境総務費",
                  "v": 61.77968,
                  "prevV": null
                },
                {
                  "name": "みどり基金積立金",
                  "v": 29.35,
                  "prevV": null
                },
                {
                  "name": "地籍調査費",
                  "v": 0.62912,
                  "prevV": null
                }
              ]
            },
            {
              "name": "環境活動推進費",
              "v": 7.64762,
              "prevV": null,
              "moku": [
                {
                  "name": "農政推進費",
                  "v": 3.9487,
                  "prevV": null
                },
                {
                  "name": "環境活動事業費",
                  "v": 2.82447,
                  "prevV": null
                },
                {
                  "name": "農業振興費",
                  "v": 0.87445,
                  "prevV": null
                }
              ]
            },
            {
              "name": "環境保全費",
              "v": 3.68287,
              "prevV": null,
              "moku": [
                {
                  "name": "環境保全事業費",
                  "v": 3.68287,
                  "prevV": null
                }
              ]
            },
            {
              "name": "総合企画費",
              "v": 3.25255,
              "prevV": null,
              "moku": [
                {
                  "name": "環境科学研究費",
                  "v": 1.81261,
                  "prevV": null
                },
                {
                  "name": "建設発生土対策費",
                  "v": 0.8371,
                  "prevV": null
                },
                {
                  "name": "環境政策費",
                  "v": 0.60284,
                  "prevV": null
                }
              ]
            }
          ],
          "資源循環費": [
            {
              "name": "適正処理費",
              "v": 242.92014,
              "prevV": null,
              "moku": [
                {
                  "name": "工場費",
                  "v": 108.5407,
                  "prevV": null
                },
                {
                  "name": "適正処理総務費",
                  "v": 70.8787,
                  "prevV": null
                },
                {
                  "name": "処分地費",
                  "v": 60.09189,
                  "prevV": null
                },
                {
                  "name": "産業廃棄物対策費",
                  "v": 3.40885,
                  "prevV": null
                }
              ]
            },
            {
              "name": "資源循環管理費",
              "v": 235.48418,
              "prevV": null,
              "moku": [
                {
                  "name": "資源循環総務費",
                  "v": 153.8903,
                  "prevV": null
                },
                {
                  "name": "減量・リサイクル推進費",
                  "v": 59.81822,
                  "prevV": null
                },
                {
                  "name": "車両管理費",
                  "v": 17.31879,
                  "prevV": null
                },
                {
                  "name": "事務所費",
                  "v": 4.45687,
                  "prevV": null
                }
              ]
            },
            {
              "name": "し尿処理費",
              "v": 3.28896,
              "prevV": null,
              "moku": [
                {
                  "name": "し尿処理総務費",
                  "v": 1.78137,
                  "prevV": null
                },
                {
                  "name": "し尿処理施設費",
                  "v": 1.50759,
                  "prevV": null
                }
              ]
            }
          ],
          "建築費": [
            {
              "name": "住宅費",
              "v": 182.52499,
              "prevV": null,
              "moku": [
                {
                  "name": "市営住宅管理費",
                  "v": 82.52789,
                  "prevV": null
                },
                {
                  "name": "市営住宅整備費",
                  "v": 81.14187,
                  "prevV": null
                },
                {
                  "name": "優良賃貸住宅事業費",
                  "v": 13.40988,
                  "prevV": null
                },
                {
                  "name": "住宅施策推進費",
                  "v": 5.44535,
                  "prevV": null
                }
              ]
            },
            {
              "name": "建築指導費",
              "v": 106.39242,
              "prevV": null,
              "moku": [
                {
                  "name": "建築行政総務費",
                  "v": 73.30496,
                  "prevV": null
                },
                {
                  "name": "公共建築物長寿命化対策費",
                  "v": 31.42007,
                  "prevV": null
                },
                {
                  "name": "都市計画調査費",
                  "v": 1.29936,
                  "prevV": null
                },
                {
                  "name": "工事監理費",
                  "v": 0.36803,
                  "prevV": null
                }
              ]
            }
          ],
          "都市整備費": [
            {
              "name": "都市整備費",
              "v": 108.42321,
              "prevV": null,
              "moku": [
                {
                  "name": "地域整備費",
                  "v": 56.75709,
                  "prevV": null
                },
                {
                  "name": "都市交通費",
                  "v": 27.82523,
                  "prevV": null
                },
                {
                  "name": "企画費",
                  "v": 23.84089,
                  "prevV": null
                }
              ]
            }
          ],
          "道路費": [
            {
              "name": "道路整備費",
              "v": 410.56879,
              "prevV": null,
              "moku": [
                {
                  "name": "街路整備費",
                  "v": 231.28129,
                  "prevV": null
                },
                {
                  "name": "道路特別整備費",
                  "v": 139.27565,
                  "prevV": null
                },
                {
                  "name": "道路費負担金",
                  "v": 39.23667,
                  "prevV": null
                },
                {
                  "name": "高速道路等整備費",
                  "v": 0.77518,
                  "prevV": null
                }
              ]
            },
            {
              "name": "道路維持管理費",
              "v": 251.96964,
              "prevV": null,
              "moku": [
                {
                  "name": "道路等維持費",
                  "v": 133.99207,
                  "prevV": null
                },
                {
                  "name": "道路行政総務費",
                  "v": 62.3312,
                  "prevV": null
                },
                {
                  "name": "道路等管理費",
                  "v": 32.6097,
                  "prevV": null
                },
                {
                  "name": "自転車政策推進費",
                  "v": 23.03667,
                  "prevV": null
                }
              ]
            }
          ],
          "河川費": [
            {
              "name": "河川費",
              "v": 44.38132,
              "prevV": null,
              "moku": [
                {
                  "name": "河川整備費",
                  "v": 25.17576,
                  "prevV": null
                },
                {
                  "name": "河川管理費",
                  "v": 19.20556,
                  "prevV": null
                }
              ]
            }
          ],
          "港湾費": [
            {
              "name": "港湾整備費",
              "v": 94.85663,
              "prevV": null,
              "moku": [
                {
                  "name": "港湾整備費負担金",
                  "v": 65.54,
                  "prevV": null
                },
                {
                  "name": "港湾環境施設等整備費",
                  "v": 17,
                  "prevV": null
                },
                {
                  "name": "港湾施設等改良費",
                  "v": 12.31663,
                  "prevV": null
                }
              ]
            },
            {
              "name": "港湾管理費",
              "v": 77.75264,
              "prevV": null,
              "moku": [
                {
                  "name": "港湾総務費",
                  "v": 26.866,
                  "prevV": null
                },
                {
                  "name": "みなと賑わい振興費",
                  "v": 23.62858,
                  "prevV": null
                },
                {
                  "name": "港湾管理費",
                  "v": 9.7491,
                  "prevV": null
                },
                {
                  "name": "港湾物流費",
                  "v": 9.46935,
                  "prevV": null
                },
                {
                  "name": "港湾施設等維持費",
                  "v": 8.03961,
                  "prevV": null
                }
              ]
            }
          ],
          "消防費": [
            {
              "name": "消防費",
              "v": 437.66511,
              "prevV": null,
              "moku": [
                {
                  "name": "消防総務費",
                  "v": 347.19468,
                  "prevV": null
                },
                {
                  "name": "消防施設費",
                  "v": 41.24799,
                  "prevV": null
                },
                {
                  "name": "消防団費",
                  "v": 24.09811,
                  "prevV": null
                },
                {
                  "name": "警防活動費",
                  "v": 16.47681,
                  "prevV": null
                },
                {
                  "name": "航空活動費",
                  "v": 3.93772,
                  "prevV": null
                },
                {
                  "name": "消防研修費",
                  "v": 2.83323,
                  "prevV": null
                },
                {
                  "name": "予防活動費",
                  "v": 1.87657,
                  "prevV": null
                }
              ]
            }
          ],
          "教育費": [
            {
              "name": "教育総務費",
              "v": 1954.57856,
              "prevV": null,
              "moku": [
                {
                  "name": "教職員費",
                  "v": 1720.4888,
                  "prevV": null
                },
                {
                  "name": "事務局費",
                  "v": 113.9032,
                  "prevV": null
                },
                {
                  "name": "教育指導振興費",
                  "v": 92.79774,
                  "prevV": null
                },
                {
                  "name": "教育相談費",
                  "v": 17.45223,
                  "prevV": null
                },
                {
                  "name": "特別支援教育指導振興費",
                  "v": 7.2604,
                  "prevV": null
                },
                {
                  "name": "教育センター費",
                  "v": 2.46259,
                  "prevV": null
                },
                {
                  "name": "教育委員会費",
                  "v": 0.2136,
                  "prevV": null
                }
              ]
            },
            {
              "name": "教育施設整備費",
              "v": 354.34054,
              "prevV": null,
              "moku": [
                {
                  "name": "学校施設営繕費",
                  "v": 205.25227,
                  "prevV": null
                },
                {
                  "name": "小・中学校整備費",
                  "v": 131.33638,
                  "prevV": null
                },
                {
                  "name": "学校用地費",
                  "v": 13.70527,
                  "prevV": null
                },
                {
                  "name": "特別支援教育施設整備費",
                  "v": 1.6178,
                  "prevV": null
                },
                {
                  "name": "高等学校整備費",
                  "v": 1.24304,
                  "prevV": null
                },
                {
                  "name": "学校施設整備基金積立金",
                  "v": 1.18578,
                  "prevV": null
                }
              ]
            },
            {
              "name": "学校保健体育費",
              "v": 274.27733,
              "prevV": null,
              "moku": [
                {
                  "name": "学校給食費",
                  "v": 142.0125,
                  "prevV": null
                },
                {
                  "name": "学校給食物資購入費",
                  "v": 118.30266,
                  "prevV": null
                },
                {
                  "name": "学校保健費",
                  "v": 7.36405,
                  "prevV": null
                },
                {
                  "name": "学校体育費",
                  "v": 6.59812,
                  "prevV": null
                }
              ]
            },
            {
              "name": "小学校費",
              "v": 141.46112,
              "prevV": null,
              "moku": [
                {
                  "name": "学校管理費",
                  "v": 103.4695,
                  "prevV": null
                },
                {
                  "name": "学校運営費",
                  "v": 37.99162,
                  "prevV": null
                }
              ]
            },
            {
              "name": "中学校費",
              "v": 67.72397,
              "prevV": null,
              "moku": [
                {
                  "name": "学校管理費",
                  "v": 39.93902,
                  "prevV": null
                },
                {
                  "name": "学校運営費",
                  "v": 27.78495,
                  "prevV": null
                }
              ]
            },
            {
              "name": "生涯学習費",
              "v": 38.56988,
              "prevV": null,
              "moku": [
                {
                  "name": "図書館費",
                  "v": 21.52704,
                  "prevV": null
                },
                {
                  "name": "文化財保護費",
                  "v": 11.63425,
                  "prevV": null
                },
                {
                  "name": "生涯学習推進費",
                  "v": 5.40859,
                  "prevV": null
                }
              ]
            },
            {
              "name": "特別支援学校費",
              "v": 18.16005,
              "prevV": null,
              "moku": [
                {
                  "name": "学校管理費",
                  "v": 15.50438,
                  "prevV": null
                },
                {
                  "name": "学校運営費",
                  "v": 2.65567,
                  "prevV": null
                }
              ]
            },
            {
              "name": "高等学校費",
              "v": 11.21063,
              "prevV": null,
              "moku": [
                {
                  "name": "学校管理費",
                  "v": 7.72698,
                  "prevV": null
                },
                {
                  "name": "学校運営費",
                  "v": 3.48365,
                  "prevV": null
                }
              ]
            }
          ],
          "公債費": [
            {
              "name": "公債費",
              "v": 1705.30898,
              "prevV": null,
              "moku": [
                {
                  "name": "元金",
                  "v": 1474.9089,
                  "prevV": null
                },
                {
                  "name": "利子",
                  "v": 221.96714,
                  "prevV": null
                },
                {
                  "name": "公債諸費",
                  "v": 8.43294,
                  "prevV": null
                }
              ]
            },
            {
              "name": "第三セクター等改革推進債公債費",
              "v": 35.80428,
              "prevV": null,
              "moku": [
                {
                  "name": "元金",
                  "v": 34.89602,
                  "prevV": null
                },
                {
                  "name": "利子",
                  "v": 0.75895,
                  "prevV": null
                },
                {
                  "name": "公債諸費",
                  "v": 0.14931,
                  "prevV": null
                }
              ]
            }
          ],
          "諸支出金": [
            {
              "name": "特別会計繰出金",
              "v": 1939.7037,
              "prevV": null,
              "moku": [
                {
                  "name": "介護保険事業費会計繰出金",
                  "v": 508.91588,
                  "prevV": null
                },
                {
                  "name": "後期高齢者医療事業費会計繰出金",
                  "v": 432.5902,
                  "prevV": null
                },
                {
                  "name": "下水道事業会計繰出金",
                  "v": 352.38954,
                  "prevV": null
                },
                {
                  "name": "国民健康保険事業費会計繰出金",
                  "v": 275.52868,
                  "prevV": null
                },
                {
                  "name": "高速鉄道事業会計繰出金",
                  "v": 93.17601,
                  "prevV": null
                },
                {
                  "name": "病院事業会計繰出金",
                  "v": 76.01924,
                  "prevV": null
                },
                {
                  "name": "自動車事業会計繰出金",
                  "v": 58.24718,
                  "prevV": null
                },
                {
                  "name": "市街地開発事業費会計繰出金",
                  "v": 39.05714,
                  "prevV": null
                },
                {
                  "name": "みどり保全創造事業費会計繰出金",
                  "v": 36.00064,
                  "prevV": null
                },
                {
                  "name": "水道事業会計繰出金",
                  "v": 30.67945,
                  "prevV": null
                },
                {
                  "name": "中央と畜場費会計繰出金",
                  "v": 24.24615,
                  "prevV": null
                },
                {
                  "name": "公共事業用地費会計繰出金",
                  "v": 5.50097,
                  "prevV": null
                },
                {
                  "name": "港湾整備事業費会計繰出金",
                  "v": 4.06994,
                  "prevV": null
                },
                {
                  "name": "中央卸売市場費会計繰出金",
                  "v": 1.45986,
                  "prevV": null
                },
                {
                  "name": "自動車駐車場事業費会計繰出金",
                  "v": 1.15255,
                  "prevV": null
                },
                {
                  "name": "母子父子寡婦福祉資金会計繰出金",
                  "v": 0.3473,
                  "prevV": null
                },
                {
                  "name": "勤労者福祉共済事業費会計繰出金",
                  "v": 0.19829,
                  "prevV": null
                },
                {
                  "name": "公害被害者救済事業費会計繰出金",
                  "v": 0.10092,
                  "prevV": null
                },
                {
                  "name": "工業用水道事業会計繰出金",
                  "v": 0.02376,
                  "prevV": null
                }
              ]
            }
          ],
          "予備費": [
            {
              "name": "予備費",
              "v": 10,
              "prevV": null,
              "moku": [
                {
                  "name": "予備費",
                  "v": 10,
                  "prevV": null
                }
              ]
            }
          ]
        }
      },
      "sourceTitle": "令和6年度 横浜市予算に関する説明書（歳入・歳出予算 款項目節 CSV）",
      "localUrl": "/sources/yokohama-yosan-meisai-r6/r6sainyu_saisyutsu.zip",
      "refLabel": "r6sainyu_saisyutsu.zip",
      "originUrl": "https://www.city.yokohama.lg.jp/city-info/zaisei/jokyo/yosan/r6/r6.files/r6sainyu_saisyutsu.zip",
      "archiveUrl": "https://web.archive.org/web/20251024204137/https://www.city.yokohama.lg.jp/city-info/zaisei/jokyo/yosan/r6/r6.files/r6sainyu_saisyutsu.zip"
    },
    {
      "fy": "R5",
      "fyLabel": "令和5年度 当初予算",
      "byKan": {
        "revenue": {
          "市税": [
            {
              "name": "市民税",
              "v": 4649.18,
              "prevV": 4536.28,
              "moku": [
                {
                  "name": "個人",
                  "v": 4172.22,
                  "prevV": 4062.14
                },
                {
                  "name": "法人",
                  "v": 476.96,
                  "prevV": 474.14
                }
              ]
            },
            {
              "name": "固定資産税",
              "v": 2899.06,
              "prevV": 2846.92,
              "moku": [
                {
                  "name": "固定資産税",
                  "v": 2890.01,
                  "prevV": 2837.56
                },
                {
                  "name": "国有資産等所在市町村交付金及び納付金",
                  "v": 9.05,
                  "prevV": 9.36
                }
              ]
            },
            {
              "name": "都市計画税",
              "v": 629.11,
              "prevV": 616.8,
              "moku": [
                {
                  "name": "都市計画税",
                  "v": 629.11,
                  "prevV": 616.8
                }
              ]
            },
            {
              "name": "市たばこ税",
              "v": 218.75,
              "prevV": 219.08,
              "moku": [
                {
                  "name": "市たばこ税",
                  "v": 218.75,
                  "prevV": 219.08
                }
              ]
            },
            {
              "name": "事業所税",
              "v": 187.37,
              "prevV": 184.3,
              "moku": [
                {
                  "name": "事業所税",
                  "v": 187.37,
                  "prevV": 184.3
                }
              ]
            },
            {
              "name": "軽自動車税",
              "v": 34.79,
              "prevV": 34.32,
              "moku": [
                {
                  "name": "種別割",
                  "v": 32.43,
                  "prevV": 31.48
                },
                {
                  "name": "環境性能割",
                  "v": 2.36,
                  "prevV": 2.84
                }
              ]
            },
            {
              "name": "入湯税",
              "v": 0.63,
              "prevV": 0.42,
              "moku": [
                {
                  "name": "入湯税",
                  "v": 0.63,
                  "prevV": 0.42
                }
              ]
            }
          ],
          "地方譲与税": [
            {
              "name": "自動車重量譲与税",
              "v": 45.64,
              "prevV": 43.98,
              "moku": [
                {
                  "name": "自動車重量譲与税",
                  "v": 45.64,
                  "prevV": 43.98
                }
              ]
            },
            {
              "name": "地方揮発油譲与税",
              "v": 26.59,
              "prevV": 27.65,
              "moku": [
                {
                  "name": "地方揮発油譲与税",
                  "v": 26.59,
                  "prevV": 27.65
                }
              ]
            },
            {
              "name": "特別とん譲与税",
              "v": 10.13,
              "prevV": 9.77,
              "moku": [
                {
                  "name": "特別とん譲与税",
                  "v": 10.13,
                  "prevV": 9.77
                }
              ]
            },
            {
              "name": "森林環境譲与税",
              "v": 4,
              "prevV": 4,
              "moku": [
                {
                  "name": "森林環境譲与税",
                  "v": 4,
                  "prevV": 4
                }
              ]
            },
            {
              "name": "石油ガス譲与税",
              "v": 0.22,
              "prevV": 0.21,
              "moku": [
                {
                  "name": "石油ガス譲与税",
                  "v": 0.22,
                  "prevV": 0.21
                }
              ]
            }
          ],
          "利子割交付金": [
            {
              "name": "利子割交付金",
              "v": 3.46,
              "prevV": 3.5,
              "moku": [
                {
                  "name": "利子割交付金",
                  "v": 3.46,
                  "prevV": 3.5
                }
              ]
            }
          ],
          "配当割交付金": [
            {
              "name": "配当割交付金",
              "v": 60.06,
              "prevV": 41.35,
              "moku": [
                {
                  "name": "配当割交付金",
                  "v": 60.06,
                  "prevV": 41.35
                }
              ]
            }
          ],
          "株式等譲渡所得割交付金": [
            {
              "name": "株式等譲渡所得割交付金",
              "v": 42.14,
              "prevV": 32.42,
              "moku": [
                {
                  "name": "株式等譲渡所得割交付金",
                  "v": 42.14,
                  "prevV": 32.42
                }
              ]
            }
          ],
          "分離課税所得割交付金": [
            {
              "name": "分離課税所得割交付金",
              "v": 10.36,
              "prevV": 10.59,
              "moku": [
                {
                  "name": "分離課税所得割交付金",
                  "v": 10.36,
                  "prevV": 10.59
                }
              ]
            }
          ],
          "法人事業税交付金": [
            {
              "name": "法人事業税交付金",
              "v": 95.39,
              "prevV": 84.25,
              "moku": [
                {
                  "name": "法人事業税交付金",
                  "v": 95.39,
                  "prevV": 84.25
                }
              ]
            }
          ],
          "地方消費税交付金": [
            {
              "name": "地方消費税交付金",
              "v": 911.06,
              "prevV": 829.07,
              "moku": [
                {
                  "name": "地方消費税交付金",
                  "v": 911.06,
                  "prevV": 829.07
                }
              ]
            }
          ],
          "ゴルフ場利用税交付金": [
            {
              "name": "ゴルフ場利用税交付金",
              "v": 1.51,
              "prevV": 1.45,
              "moku": [
                {
                  "name": "ゴルフ場利用税交付金",
                  "v": 1.51,
                  "prevV": 1.45
                }
              ]
            }
          ],
          "環境性能割交付金": [
            {
              "name": "環境性能割交付金",
              "v": 24.16,
              "prevV": 25.28,
              "moku": [
                {
                  "name": "環境性能割交付金",
                  "v": 24.15999,
                  "prevV": 25.27999
                },
                {
                  "name": "旧法による自動車取得税交付金",
                  "v": 0.00001,
                  "prevV": 0.00001
                }
              ]
            }
          ],
          "軽油引取税交付金": [
            {
              "name": "軽油引取税交付金",
              "v": 120.34,
              "prevV": 114.88,
              "moku": [
                {
                  "name": "軽油引取税交付金",
                  "v": 120.33,
                  "prevV": 114.87
                },
                {
                  "name": "旧法による軽油引取税交付金",
                  "v": 0.01,
                  "prevV": 0.01
                }
              ]
            }
          ],
          "国有提供施設等所在市町村助成交付金": [
            {
              "name": "国有提供施設等所在市町村助成交付金",
              "v": 5,
              "prevV": 5,
              "moku": [
                {
                  "name": "国有提供施設等所在市町村助成交付金",
                  "v": 5,
                  "prevV": 5
                }
              ]
            }
          ],
          "地方特例交付金": [
            {
              "name": "地方特例交付金",
              "v": 51.87,
              "prevV": 50.6,
              "moku": [
                {
                  "name": "地方特例交付金",
                  "v": 51.87,
                  "prevV": 50.6
                }
              ]
            },
            {
              "name": "新型コロナウイルス感染症対策地方税減収補填特別交付金",
              "v": 0.58,
              "prevV": 0.2,
              "moku": [
                {
                  "name": "新型コロナウイルス感染症対策地方税減収補填特別交付金",
                  "v": 0.58,
                  "prevV": 0.2
                }
              ]
            }
          ],
          "地方交付税": [
            {
              "name": "地方交付税",
              "v": 330,
              "prevV": 265,
              "moku": [
                {
                  "name": "地方交付税",
                  "v": 330,
                  "prevV": 265
                }
              ]
            }
          ],
          "交通安全対策特別交付金": [
            {
              "name": "交通安全対策特別交付金",
              "v": 8.37,
              "prevV": 8.4,
              "moku": [
                {
                  "name": "交通安全対策特別交付金",
                  "v": 8.37,
                  "prevV": 8.4
                }
              ]
            }
          ],
          "分担金及び負担金": [
            {
              "name": "負担金",
              "v": 298.51338,
              "prevV": 290.52799,
              "moku": [
                {
                  "name": "教育費負担金",
                  "v": 116.89774,
                  "prevV": 116.94986
                },
                {
                  "name": "こども青少年費負担金",
                  "v": 104.09689,
                  "prevV": 104.03421
                },
                {
                  "name": "健康福祉費負担金",
                  "v": 61.29783,
                  "prevV": 61.10872
                },
                {
                  "name": "道路費負担金",
                  "v": 7.35428,
                  "prevV": 5.57574
                },
                {
                  "name": "都市整備費負担金",
                  "v": 7.35,
                  "prevV": 1.63
                },
                {
                  "name": "港湾費負担金",
                  "v": 0.9882,
                  "prevV": 0.96079
                },
                {
                  "name": "資源循環費負担金",
                  "v": 0.30341,
                  "prevV": 0.04364
                },
                {
                  "name": "総務費負担金",
                  "v": 0.2,
                  "prevV": 0.2
                },
                {
                  "name": "消防費負担金",
                  "v": 0.02503,
                  "prevV": 0.02503
                }
              ]
            }
          ],
          "使用料及び手数料": [
            {
              "name": "使用料",
              "v": 386.85279,
              "prevV": 387.21687,
              "moku": [
                {
                  "name": "建築使用料",
                  "v": 108.08747,
                  "prevV": 108.63341
                },
                {
                  "name": "港湾使用料",
                  "v": 103.10103,
                  "prevV": 97.5462
                },
                {
                  "name": "道路使用料",
                  "v": 73.3387,
                  "prevV": 73.53525
                },
                {
                  "name": "こども青少年使用料",
                  "v": 65.67622,
                  "prevV": 69.87508
                },
                {
                  "name": "健康福祉使用料",
                  "v": 13.60433,
                  "prevV": 14.60218
                },
                {
                  "name": "環境創造使用料",
                  "v": 10.67682,
                  "prevV": 10.67055
                },
                {
                  "name": "教育使用料",
                  "v": 8.89667,
                  "prevV": 8.90124
                },
                {
                  "name": "総務使用料",
                  "v": 2.08345,
                  "prevV": 1.97271
                },
                {
                  "name": "市民使用料",
                  "v": 0.5859,
                  "prevV": 0.65219
                },
                {
                  "name": "消防使用料",
                  "v": 0.49565,
                  "prevV": 0.52094
                },
                {
                  "name": "経済使用料",
                  "v": 0.23445,
                  "prevV": 0.23447
                },
                {
                  "name": "文化観光使用料",
                  "v": 0.0721,
                  "prevV": 0.07265
                }
              ]
            },
            {
              "name": "手数料",
              "v": 103.97148,
              "prevV": 104.49913,
              "moku": [
                {
                  "name": "資源循環手数料",
                  "v": 55.08528,
                  "prevV": 56.41263
                },
                {
                  "name": "道路手数料",
                  "v": 22.47943,
                  "prevV": 22.57366
                },
                {
                  "name": "市民手数料",
                  "v": 15.856,
                  "prevV": 15.16614
                },
                {
                  "name": "健康福祉手数料",
                  "v": 3.42882,
                  "prevV": 3.36052
                },
                {
                  "name": "建築手数料",
                  "v": 2.24951,
                  "prevV": 2.24349
                },
                {
                  "name": "総務手数料",
                  "v": 1.97402,
                  "prevV": 1.80193
                },
                {
                  "name": "消防手数料",
                  "v": 1.64663,
                  "prevV": 1.62575
                },
                {
                  "name": "都市整備手数料",
                  "v": 0.65999,
                  "prevV": 0.66262
                },
                {
                  "name": "経済手数料",
                  "v": 0.32839,
                  "prevV": 0.39049
                },
                {
                  "name": "教育手数料",
                  "v": 0.25316,
                  "prevV": 0.25395
                },
                {
                  "name": "環境創造手数料",
                  "v": 0.01006,
                  "prevV": 0.00776
                },
                {
                  "name": "港湾手数料",
                  "v": 0.0001,
                  "prevV": 0.0001
                },
                {
                  "name": "こども青少年手数料",
                  "v": 0.00009,
                  "prevV": 0.00009
                }
              ]
            }
          ],
          "国庫支出金": [
            {
              "name": "国庫負担金",
              "v": 3132.78243,
              "prevV": 2983.47984,
              "moku": [
                {
                  "name": "健康福祉費国庫負担金",
                  "v": 1654.92839,
                  "prevV": 1547.28926
                },
                {
                  "name": "こども青少年費国庫負担金",
                  "v": 1087.4326,
                  "prevV": 1058.49907
                },
                {
                  "name": "教育費国庫負担金",
                  "v": 390.28723,
                  "prevV": 377.63843
                },
                {
                  "name": "消防費国庫負担金",
                  "v": 0.13421,
                  "prevV": 0.05308
                }
              ]
            },
            {
              "name": "国庫補助金",
              "v": 872.43781,
              "prevV": 1013.63344,
              "moku": [
                {
                  "name": "健康福祉費国庫補助金",
                  "v": 223.75835,
                  "prevV": 327.27288
                },
                {
                  "name": "こども青少年費国庫補助金",
                  "v": 173.46009,
                  "prevV": 165.64467
                },
                {
                  "name": "道路費国庫補助金",
                  "v": 128.36439,
                  "prevV": 120.18958
                },
                {
                  "name": "市民費国庫補助金",
                  "v": 88.23738,
                  "prevV": 85.80604
                },
                {
                  "name": "教育費国庫補助金",
                  "v": 60.99488,
                  "prevV": 71.68474
                },
                {
                  "name": "環境創造費国庫補助金",
                  "v": 51.03232,
                  "prevV": 35.4882
                },
                {
                  "name": "建築費国庫補助金",
                  "v": 39.67788,
                  "prevV": 31.95344
                },
                {
                  "name": "経済費国庫補助金",
                  "v": 34.56012,
                  "prevV": 41.20364
                },
                {
                  "name": "新型コロナウイルス感染症対応地方創生臨時交付金",
                  "v": 33.50476,
                  "prevV": 95.82388
                },
                {
                  "name": "都市整備費国庫補助金",
                  "v": 23.36255,
                  "prevV": 13.77621
                },
                {
                  "name": "総務費国庫補助金",
                  "v": 6.26238,
                  "prevV": 5.57166
                },
                {
                  "name": "消防費国庫補助金",
                  "v": 3.37598,
                  "prevV": 1.55212
                },
                {
                  "name": "デジタル田園都市国家構想交付金",
                  "v": 2.43809,
                  "prevV": 2.04451
                },
                {
                  "name": "港湾費国庫補助金",
                  "v": 1.818,
                  "prevV": 2.29832
                },
                {
                  "name": "文化観光費国庫補助金",
                  "v": 1.03047,
                  "prevV": 3.9581
                },
                {
                  "name": "資源循環費国庫補助金",
                  "v": 0.56017,
                  "prevV": 9.36545
                }
              ]
            },
            {
              "name": "国庫委託金",
              "v": 13.20851,
              "prevV": 13.45722,
              "moku": [
                {
                  "name": "健康福祉費国庫委託金",
                  "v": 9.41297,
                  "prevV": 9.80749
                },
                {
                  "name": "教育費国庫委託金",
                  "v": 1.53942,
                  "prevV": 1.4704
                },
                {
                  "name": "経済費国庫委託金",
                  "v": 1.43592,
                  "prevV": 1.43592
                },
                {
                  "name": "市民費国庫委託金",
                  "v": 0.43984,
                  "prevV": 0.4398
                },
                {
                  "name": "こども青少年費国庫委託金",
                  "v": 0.3555,
                  "prevV": 0.28351
                },
                {
                  "name": "環境創造費国庫委託金",
                  "v": 0.013,
                  "prevV": 0.013
                },
                {
                  "name": "総務費国庫委託金",
                  "v": 0.01186,
                  "prevV": 0.0071
                }
              ]
            }
          ],
          "県支出金": [
            {
              "name": "県負担金",
              "v": 717.5342,
              "prevV": 691.7698,
              "moku": [
                {
                  "name": "こども青少年費県負担金",
                  "v": 371.47454,
                  "prevV": 360.58171
                },
                {
                  "name": "健康福祉費県負担金",
                  "v": 343.82223,
                  "prevV": 328.5281
                },
                {
                  "name": "総務費県負担金",
                  "v": 1.08,
                  "prevV": 1.27
                },
                {
                  "name": "道路費県負担金",
                  "v": 0.9658,
                  "prevV": 0.9558
                },
                {
                  "name": "環境創造費県負担金",
                  "v": 0.17901,
                  "prevV": 0.42157
                },
                {
                  "name": "建築費県負担金",
                  "v": 0.01262,
                  "prevV": 0.01262
                }
              ]
            },
            {
              "name": "県補助金",
              "v": 312.38881,
              "prevV": 260.29846,
              "moku": [
                {
                  "name": "健康福祉費県補助金",
                  "v": 201.45718,
                  "prevV": 162.38441
                },
                {
                  "name": "こども青少年費県補助金",
                  "v": 98.03838,
                  "prevV": 85.80677
                },
                {
                  "name": "道路費県補助金",
                  "v": 6.66,
                  "prevV": 5.78
                },
                {
                  "name": "消防費県補助金",
                  "v": 4.50554,
                  "prevV": 4.21912
                },
                {
                  "name": "建築費県補助金",
                  "v": 0.58631,
                  "prevV": 0.72794
                },
                {
                  "name": "経済費県補助金",
                  "v": 0.39237,
                  "prevV": 0.37937
                },
                {
                  "name": "市民費県補助金",
                  "v": 0.31437,
                  "prevV": 0.43256
                },
                {
                  "name": "環境創造費県補助金",
                  "v": 0.26238,
                  "prevV": 0.33588
                },
                {
                  "name": "港湾費県補助金",
                  "v": 0.09,
                  "prevV": 0.06772
                },
                {
                  "name": "教育費県補助金",
                  "v": 0.04866,
                  "prevV": 0.04888
                },
                {
                  "name": "総務費県補助金",
                  "v": 0.03362,
                  "prevV": 0.11581
                }
              ]
            },
            {
              "name": "県委託金",
              "v": 76.40195,
              "prevV": 84.63205,
              "moku": [
                {
                  "name": "総務費県委託金",
                  "v": 75.8637,
                  "prevV": 84.13878
                },
                {
                  "name": "健康福祉費県委託金",
                  "v": 0.50323,
                  "prevV": 0.46151
                },
                {
                  "name": "環境創造費県委託金",
                  "v": 0.01886,
                  "prevV": 0.01886
                },
                {
                  "name": "港湾費県委託金",
                  "v": 0.0129,
                  "prevV": 0.0129
                },
                {
                  "name": "こども青少年費県委託金",
                  "v": 0.00245,
                  "prevV": null
                },
                {
                  "name": "教育費県委託金",
                  "v": 0.00081,
                  "prevV": null
                }
              ]
            }
          ],
          "財産収入": [
            {
              "name": "財産運用収入",
              "v": 64.46748,
              "prevV": 63.49499,
              "moku": [
                {
                  "name": "財産貸付収入",
                  "v": 61.27243,
                  "prevV": 60.48953
                },
                {
                  "name": "利子及び配当金",
                  "v": 3.19505,
                  "prevV": 3.00546
                }
              ]
            },
            {
              "name": "財産売払収入",
              "v": 58.58947,
              "prevV": 326.57853,
              "moku": [
                {
                  "name": "不動産売払収入",
                  "v": 54.01909,
                  "prevV": 322.00528
                },
                {
                  "name": "有価証券売払収入",
                  "v": 4,
                  "prevV": 4
                },
                {
                  "name": "物品売払収入",
                  "v": 0.54305,
                  "prevV": 0.51782
                },
                {
                  "name": "生産物売払収入",
                  "v": 0.02733,
                  "prevV": 0.05543
                }
              ]
            }
          ],
          "寄附金": [
            {
              "name": "寄附金",
              "v": 89.95492,
              "prevV": 8.10891,
              "moku": [
                {
                  "name": "一般寄附金",
                  "v": 88.19497,
                  "prevV": 6.60178
                },
                {
                  "name": "指定寄附金",
                  "v": 1.75995,
                  "prevV": 1.50713
                }
              ]
            }
          ],
          "繰入金": [
            {
              "name": "減債基金繰入金",
              "v": 170,
              "prevV": 200,
              "moku": [
                {
                  "name": "減債基金繰入金",
                  "v": 170,
                  "prevV": 200
                }
              ]
            },
            {
              "name": "財政調整基金繰入金",
              "v": 142.56,
              "prevV": 175.96,
              "moku": [
                {
                  "name": "財政調整基金繰入金",
                  "v": 142.56,
                  "prevV": 175.96
                }
              ]
            },
            {
              "name": "資産活用推進基金繰入金",
              "v": 42.02083,
              "prevV": 42.46888,
              "moku": [
                {
                  "name": "資産活用推進基金繰入金",
                  "v": 42.02083,
                  "prevV": 42.46888
                }
              ]
            },
            {
              "name": "都市整備基金繰入金",
              "v": 6.71352,
              "prevV": 2.1,
              "moku": [
                {
                  "name": "都市整備基金繰入金",
                  "v": 6.71352,
                  "prevV": 2.1
                }
              ]
            },
            {
              "name": "学校施設整備基金繰入金",
              "v": 1.69,
              "prevV": 4.4,
              "moku": [
                {
                  "name": "学校施設整備基金繰入金",
                  "v": 1.69,
                  "prevV": 4.4
                }
              ]
            },
            {
              "name": "都市交通基盤整備基金繰入金",
              "v": 1.63165,
              "prevV": 1.84718,
              "moku": [
                {
                  "name": "都市交通基盤整備基金繰入金",
                  "v": 1.63165,
                  "prevV": 1.84718
                }
              ]
            },
            {
              "name": "市庁舎整備基金繰入金",
              "v": 1.21508,
              "prevV": null,
              "moku": [
                {
                  "name": "市庁舎整備基金繰入金",
                  "v": 1.21508,
                  "prevV": null
                }
              ]
            },
            {
              "name": "社会福祉基金繰入金",
              "v": 0.94419,
              "prevV": 0.66012,
              "moku": [
                {
                  "name": "社会福祉基金繰入金",
                  "v": 0.94419,
                  "prevV": 0.66012
                }
              ]
            },
            {
              "name": "学校給食費調整基金繰入金",
              "v": 0.91937,
              "prevV": 0.81924,
              "moku": [
                {
                  "name": "学校給食費調整基金繰入金",
                  "v": 0.91937,
                  "prevV": 0.81924
                }
              ]
            },
            {
              "name": "母子父子寡婦福祉資金会計繰入金",
              "v": 0.88155,
              "prevV": 2.10409,
              "moku": [
                {
                  "name": "母子父子寡婦福祉資金会計繰入金",
                  "v": 0.88155,
                  "prevV": 2.10409
                }
              ]
            },
            {
              "name": "環境保全基金繰入金",
              "v": 0.77725,
              "prevV": 0.71728,
              "moku": [
                {
                  "name": "環境保全基金繰入金",
                  "v": 0.77725,
                  "prevV": 0.71728
                }
              ]
            },
            {
              "name": "市民活動推進基金繰入金",
              "v": 0.4,
              "prevV": 0.37186,
              "moku": [
                {
                  "name": "市民活動推進基金繰入金",
                  "v": 0.4,
                  "prevV": 0.37186
                }
              ]
            },
            {
              "name": "協働の森基金繰入金",
              "v": 0.15,
              "prevV": 0.55,
              "moku": [
                {
                  "name": "協働の森基金繰入金",
                  "v": 0.15,
                  "prevV": 0.55
                }
              ]
            },
            {
              "name": "世界を目指す若者応援基金繰入金",
              "v": 0.13,
              "prevV": 0.112,
              "moku": [
                {
                  "name": "世界を目指す若者応援基金繰入金",
                  "v": 0.13,
                  "prevV": 0.112
                }
              ]
            },
            {
              "name": "動物園基金繰入金",
              "v": 0.09,
              "prevV": 0.05,
              "moku": [
                {
                  "name": "動物園基金繰入金",
                  "v": 0.09,
                  "prevV": 0.05
                }
              ]
            }
          ],
          "繰越金": [
            {
              "name": "繰越金",
              "v": 0.00001,
              "prevV": 0.00001,
              "moku": [
                {
                  "name": "繰越金",
                  "v": 0.00001,
                  "prevV": 0.00001
                }
              ]
            }
          ],
          "諸収入": [
            {
              "name": "貸付金元利収入",
              "v": 716.9164,
              "prevV": 1492.08233,
              "moku": [
                {
                  "name": "経済費貸付金元利収入",
                  "v": 686.33034,
                  "prevV": 1436.17567
                },
                {
                  "name": "総務費貸付金元利収入",
                  "v": 19.51425,
                  "prevV": 16.45299
                },
                {
                  "name": "道路費貸付金元利収入",
                  "v": 7,
                  "prevV": 35
                },
                {
                  "name": "港湾費貸付金元利収入",
                  "v": 1.62761,
                  "prevV": 1.70078
                },
                {
                  "name": "建築費貸付金元利収入",
                  "v": 0.80147,
                  "prevV": 0.90248
                },
                {
                  "name": "環境創造費貸付金元利収入",
                  "v": 0.7011,
                  "prevV": 0.7011
                },
                {
                  "name": "文化観光費貸付金元利収入",
                  "v": 0.57592,
                  "prevV": 0.58016
                },
                {
                  "name": "市民費貸付金元利収入",
                  "v": 0.31239,
                  "prevV": 0.31239
                },
                {
                  "name": "教育費貸付金元利収入",
                  "v": 0.02451,
                  "prevV": 0.03474
                },
                {
                  "name": "健康福祉費貸付金元利収入",
                  "v": 0.01882,
                  "prevV": 0.21253
                },
                {
                  "name": "資源循環費貸付金元利収入",
                  "v": 0.00999,
                  "prevV": 0.00949
                }
              ]
            },
            {
              "name": "雑入",
              "v": 187.14886,
              "prevV": 137.38057,
              "moku": [
                {
                  "name": "資源循環費雑入",
                  "v": 92.71826,
                  "prevV": 49.90845
                },
                {
                  "name": "雑入",
                  "v": 28.45542,
                  "prevV": 23.15829
                },
                {
                  "name": "健康福祉費雑入",
                  "v": 19.82356,
                  "prevV": 20.01114
                },
                {
                  "name": "総務費雑入",
                  "v": 19.52465,
                  "prevV": 17.12352
                },
                {
                  "name": "こども青少年費雑入",
                  "v": 7.50587,
                  "prevV": 7.84771
                },
                {
                  "name": "港湾費雑入",
                  "v": 5.57978,
                  "prevV": 5.69894
                },
                {
                  "name": "経済費雑入",
                  "v": 2.3946,
                  "prevV": 2.50014
                },
                {
                  "name": "環境創造費雑入",
                  "v": 2.33384,
                  "prevV": 2.32505
                },
                {
                  "name": "道路費雑入",
                  "v": 2.23264,
                  "prevV": 2.25725
                },
                {
                  "name": "市民費雑入",
                  "v": 2.02217,
                  "prevV": 1.82844
                },
                {
                  "name": "建築費雑入",
                  "v": 1.83016,
                  "prevV": 1.60114
                },
                {
                  "name": "消防費雑入",
                  "v": 1.80497,
                  "prevV": 1.86762
                },
                {
                  "name": "教育費雑入",
                  "v": 0.61607,
                  "prevV": 0.93663
                },
                {
                  "name": "都市整備費雑入",
                  "v": 0.30687,
                  "prevV": 0.31625
                }
              ]
            },
            {
              "name": "収益事業収入",
              "v": 100,
              "prevV": 100,
              "moku": [
                {
                  "name": "宝くじ収入",
                  "v": 100,
                  "prevV": 100
                }
              ]
            },
            {
              "name": "延滞金、加算金及び過料",
              "v": 3.11773,
              "prevV": 3.29626,
              "moku": [
                {
                  "name": "延滞金",
                  "v": 3.07761,
                  "prevV": 3.25614
                },
                {
                  "name": "過料",
                  "v": 0.04011,
                  "prevV": 0.04011
                },
                {
                  "name": "加算金",
                  "v": 0.00001,
                  "prevV": 0.00001
                }
              ]
            },
            {
              "name": "市預金利子",
              "v": 0.015,
              "prevV": 0.007,
              "moku": [
                {
                  "name": "市預金利子",
                  "v": 0.015,
                  "prevV": 0.007
                }
              ]
            }
          ],
          "市債": [
            {
              "name": "市債",
              "v": 1148.03,
              "prevV": 1360,
              "moku": [
                {
                  "name": "教育債",
                  "v": 225.84,
                  "prevV": 191.21
                },
                {
                  "name": "道路債",
                  "v": 175.12,
                  "prevV": 177.21
                },
                {
                  "name": "消防債",
                  "v": 121.55,
                  "prevV": 47.51
                },
                {
                  "name": "臨時財政対策債",
                  "v": 120,
                  "prevV": 395
                },
                {
                  "name": "都市整備債",
                  "v": 85.38,
                  "prevV": 89.08
                },
                {
                  "name": "環境創造債",
                  "v": 84.59,
                  "prevV": 76.79
                },
                {
                  "name": "建築債",
                  "v": 68.81,
                  "prevV": 57.84
                },
                {
                  "name": "文化観光債",
                  "v": 67.81,
                  "prevV": 87.74
                },
                {
                  "name": "諸支出債",
                  "v": 57.25,
                  "prevV": 53.98
                },
                {
                  "name": "健康福祉債",
                  "v": 48.96,
                  "prevV": 59.61
                },
                {
                  "name": "港湾債",
                  "v": 25,
                  "prevV": 27.5
                },
                {
                  "name": "市民債",
                  "v": 23.3,
                  "prevV": 30.33
                },
                {
                  "name": "総務債",
                  "v": 17.81,
                  "prevV": 19.91
                },
                {
                  "name": "こども青少年債",
                  "v": 15.41,
                  "prevV": 10.15
                },
                {
                  "name": "資源循環債",
                  "v": 11.2,
                  "prevV": 36.14
                }
              ]
            }
          ]
        },
        "expenditure": {
          "議会費": [
            {
              "name": "議会費",
              "v": 30.7078,
              "prevV": 30.60629,
              "moku": [
                {
                  "name": "議会費",
                  "v": 30.7078,
                  "prevV": 30.60629
                }
              ]
            }
          ],
          "総務費": [
            {
              "name": "総務費",
              "v": 373.47436,
              "prevV": 335.66679,
              "moku": [
                {
                  "name": "人事管理費",
                  "v": 188.02315,
                  "prevV": 160.22178
                },
                {
                  "name": "行政運営費",
                  "v": 88.62873,
                  "prevV": 84.7981
                },
                {
                  "name": "デジタル統括推進費",
                  "v": 85.61211,
                  "prevV": 77.36457
                },
                {
                  "name": "危機管理費",
                  "v": 11.21037,
                  "prevV": 13.28234
                }
              ]
            },
            {
              "name": "政策費",
              "v": 205.45187,
              "prevV": 198.91279,
              "moku": [
                {
                  "name": "政策推進費",
                  "v": 203.69042,
                  "prevV": 198.3641
                },
                {
                  "name": "統計情報費",
                  "v": 1.76145,
                  "prevV": 0.54869
                }
              ]
            },
            {
              "name": "税務費",
              "v": 144.42367,
              "prevV": 138.06466,
              "moku": [
                {
                  "name": "税務管理費",
                  "v": 88.66016,
                  "prevV": 89.24293
                },
                {
                  "name": "賦課徴収費",
                  "v": 55.76351,
                  "prevV": 48.82173
                }
              ]
            },
            {
              "name": "財政費",
              "v": 40.36448,
              "prevV": 36.64717,
              "moku": [
                {
                  "name": "財政運営費",
                  "v": 38.72582,
                  "prevV": 35.09793
                },
                {
                  "name": "財産管理費",
                  "v": 1.63866,
                  "prevV": 1.54924
                }
              ]
            },
            {
              "name": "選挙費",
              "v": 22.5133,
              "prevV": 14.99819,
              "moku": [
                {
                  "name": "統一地方選挙費",
                  "v": 12.68308,
                  "prevV": 6.48204
                },
                {
                  "name": "選挙管理委員会費",
                  "v": 9.83022,
                  "prevV": 8.51615
                }
              ]
            },
            {
              "name": "国際費",
              "v": 17.32306,
              "prevV": 16.34083,
              "moku": [
                {
                  "name": "国際費",
                  "v": 17.32306,
                  "prevV": 16.34083
                }
              ]
            },
            {
              "name": "会計管理費",
              "v": 16.00881,
              "prevV": 15.36723,
              "moku": [
                {
                  "name": "会計管理費",
                  "v": 16.00881,
                  "prevV": 15.36723
                }
              ]
            },
            {
              "name": "監査費",
              "v": 4.25546,
              "prevV": 4.17177,
              "moku": [
                {
                  "name": "監査委員費",
                  "v": 4.08041,
                  "prevV": 3.99672
                },
                {
                  "name": "外部監査費",
                  "v": 0.17505,
                  "prevV": 0.17505
                }
              ]
            },
            {
              "name": "人事委員会費",
              "v": 2.95539,
              "prevV": 2.67761,
              "moku": [
                {
                  "name": "人事委員会費",
                  "v": 2.95539,
                  "prevV": 2.67761
                }
              ]
            }
          ],
          "市民費": [
            {
              "name": "地域行政費",
              "v": 296.19937,
              "prevV": 295.62134,
              "moku": [
                {
                  "name": "個性ある区づくり推進費",
                  "v": 160.67622,
                  "prevV": 156.09458
                },
                {
                  "name": "戸籍住民登録費",
                  "v": 100.69068,
                  "prevV": 98.62204
                },
                {
                  "name": "地域施設費",
                  "v": 34.83247,
                  "prevV": 40.90472
                }
              ]
            },
            {
              "name": "市民行政費",
              "v": 203.27963,
              "prevV": 194.18694,
              "moku": [
                {
                  "name": "市民総務費",
                  "v": 132.75826,
                  "prevV": 134.4286
                },
                {
                  "name": "スポーツ振興費",
                  "v": 49.44676,
                  "prevV": 36.94351
                },
                {
                  "name": "市民協働推進費",
                  "v": 20.61167,
                  "prevV": 22.31739
                },
                {
                  "name": "人権施策推進費",
                  "v": 0.46294,
                  "prevV": 0.49744
                }
              ]
            }
          ],
          "文化観光費": [
            {
              "name": "文化観光費",
              "v": 180.71245,
              "prevV": 225.4929,
              "moku": [
                {
                  "name": "文化芸術創造都市推進費",
                  "v": 118.43267,
                  "prevV": 157.71413
                },
                {
                  "name": "観光ＭＩＣＥ振興費",
                  "v": 45.98997,
                  "prevV": 50.70872
                },
                {
                  "name": "文化観光総務費",
                  "v": 11.42676,
                  "prevV": 12.43873
                },
                {
                  "name": "文化プログラム推進費",
                  "v": 4.86305,
                  "prevV": 4.63132
                }
              ]
            }
          ],
          "経済費": [
            {
              "name": "経済費",
              "v": 806.26615,
              "prevV": 1551.96056,
              "moku": [
                {
                  "name": "中小企業金融対策費",
                  "v": 723.54149,
                  "prevV": 1480.21619
                },
                {
                  "name": "誘致イノベーション推進費",
                  "v": 46.25819,
                  "prevV": 29.25473
                },
                {
                  "name": "経済総務費",
                  "v": 16.0358,
                  "prevV": 16.29661
                },
                {
                  "name": "市民経済労働費",
                  "v": 13.09654,
                  "prevV": 17.13469
                },
                {
                  "name": "中小企業経営支援費",
                  "v": 7.33413,
                  "prevV": 9.05834
                }
              ]
            }
          ],
          "こども青少年費": [
            {
              "name": "子育て支援費",
              "v": 2129.34807,
              "prevV": 2052.55754,
              "moku": [
                {
                  "name": "保育・教育施設運営費",
                  "v": 1835.46546,
                  "prevV": 1771.42304
                },
                {
                  "name": "放課後児童育成費",
                  "v": 116.78441,
                  "prevV": 117.02093
                },
                {
                  "name": "幼児教育費",
                  "v": 112.0984,
                  "prevV": 103.06201
                },
                {
                  "name": "地域子育て支援費",
                  "v": 38.44771,
                  "prevV": 30.52615
                },
                {
                  "name": "保育所等整備費",
                  "v": 26.55209,
                  "prevV": 30.52541
                }
              ]
            },
            {
              "name": "こども福祉保健費",
              "v": 1072.97517,
              "prevV": 1011.21666,
              "moku": [
                {
                  "name": "こども手当費",
                  "v": 561.83722,
                  "prevV": 580.93638
                },
                {
                  "name": "こども家庭福祉費",
                  "v": 237.0146,
                  "prevV": 207.48838
                },
                {
                  "name": "児童措置費",
                  "v": 106.39732,
                  "prevV": 99.85064
                },
                {
                  "name": "親子保健費",
                  "v": 78.8533,
                  "prevV": 55.27561
                },
                {
                  "name": "児童福祉施設運営費",
                  "v": 43.5763,
                  "prevV": 39.11881
                },
                {
                  "name": "児童相談所費",
                  "v": 24.73733,
                  "prevV": 20.43764
                },
                {
                  "name": "児童福祉施設整備費",
                  "v": 20.5591,
                  "prevV": 8.1092
                }
              ]
            },
            {
              "name": "青少年費",
              "v": 232.69084,
              "prevV": 226.70619,
              "moku": [
                {
                  "name": "こども青少年総務費",
                  "v": 216.01877,
                  "prevV": 213.03473
                },
                {
                  "name": "青少年育成費",
                  "v": 16.67207,
                  "prevV": 13.67146
                }
              ]
            }
          ],
          "健康福祉費": [
            {
              "name": "障害者福祉費",
              "v": 1356.38661,
              "prevV": 1283.14433,
              "moku": [
                {
                  "name": "障害者福祉費",
                  "v": 1133.41652,
                  "prevV": 1062.77958
                },
                {
                  "name": "重度障害者医療費",
                  "v": 165.28296,
                  "prevV": 165.39963
                },
                {
                  "name": "リハビリテーションセンター等運営費",
                  "v": 33.46736,
                  "prevV": 31.07884
                },
                {
                  "name": "障害者手当費",
                  "v": 11.97436,
                  "prevV": 11.29721
                },
                {
                  "name": "こころの健康相談センター等運営費",
                  "v": 6.27114,
                  "prevV": 6.18657
                },
                {
                  "name": "障害者福祉施設運営費",
                  "v": 5.97427,
                  "prevV": 6.4025
                }
              ]
            },
            {
              "name": "生活援護費",
              "v": 1346.5174,
              "prevV": 1324.10562,
              "moku": [
                {
                  "name": "生活保護費",
                  "v": 1327.10388,
                  "prevV": 1304.6537
                },
                {
                  "name": "援護対策費",
                  "v": 19.41352,
                  "prevV": 19.45192
                }
              ]
            },
            {
              "name": "公衆衛生費",
              "v": 617.87839,
              "prevV": 674.56831,
              "moku": [
                {
                  "name": "健康安全費",
                  "v": 478.468,
                  "prevV": 545.4738
                },
                {
                  "name": "地域保健推進費",
                  "v": 73.45242,
                  "prevV": 65.15425
                },
                {
                  "name": "健康診査費",
                  "v": 48.01985,
                  "prevV": 49.11365
                },
                {
                  "name": "健康づくり費",
                  "v": 12.63433,
                  "prevV": 9.44462
                },
                {
                  "name": "公害・石綿健康被害対策事業費",
                  "v": 5.30379,
                  "prevV": 5.38199
                }
              ]
            },
            {
              "name": "社会福祉費",
              "v": 500.3291,
              "prevV": 465.74281,
              "moku": [
                {
                  "name": "社会福祉総務費",
                  "v": 290.48076,
                  "prevV": 277.36075
                },
                {
                  "name": "小児医療費",
                  "v": 122.27937,
                  "prevV": 104.49784
                },
                {
                  "name": "社会福祉事業振興費",
                  "v": 69.23941,
                  "prevV": 65.07215
                },
                {
                  "name": "ひとり親家庭等医療費",
                  "v": 16.43394,
                  "prevV": 16.81732
                },
                {
                  "name": "国民年金費",
                  "v": 1.89562,
                  "prevV": 1.99475
                }
              ]
            },
            {
              "name": "老人福祉費",
              "v": 176.62443,
              "prevV": 172.21219,
              "moku": [
                {
                  "name": "老人福祉費",
                  "v": 138.62785,
                  "prevV": 135.62513
                },
                {
                  "name": "老人措置費",
                  "v": 36.33583,
                  "prevV": 34.48531
                },
                {
                  "name": "老人福祉施設運営費",
                  "v": 1.66075,
                  "prevV": 2.10175
                }
              ]
            },
            {
              "name": "健康福祉施設整備費",
              "v": 76.72087,
              "prevV": 92.06538,
              "moku": [
                {
                  "name": "健康福祉施設整備費",
                  "v": 76.72087,
                  "prevV": 92.06538
                }
              ]
            },
            {
              "name": "医療政策費",
              "v": 37.99144,
              "prevV": 40.584,
              "moku": [
                {
                  "name": "医療政策費",
                  "v": 37.99144,
                  "prevV": 40.584
                }
              ]
            },
            {
              "name": "環境衛生費",
              "v": 34.73284,
              "prevV": 31.57099,
              "moku": [
                {
                  "name": "葬務費",
                  "v": 26.8023,
                  "prevV": 23.93167
                },
                {
                  "name": "衛生研究所費",
                  "v": 2.6513,
                  "prevV": 2.49406
                },
                {
                  "name": "食品衛生費",
                  "v": 1.9127,
                  "prevV": 1.77675
                },
                {
                  "name": "動物保護指導費",
                  "v": 1.83763,
                  "prevV": 1.862
                },
                {
                  "name": "食肉衛生検査所費",
                  "v": 0.85276,
                  "prevV": 0.81132
                },
                {
                  "name": "環境衛生指導費",
                  "v": 0.67615,
                  "prevV": 0.69519
                }
              ]
            }
          ],
          "環境創造費": [
            {
              "name": "環境整備費",
              "v": 157.97613,
              "prevV": 155.79899,
              "moku": [
                {
                  "name": "公園緑地整備費",
                  "v": 157.97613,
                  "prevV": 155.79899
                }
              ]
            },
            {
              "name": "環境施設費",
              "v": 94.92814,
              "prevV": 91.27414,
              "moku": [
                {
                  "name": "公園緑地管理費",
                  "v": 70.1642,
                  "prevV": 67.32784
                },
                {
                  "name": "動物園費",
                  "v": 24.76394,
                  "prevV": 23.9463
                }
              ]
            },
            {
              "name": "環境総務費",
              "v": 93.4205,
              "prevV": 92.29343,
              "moku": [
                {
                  "name": "環境総務費",
                  "v": 64.29064,
                  "prevV": 63.07504
                },
                {
                  "name": "みどり基金積立金",
                  "v": 28.78,
                  "prevV": 28.54
                },
                {
                  "name": "地籍調査費",
                  "v": 0.34986,
                  "prevV": 0.67839
                }
              ]
            },
            {
              "name": "総合企画費",
              "v": 20.94229,
              "prevV": 11.3179,
              "moku": [
                {
                  "name": "温暖化対策費",
                  "v": 17.85077,
                  "prevV": 8.37649
                },
                {
                  "name": "環境科学研究費",
                  "v": 1.88174,
                  "prevV": 1.80467
                },
                {
                  "name": "建設発生土対策費",
                  "v": 0.7722,
                  "prevV": 0.759
                },
                {
                  "name": "環境政策費",
                  "v": 0.43758,
                  "prevV": 0.37774
                }
              ]
            },
            {
              "name": "環境保全費",
              "v": 11.12015,
              "prevV": 4.1895,
              "moku": [
                {
                  "name": "環境保全事業費",
                  "v": 11.12015,
                  "prevV": 4.1895
                }
              ]
            },
            {
              "name": "環境活動推進費",
              "v": 8.40006,
              "prevV": 8.76547,
              "moku": [
                {
                  "name": "農政推進費",
                  "v": 4.3504,
                  "prevV": 4.50464
                },
                {
                  "name": "環境活動事業費",
                  "v": 2.97411,
                  "prevV": 3.15043
                },
                {
                  "name": "農業振興費",
                  "v": 1.07555,
                  "prevV": 1.1104
                }
              ]
            }
          ],
          "資源循環費": [
            {
              "name": "資源循環管理費",
              "v": 232.18063,
              "prevV": 234.61566,
              "moku": [
                {
                  "name": "資源循環総務費",
                  "v": 152.9362,
                  "prevV": 154.22313
                },
                {
                  "name": "減量・リサイクル推進費",
                  "v": 55.33554,
                  "prevV": 54.07339
                },
                {
                  "name": "車両管理費",
                  "v": 19.49151,
                  "prevV": 19.0204
                },
                {
                  "name": "事務所費",
                  "v": 4.41738,
                  "prevV": 7.29874
                }
              ]
            },
            {
              "name": "適正処理費",
              "v": 184.89153,
              "prevV": 183.77545,
              "moku": [
                {
                  "name": "適正処理総務費",
                  "v": 66.54289,
                  "prevV": 64.77072
                },
                {
                  "name": "処分地費",
                  "v": 59.99827,
                  "prevV": 34.1338
                },
                {
                  "name": "工場費",
                  "v": 54.84798,
                  "prevV": 81.77523
                },
                {
                  "name": "産業廃棄物対策費",
                  "v": 3.50239,
                  "prevV": 3.0957
                }
              ]
            },
            {
              "name": "し尿処理費",
              "v": 3.63974,
              "prevV": 3.79492,
              "moku": [
                {
                  "name": "し尿処理施設費",
                  "v": 1.87514,
                  "prevV": 2.06381
                },
                {
                  "name": "し尿処理総務費",
                  "v": 1.7646,
                  "prevV": 1.73111
                }
              ]
            }
          ],
          "建築費": [
            {
              "name": "住宅費",
              "v": 161.85837,
              "prevV": 139.87047,
              "moku": [
                {
                  "name": "市営住宅管理費",
                  "v": 90.15431,
                  "prevV": 74.40731
                },
                {
                  "name": "市営住宅整備費",
                  "v": 56.73543,
                  "prevV": 50.65542
                },
                {
                  "name": "優良賃貸住宅事業費",
                  "v": 12.31465,
                  "prevV": 12.6979
                },
                {
                  "name": "住宅施策推進費",
                  "v": 2.65398,
                  "prevV": 2.10984
                }
              ]
            },
            {
              "name": "建築指導費",
              "v": 113.46965,
              "prevV": 110.82611,
              "moku": [
                {
                  "name": "建築行政総務費",
                  "v": 72.35066,
                  "prevV": 71.40734
                },
                {
                  "name": "公共建築物長寿命化対策費",
                  "v": 39.72414,
                  "prevV": 37.98238
                },
                {
                  "name": "都市計画調査費",
                  "v": 1.04245,
                  "prevV": 1.06843
                },
                {
                  "name": "工事監理費",
                  "v": 0.3524,
                  "prevV": 0.36796
                }
              ]
            }
          ],
          "都市整備費": [
            {
              "name": "都市整備費",
              "v": 201.63027,
              "prevV": 176.11643,
              "moku": [
                {
                  "name": "地域整備費",
                  "v": 92.64811,
                  "prevV": 50.19646
                },
                {
                  "name": "都市交通費",
                  "v": 67.32897,
                  "prevV": 96.02385
                },
                {
                  "name": "企画費",
                  "v": 41.65319,
                  "prevV": 29.89612
                }
              ]
            }
          ],
          "道路費": [
            {
              "name": "道路整備費",
              "v": 441.20731,
              "prevV": 494.07478,
              "moku": [
                {
                  "name": "街路整備費",
                  "v": 226.9689,
                  "prevV": 265.73314
                },
                {
                  "name": "道路特別整備費",
                  "v": 158.83146,
                  "prevV": 155.7882
                },
                {
                  "name": "道路費負担金",
                  "v": 46.30662,
                  "prevV": 63.56332
                },
                {
                  "name": "交通安全施設等整備費",
                  "v": 5.72979,
                  "prevV": 5.04335
                },
                {
                  "name": "地域交通対策費",
                  "v": 2.44593,
                  "prevV": 2.07503
                },
                {
                  "name": "高速道路等整備費",
                  "v": 0.92461,
                  "prevV": 1.87174
                }
              ]
            },
            {
              "name": "道路維持管理費",
              "v": 249.01073,
              "prevV": 251.85814,
              "moku": [
                {
                  "name": "道路等維持費",
                  "v": 124.15523,
                  "prevV": 130.2308
                },
                {
                  "name": "道路行政総務費",
                  "v": 69.84874,
                  "prevV": 69.04899
                },
                {
                  "name": "道路等管理費",
                  "v": 32.01302,
                  "prevV": 30.05354
                },
                {
                  "name": "交通安全・自転車政策推進事業費",
                  "v": 22.99374,
                  "prevV": 22.52481
                }
              ]
            },
            {
              "name": "河川費",
              "v": 37.08779,
              "prevV": 33.86476,
              "moku": [
                {
                  "name": "河川整備費",
                  "v": 26.38576,
                  "prevV": 19.91576
                },
                {
                  "name": "河川管理費",
                  "v": 10.70203,
                  "prevV": 13.949
                }
              ]
            }
          ],
          "港湾費": [
            {
              "name": "港湾管理費",
              "v": 78.05787,
              "prevV": 78.53235,
              "moku": [
                {
                  "name": "港湾総務費",
                  "v": 26.76767,
                  "prevV": 25.66822
                },
                {
                  "name": "みなと賑わい振興費",
                  "v": 23.17476,
                  "prevV": 23.19506
                },
                {
                  "name": "港湾管理費",
                  "v": 9.98079,
                  "prevV": 8.88828
                },
                {
                  "name": "港湾物流費",
                  "v": 9.77028,
                  "prevV": 9.74158
                },
                {
                  "name": "港湾施設等維持費",
                  "v": 8.36437,
                  "prevV": 11.03921
                }
              ]
            },
            {
              "name": "港湾整備費",
              "v": 31.31582,
              "prevV": 30.95337,
              "moku": [
                {
                  "name": "港湾整備費負担金",
                  "v": 23.09,
                  "prevV": 25.7134
                },
                {
                  "name": "港湾施設等改良費",
                  "v": 8.22582,
                  "prevV": 5.23997
                }
              ]
            }
          ],
          "消防費": [
            {
              "name": "消防費",
              "v": 515.7277,
              "prevV": 432.87495,
              "moku": [
                {
                  "name": "消防総務費",
                  "v": 345.33524,
                  "prevV": 338.26683
                },
                {
                  "name": "消防施設費",
                  "v": 125.51619,
                  "prevV": 47.03765
                },
                {
                  "name": "消防団費",
                  "v": 21.96465,
                  "prevV": 19.74288
                },
                {
                  "name": "警防活動費",
                  "v": 15.10316,
                  "prevV": 21.03333
                },
                {
                  "name": "航空活動費",
                  "v": 4.0771,
                  "prevV": 3.5495
                },
                {
                  "name": "予防活動費",
                  "v": 1.93541,
                  "prevV": 1.79432
                },
                {
                  "name": "消防研修費",
                  "v": 1.79595,
                  "prevV": 1.45044
                }
              ]
            }
          ],
          "教育費": [
            {
              "name": "教育総務費",
              "v": 1853.45803,
              "prevV": 1875.02684,
              "moku": [
                {
                  "name": "教職員費",
                  "v": 1627.27775,
                  "prevV": 1653.68975
                },
                {
                  "name": "事務局費",
                  "v": 116.36318,
                  "prevV": 115.23434
                },
                {
                  "name": "教育指導振興費",
                  "v": 85.62739,
                  "prevV": 84.13785
                },
                {
                  "name": "教育相談費",
                  "v": 15.65771,
                  "prevV": 14.72028
                },
                {
                  "name": "特別支援教育指導振興費",
                  "v": 6.25816,
                  "prevV": 6.0509
                },
                {
                  "name": "教育センター費",
                  "v": 2.06024,
                  "prevV": 0.98012
                },
                {
                  "name": "教育委員会費",
                  "v": 0.2136,
                  "prevV": 0.2136
                }
              ]
            },
            {
              "name": "教育施設整備費",
              "v": 355.48761,
              "prevV": 316.97108,
              "moku": [
                {
                  "name": "学校施設営繕費",
                  "v": 184.83773,
                  "prevV": 179.94305
                },
                {
                  "name": "小・中学校整備費",
                  "v": 148.65395,
                  "prevV": 115.8543
                },
                {
                  "name": "学校用地費",
                  "v": 13.20527,
                  "prevV": 11.01987
                },
                {
                  "name": "教育施設解体費",
                  "v": 4.68118,
                  "prevV": 5.28469
                },
                {
                  "name": "特別支援教育施設整備費",
                  "v": 1.5046,
                  "prevV": 1.31427
                },
                {
                  "name": "高等学校整備費",
                  "v": 1.33068,
                  "prevV": 1.3007
                },
                {
                  "name": "学校施設整備基金積立金",
                  "v": 1.2742,
                  "prevV": 2.2542
                }
              ]
            },
            {
              "name": "学校保健体育費",
              "v": 253.51767,
              "prevV": 240.18292,
              "moku": [
                {
                  "name": "学校給食費",
                  "v": 123.63399,
                  "prevV": 111.84119
                },
                {
                  "name": "学校給食物資購入費",
                  "v": 115.2156,
                  "prevV": 114.82643
                },
                {
                  "name": "学校保健費",
                  "v": 8.30927,
                  "prevV": 7.36139
                },
                {
                  "name": "学校体育費",
                  "v": 6.35881,
                  "prevV": 6.15391
                }
              ]
            },
            {
              "name": "小学校費",
              "v": 139.71367,
              "prevV": 130.23075,
              "moku": [
                {
                  "name": "学校管理費",
                  "v": 99.0469,
                  "prevV": 88.57836
                },
                {
                  "name": "学校運営費",
                  "v": 40.66677,
                  "prevV": 41.65239
                }
              ]
            },
            {
              "name": "中学校費",
              "v": 60.14099,
              "prevV": 59.01822,
              "moku": [
                {
                  "name": "学校管理費",
                  "v": 37.57605,
                  "prevV": 33.90578
                },
                {
                  "name": "学校運営費",
                  "v": 22.56494,
                  "prevV": 25.11244
                }
              ]
            },
            {
              "name": "生涯学習費",
              "v": 39.55531,
              "prevV": 34.73077,
              "moku": [
                {
                  "name": "図書館費",
                  "v": 23.60192,
                  "prevV": 19.48407
                },
                {
                  "name": "文化財保護費",
                  "v": 11.63145,
                  "prevV": 10.44068
                },
                {
                  "name": "生涯学習推進費",
                  "v": 4.32194,
                  "prevV": 4.80602
                }
              ]
            },
            {
              "name": "特別支援学校費",
              "v": 16.93038,
              "prevV": 16.4329,
              "moku": [
                {
                  "name": "学校管理費",
                  "v": 14.747,
                  "prevV": 13.79305
                },
                {
                  "name": "学校運営費",
                  "v": 2.18338,
                  "prevV": 2.63985
                }
              ]
            },
            {
              "name": "高等学校費",
              "v": 10.32392,
              "prevV": 9.98673,
              "moku": [
                {
                  "name": "学校管理費",
                  "v": 7.02644,
                  "prevV": 6.18428
                },
                {
                  "name": "学校運営費",
                  "v": 3.29748,
                  "prevV": 3.80245
                }
              ]
            }
          ],
          "公債費": [
            {
              "name": "公債費",
              "v": 1775.23532,
              "prevV": 1846.30402,
              "moku": [
                {
                  "name": "元金",
                  "v": 1542.30255,
                  "prevV": 1610.5081
                },
                {
                  "name": "利子",
                  "v": 222.67395,
                  "prevV": 226.02396
                },
                {
                  "name": "公債諸費",
                  "v": 10.25882,
                  "prevV": 9.77196
                }
              ]
            },
            {
              "name": "第三セクター等改革推進債公債費",
              "v": 2.11194,
              "prevV": 2.24956,
              "moku": [
                {
                  "name": "利子",
                  "v": 1.96044,
                  "prevV": 2.24165
                },
                {
                  "name": "公債諸費",
                  "v": 0.1515,
                  "prevV": 0.00791
                }
              ]
            }
          ],
          "諸支出金": [
            {
              "name": "特別会計繰出金",
              "v": 1942.75419,
              "prevV": 1935.05333,
              "moku": [
                {
                  "name": "介護保険事業費会計繰出金",
                  "v": 501.89852,
                  "prevV": 490.85657
                },
                {
                  "name": "後期高齢者医療事業費会計繰出金",
                  "v": 412.04166,
                  "prevV": 398.1224
                },
                {
                  "name": "下水道事業会計繰出金",
                  "v": 378.9902,
                  "prevV": 410.74493
                },
                {
                  "name": "国民健康保険事業費会計繰出金",
                  "v": 275.09681,
                  "prevV": 278.68314
                },
                {
                  "name": "高速鉄道事業会計繰出金",
                  "v": 91.21182,
                  "prevV": 88.98661
                },
                {
                  "name": "病院事業会計繰出金",
                  "v": 74.17626,
                  "prevV": 73.13765
                },
                {
                  "name": "自動車事業会計繰出金",
                  "v": 60.85571,
                  "prevV": 65.86361
                },
                {
                  "name": "みどり保全創造事業費会計繰出金",
                  "v": 38.48772,
                  "prevV": 36.30316
                },
                {
                  "name": "市街地開発事業費会計繰出金",
                  "v": 36.59935,
                  "prevV": 34.29506
                },
                {
                  "name": "水道事業会計繰出金",
                  "v": 36.02161,
                  "prevV": 21.83155
                },
                {
                  "name": "中央と畜場費会計繰出金",
                  "v": 24.72859,
                  "prevV": 23.01905
                },
                {
                  "name": "公共事業用地費会計繰出金",
                  "v": 5.29137,
                  "prevV": 5.62756
                },
                {
                  "name": "港湾整備事業費会計繰出金",
                  "v": 2.75409,
                  "prevV": 1.64598
                },
                {
                  "name": "自動車駐車場事業費会計繰出金",
                  "v": 2.36959,
                  "prevV": 3.26189
                },
                {
                  "name": "中央卸売市場費会計繰出金",
                  "v": 1.58421,
                  "prevV": 1.90038
                },
                {
                  "name": "母子父子寡婦福祉資金会計繰出金",
                  "v": 0.31359,
                  "prevV": 0.30762
                },
                {
                  "name": "勤労者福祉共済事業費会計繰出金",
                  "v": 0.16996,
                  "prevV": 0.15696
                },
                {
                  "name": "公害被害者救済事業費会計繰出金",
                  "v": 0.10292,
                  "prevV": 0.11024
                },
                {
                  "name": "埋立事業会計繰出金",
                  "v": 0.04317,
                  "prevV": 0.18745
                },
                {
                  "name": "工業用水道事業会計繰出金",
                  "v": 0.01704,
                  "prevV": 0.01152
                }
              ]
            }
          ],
          "予備費": [
            {
              "name": "予備費",
              "v": 10,
              "prevV": 10,
              "moku": [
                {
                  "name": "予備費",
                  "v": 10,
                  "prevV": 10
                }
              ]
            }
          ]
        }
      },
      "sourceTitle": "令和5年度 横浜市予算に関する説明書（一般会計・款項目＋前年度）",
      "localUrl": "/sources/yokohama-setsumeisho-r5/r5ippan.zip",
      "refLabel": "r5ippan.zip",
      "originUrl": "https://www.city.yokohama.lg.jp/city-info/zaisei/jokyo/yosan/r5/r5.files/r5ippan.zip",
      "archiveUrl": "https://web.archive.org/web/20251125031246/https://www.city.yokohama.lg.jp/city-info/zaisei/jokyo/yosan/r5/r5.files/r5ippan.zip"
    },
    {
      "fy": "R4",
      "fyLabel": "令和4年度 当初予算",
      "byKan": {
        "revenue": {
          "市税": [
            {
              "name": "市民税",
              "v": 4536.28,
              "prevV": 4212.3,
              "moku": [
                {
                  "name": "個人",
                  "v": 4062.14,
                  "prevV": 3883.13
                },
                {
                  "name": "法人",
                  "v": 474.14,
                  "prevV": 329.17
                }
              ]
            },
            {
              "name": "固定資産税",
              "v": 2846.92,
              "prevV": 2699.76,
              "moku": [
                {
                  "name": "固定資産税",
                  "v": 2837.56,
                  "prevV": 2690.62
                },
                {
                  "name": "国有資産等所在市町村交付金及び納付金",
                  "v": 9.36,
                  "prevV": 9.14
                }
              ]
            },
            {
              "name": "都市計画税",
              "v": 616.8,
              "prevV": 590.86,
              "moku": [
                {
                  "name": "都市計画税",
                  "v": 616.8,
                  "prevV": 590.86
                }
              ]
            },
            {
              "name": "市たばこ税",
              "v": 219.08,
              "prevV": 210.69,
              "moku": [
                {
                  "name": "市たばこ税",
                  "v": 219.08,
                  "prevV": 210.69
                }
              ]
            },
            {
              "name": "事業所税",
              "v": 184.3,
              "prevV": 176.8,
              "moku": [
                {
                  "name": "事業所税",
                  "v": 184.3,
                  "prevV": 176.8
                }
              ]
            },
            {
              "name": "軽自動車税",
              "v": 34.32,
              "prevV": 32.29,
              "moku": [
                {
                  "name": "種別割",
                  "v": 31.48,
                  "prevV": 30.69
                },
                {
                  "name": "環境性能割",
                  "v": 2.84,
                  "prevV": 1.6
                }
              ]
            },
            {
              "name": "入湯税",
              "v": 0.42,
              "prevV": 0.39,
              "moku": [
                {
                  "name": "入湯税",
                  "v": 0.42,
                  "prevV": 0.39
                }
              ]
            }
          ],
          "地方譲与税": [
            {
              "name": "自動車重量譲与税",
              "v": 43.98,
              "prevV": 44.49,
              "moku": [
                {
                  "name": "自動車重量譲与税",
                  "v": 43.98,
                  "prevV": 44.49
                }
              ]
            },
            {
              "name": "地方揮発油譲与税",
              "v": 27.65,
              "prevV": 28.31,
              "moku": [
                {
                  "name": "地方揮発油譲与税",
                  "v": 27.65,
                  "prevV": 28.31
                }
              ]
            },
            {
              "name": "特別とん譲与税",
              "v": 9.77,
              "prevV": 10.75,
              "moku": [
                {
                  "name": "特別とん譲与税",
                  "v": 9.77,
                  "prevV": 10.75
                }
              ]
            },
            {
              "name": "森林環境譲与税",
              "v": 4,
              "prevV": 3.02,
              "moku": [
                {
                  "name": "森林環境譲与税",
                  "v": 4,
                  "prevV": 3.02
                }
              ]
            },
            {
              "name": "石油ガス譲与税",
              "v": 0.21,
              "prevV": 0.15,
              "moku": [
                {
                  "name": "石油ガス譲与税",
                  "v": 0.21,
                  "prevV": 0.15
                }
              ]
            },
            {
              "name": "地方道路譲与税",
              "v": 0.00001,
              "prevV": 0.00001,
              "moku": [
                {
                  "name": "地方道路譲与税",
                  "v": 0.00001,
                  "prevV": 0.00001
                }
              ]
            }
          ],
          "利子割交付金": [
            {
              "name": "利子割交付金",
              "v": 3.5,
              "prevV": 3.39,
              "moku": [
                {
                  "name": "利子割交付金",
                  "v": 3.5,
                  "prevV": 3.39
                }
              ]
            }
          ],
          "配当割交付金": [
            {
              "name": "配当割交付金",
              "v": 41.35,
              "prevV": 43.66,
              "moku": [
                {
                  "name": "配当割交付金",
                  "v": 41.35,
                  "prevV": 43.66
                }
              ]
            }
          ],
          "株式等譲渡所得割交付金": [
            {
              "name": "株式等譲渡所得割交付金",
              "v": 32.42,
              "prevV": 34.64,
              "moku": [
                {
                  "name": "株式等譲渡所得割交付金",
                  "v": 32.42,
                  "prevV": 34.64
                }
              ]
            }
          ],
          "分離課税所得割交付金": [
            {
              "name": "分離課税所得割交付金",
              "v": 10.59,
              "prevV": 9.91,
              "moku": [
                {
                  "name": "分離課税所得割交付金",
                  "v": 10.59,
                  "prevV": 9.91
                }
              ]
            }
          ],
          "法人事業税交付金": [
            {
              "name": "法人事業税交付金",
              "v": 84.25,
              "prevV": 74.12,
              "moku": [
                {
                  "name": "法人事業税交付金",
                  "v": 84.25,
                  "prevV": 74.12
                }
              ]
            }
          ],
          "地方消費税交付金": [
            {
              "name": "地方消費税交付金",
              "v": 829.07,
              "prevV": 750.88,
              "moku": [
                {
                  "name": "地方消費税交付金",
                  "v": 829.07,
                  "prevV": 750.88
                }
              ]
            }
          ],
          "ゴルフ場利用税交付金": [
            {
              "name": "ゴルフ場利用税交付金",
              "v": 1.45,
              "prevV": 1.33,
              "moku": [
                {
                  "name": "ゴルフ場利用税交付金",
                  "v": 1.45,
                  "prevV": 1.33
                }
              ]
            }
          ],
          "環境性能割交付金": [
            {
              "name": "環境性能割交付金",
              "v": 25.28,
              "prevV": 21.83,
              "moku": [
                {
                  "name": "環境性能割交付金",
                  "v": 25.27999,
                  "prevV": 21.82999
                },
                {
                  "name": "旧法による自動車取得税交付金",
                  "v": 0.00001,
                  "prevV": 0.00001
                }
              ]
            }
          ],
          "軽油引取税交付金": [
            {
              "name": "軽油引取税交付金",
              "v": 114.88,
              "prevV": 116.47,
              "moku": [
                {
                  "name": "軽油引取税交付金",
                  "v": 114.87,
                  "prevV": 116.46
                },
                {
                  "name": "旧法による軽油引取税交付金",
                  "v": 0.01,
                  "prevV": 0.01
                }
              ]
            }
          ],
          "国有提供施設等所在市町村助成交付金": [
            {
              "name": "国有提供施設等所在市町村助成交付金",
              "v": 5,
              "prevV": 5,
              "moku": [
                {
                  "name": "国有提供施設等所在市町村助成交付金",
                  "v": 5,
                  "prevV": 5
                }
              ]
            }
          ],
          "地方特例交付金": [
            {
              "name": "地方特例交付金",
              "v": 50.6,
              "prevV": 52.39,
              "moku": [
                {
                  "name": "地方特例交付金",
                  "v": 50.6,
                  "prevV": 52.39
                }
              ]
            },
            {
              "name": "新型コロナウイルス感染症対策地方税減収補填特別交付金",
              "v": 0.2,
              "prevV": 60.67,
              "moku": [
                {
                  "name": "新型コロナウイルス感染症対策地方税減収補填特別交付金",
                  "v": 0.2,
                  "prevV": 60.67
                }
              ]
            }
          ],
          "地方交付税": [
            {
              "name": "地方交付税",
              "v": 265,
              "prevV": 230,
              "moku": [
                {
                  "name": "地方交付税",
                  "v": 265,
                  "prevV": 230
                }
              ]
            }
          ],
          "交通安全対策特別交付金": [
            {
              "name": "交通安全対策特別交付金",
              "v": 8.4,
              "prevV": 8.14,
              "moku": [
                {
                  "name": "交通安全対策特別交付金",
                  "v": 8.4,
                  "prevV": 8.14
                }
              ]
            }
          ],
          "分担金及び負担金": [
            {
              "name": "負担金",
              "v": 290.52799,
              "prevV": 282.76962,
              "moku": [
                {
                  "name": "教育費負担金",
                  "v": 116.94986,
                  "prevV": 107.65986
                },
                {
                  "name": "こども青少年費負担金",
                  "v": 104.03421,
                  "prevV": 102.97491
                },
                {
                  "name": "健康福祉費負担金",
                  "v": 61.10872,
                  "prevV": 64.20706
                },
                {
                  "name": "道路費負担金",
                  "v": 5.57574,
                  "prevV": 5.70266
                },
                {
                  "name": "都市整備費負担金",
                  "v": 1.63,
                  "prevV": 1.14
                },
                {
                  "name": "港湾費負担金",
                  "v": 0.96079,
                  "prevV": 0.98468
                },
                {
                  "name": "総務費負担金",
                  "v": 0.2,
                  "prevV": null
                },
                {
                  "name": "資源循環費負担金",
                  "v": 0.04364,
                  "prevV": 0.06483
                },
                {
                  "name": "消防費負担金",
                  "v": 0.02503,
                  "prevV": 0.03562
                }
              ]
            }
          ],
          "使用料及び手数料": [
            {
              "name": "使用料",
              "v": 387.21687,
              "prevV": 387.13964,
              "moku": [
                {
                  "name": "建築使用料",
                  "v": 108.63341,
                  "prevV": 109.61334
                },
                {
                  "name": "港湾使用料",
                  "v": 97.5462,
                  "prevV": 92.62913
                },
                {
                  "name": "道路使用料",
                  "v": 73.53525,
                  "prevV": 72.09029
                },
                {
                  "name": "こども青少年使用料",
                  "v": 69.87508,
                  "prevV": 73.96817
                },
                {
                  "name": "健康福祉使用料",
                  "v": 14.60218,
                  "prevV": 16.11258
                },
                {
                  "name": "環境創造使用料",
                  "v": 10.67055,
                  "prevV": 10.67523
                },
                {
                  "name": "教育使用料",
                  "v": 8.90124,
                  "prevV": 8.94663
                },
                {
                  "name": "総務使用料",
                  "v": 1.97271,
                  "prevV": 1.46807
                },
                {
                  "name": "市民使用料",
                  "v": 0.65219,
                  "prevV": 0.77087
                },
                {
                  "name": "消防使用料",
                  "v": 0.52094,
                  "prevV": 0.52094
                },
                {
                  "name": "経済使用料",
                  "v": 0.23447,
                  "prevV": 0.27148
                },
                {
                  "name": "文化観光使用料",
                  "v": 0.07265,
                  "prevV": 0.07291
                }
              ]
            },
            {
              "name": "手数料",
              "v": 104.49913,
              "prevV": 105.54516,
              "moku": [
                {
                  "name": "資源循環手数料",
                  "v": 56.41263,
                  "prevV": 57.37626
                },
                {
                  "name": "道路手数料",
                  "v": 22.57366,
                  "prevV": 22.57893
                },
                {
                  "name": "市民手数料",
                  "v": 15.16614,
                  "prevV": 15.21414
                },
                {
                  "name": "健康福祉手数料",
                  "v": 3.36052,
                  "prevV": 3.42697
                },
                {
                  "name": "建築手数料",
                  "v": 2.24349,
                  "prevV": 2.10063
                },
                {
                  "name": "総務手数料",
                  "v": 1.80193,
                  "prevV": 1.88071
                },
                {
                  "name": "消防手数料",
                  "v": 1.62575,
                  "prevV": 1.61953
                },
                {
                  "name": "都市整備手数料",
                  "v": 0.66262,
                  "prevV": 0.7054
                },
                {
                  "name": "経済手数料",
                  "v": 0.39049,
                  "prevV": 0.38042
                },
                {
                  "name": "教育手数料",
                  "v": 0.25395,
                  "prevV": 0.25419
                },
                {
                  "name": "環境創造手数料",
                  "v": 0.00776,
                  "prevV": 0.00779
                },
                {
                  "name": "港湾手数料",
                  "v": 0.0001,
                  "prevV": 0.0001
                },
                {
                  "name": "こども青少年手数料",
                  "v": 0.00009,
                  "prevV": 0.00009
                }
              ]
            }
          ],
          "国庫支出金": [
            {
              "name": "国庫負担金",
              "v": 2983.47984,
              "prevV": 3016.9108,
              "moku": [
                {
                  "name": "健康福祉費国庫負担金",
                  "v": 1547.28926,
                  "prevV": 1600.6939
                },
                {
                  "name": "こども青少年費国庫負担金",
                  "v": 1058.49907,
                  "prevV": 1047.1473
                },
                {
                  "name": "教育費国庫負担金",
                  "v": 377.63843,
                  "prevV": 369.0696
                },
                {
                  "name": "消防費国庫負担金",
                  "v": 0.05308,
                  "prevV": null
                }
              ]
            },
            {
              "name": "国庫補助金",
              "v": 1013.63344,
              "prevV": 832.26668,
              "moku": [
                {
                  "name": "健康福祉費国庫補助金",
                  "v": 327.27288,
                  "prevV": 143.72082
                },
                {
                  "name": "こども青少年費国庫補助金",
                  "v": 165.64467,
                  "prevV": 143.18744
                },
                {
                  "name": "道路費国庫補助金",
                  "v": 120.18958,
                  "prevV": 143.33735
                },
                {
                  "name": "新型コロナウイルス感染症対応地方創生臨時交付金",
                  "v": 95.82388,
                  "prevV": 89.06365
                },
                {
                  "name": "市民費国庫補助金",
                  "v": 85.80604,
                  "prevV": 87.55851
                },
                {
                  "name": "教育費国庫補助金",
                  "v": 71.68474,
                  "prevV": 58.92077
                },
                {
                  "name": "経済費国庫補助金",
                  "v": 41.20364,
                  "prevV": 50.705
                },
                {
                  "name": "環境創造費国庫補助金",
                  "v": 35.4882,
                  "prevV": 36.60402
                },
                {
                  "name": "建築費国庫補助金",
                  "v": 31.95344,
                  "prevV": 30.5406
                },
                {
                  "name": "都市整備費国庫補助金",
                  "v": 13.77621,
                  "prevV": 15.23591
                },
                {
                  "name": "資源循環費国庫補助金",
                  "v": 9.36545,
                  "prevV": 9.21629
                },
                {
                  "name": "総務費国庫補助金",
                  "v": 5.57166,
                  "prevV": 1.87224
                },
                {
                  "name": "文化観光費国庫補助金",
                  "v": 3.9581,
                  "prevV": 9.72056
                },
                {
                  "name": "港湾費国庫補助金",
                  "v": 2.29832,
                  "prevV": 9.09981
                },
                {
                  "name": "地方創生推進交付金",
                  "v": 2.04451,
                  "prevV": 1.695
                },
                {
                  "name": "消防費国庫補助金",
                  "v": 1.55212,
                  "prevV": 1.78871
                }
              ]
            },
            {
              "name": "国庫委託金",
              "v": 13.45722,
              "prevV": 12.76778,
              "moku": [
                {
                  "name": "健康福祉費国庫委託金",
                  "v": 9.80749,
                  "prevV": 9.36454
                },
                {
                  "name": "教育費国庫委託金",
                  "v": 1.4704,
                  "prevV": 1.33801
                },
                {
                  "name": "経済費国庫委託金",
                  "v": 1.43592,
                  "prevV": 1.29427
                },
                {
                  "name": "市民費国庫委託金",
                  "v": 0.4398,
                  "prevV": 0.43358
                },
                {
                  "name": "こども青少年費国庫委託金",
                  "v": 0.28351,
                  "prevV": 0.31728
                },
                {
                  "name": "環境創造費国庫委託金",
                  "v": 0.013,
                  "prevV": 0.013
                },
                {
                  "name": "総務費国庫委託金",
                  "v": 0.0071,
                  "prevV": 0.0071
                }
              ]
            }
          ],
          "県支出金": [
            {
              "name": "県負担金",
              "v": 691.7698,
              "prevV": 660.20858,
              "moku": [
                {
                  "name": "こども青少年費県負担金",
                  "v": 360.58171,
                  "prevV": 354.18947
                },
                {
                  "name": "健康福祉費県負担金",
                  "v": 328.5281,
                  "prevV": 302.71797
                },
                {
                  "name": "総務費県負担金",
                  "v": 1.27,
                  "prevV": 2.63
                },
                {
                  "name": "道路費県負担金",
                  "v": 0.9558,
                  "prevV": 0.34857
                },
                {
                  "name": "環境創造費県負担金",
                  "v": 0.42157,
                  "prevV": 0.31328
                },
                {
                  "name": "建築費県負担金",
                  "v": 0.01262,
                  "prevV": 0.00929
                }
              ]
            },
            {
              "name": "県補助金",
              "v": 260.69583,
              "prevV": 203.19912,
              "moku": [
                {
                  "name": "健康福祉費県補助金",
                  "v": 162.38441,
                  "prevV": 110.05447
                },
                {
                  "name": "こども青少年費県補助金",
                  "v": 85.80677,
                  "prevV": 73.01522
                },
                {
                  "name": "道路費県補助金",
                  "v": 5.78,
                  "prevV": 7.24071
                },
                {
                  "name": "消防費県補助金",
                  "v": 4.21912,
                  "prevV": 4.22572
                },
                {
                  "name": "建築費県補助金",
                  "v": 0.72794,
                  "prevV": 1.37252
                },
                {
                  "name": "市民費県補助金",
                  "v": 0.43256,
                  "prevV": 5.98013
                },
                {
                  "name": "文化観光費県補助金",
                  "v": 0.39737,
                  "prevV": null
                },
                {
                  "name": "経済費県補助金",
                  "v": 0.37937,
                  "prevV": 0.37417
                },
                {
                  "name": "環境創造費県補助金",
                  "v": 0.33588,
                  "prevV": 0.38288
                },
                {
                  "name": "総務費県補助金",
                  "v": 0.11581,
                  "prevV": 0.50506
                },
                {
                  "name": "港湾費県補助金",
                  "v": 0.06772,
                  "prevV": null
                },
                {
                  "name": "教育費県補助金",
                  "v": 0.04888,
                  "prevV": 0.04824
                }
              ]
            },
            {
              "name": "県委託金",
              "v": 84.63205,
              "prevV": 80.72468,
              "moku": [
                {
                  "name": "総務費県委託金",
                  "v": 82.38138,
                  "prevV": 78.282
                },
                {
                  "name": "市民費県委託金",
                  "v": 1.7574,
                  "prevV": 1.93222
                },
                {
                  "name": "健康福祉費県委託金",
                  "v": 0.46151,
                  "prevV": 0.47921
                },
                {
                  "name": "環境創造費県委託金",
                  "v": 0.01886,
                  "prevV": 0.01835
                },
                {
                  "name": "港湾費県委託金",
                  "v": 0.0129,
                  "prevV": 0.0129
                }
              ]
            }
          ],
          "財産収入": [
            {
              "name": "財産売払収入",
              "v": 326.57853,
              "prevV": 80.91722,
              "moku": [
                {
                  "name": "不動産売払収入",
                  "v": 322.00528,
                  "prevV": 76.30927
                },
                {
                  "name": "有価証券売払収入",
                  "v": 4,
                  "prevV": 4.095
                },
                {
                  "name": "物品売払収入",
                  "v": 0.51782,
                  "prevV": 0.43962
                },
                {
                  "name": "生産物売払収入",
                  "v": 0.05543,
                  "prevV": 0.07333
                }
              ]
            },
            {
              "name": "財産運用収入",
              "v": 63.49499,
              "prevV": 60.30396,
              "moku": [
                {
                  "name": "財産貸付収入",
                  "v": 60.48953,
                  "prevV": 57.45295
                },
                {
                  "name": "利子及び配当金",
                  "v": 3.00546,
                  "prevV": 2.85101
                }
              ]
            }
          ],
          "寄附金": [
            {
              "name": "寄附金",
              "v": 8.10891,
              "prevV": 11.61005,
              "moku": [
                {
                  "name": "一般寄附金",
                  "v": 6.60178,
                  "prevV": 4.86917
                },
                {
                  "name": "指定寄附金",
                  "v": 1.50713,
                  "prevV": 6.74088
                }
              ]
            }
          ],
          "繰入金": [
            {
              "name": "減債基金繰入金",
              "v": 200,
              "prevV": 243.14985,
              "moku": [
                {
                  "name": "減債基金繰入金",
                  "v": 200,
                  "prevV": 243.14985
                }
              ]
            },
            {
              "name": "財政調整基金繰入金",
              "v": 175.96,
              "prevV": 54,
              "moku": [
                {
                  "name": "財政調整基金繰入金",
                  "v": 175.96,
                  "prevV": 54
                }
              ]
            },
            {
              "name": "資産活用推進基金繰入金",
              "v": 42.46888,
              "prevV": 42.93536,
              "moku": [
                {
                  "name": "資産活用推進基金繰入金",
                  "v": 42.46888,
                  "prevV": 42.93536
                }
              ]
            },
            {
              "name": "学校施設整備基金繰入金",
              "v": 4.4,
              "prevV": null,
              "moku": [
                {
                  "name": "学校施設整備基金繰入金",
                  "v": 4.4,
                  "prevV": null
                }
              ]
            },
            {
              "name": "母子父子寡婦福祉資金会計繰入金",
              "v": 2.10409,
              "prevV": 2.63231,
              "moku": [
                {
                  "name": "母子父子寡婦福祉資金会計繰入金",
                  "v": 2.10409,
                  "prevV": 2.63231
                }
              ]
            },
            {
              "name": "都市整備基金繰入金",
              "v": 2.1,
              "prevV": 2.3,
              "moku": [
                {
                  "name": "都市整備基金繰入金",
                  "v": 2.1,
                  "prevV": 2.3
                }
              ]
            },
            {
              "name": "都市交通基盤整備基金繰入金",
              "v": 1.84718,
              "prevV": 2.44066,
              "moku": [
                {
                  "name": "都市交通基盤整備基金繰入金",
                  "v": 1.84718,
                  "prevV": 2.44066
                }
              ]
            },
            {
              "name": "学校給食費調整基金繰入金",
              "v": 0.81924,
              "prevV": 0.5676,
              "moku": [
                {
                  "name": "学校給食費調整基金繰入金",
                  "v": 0.81924,
                  "prevV": 0.5676
                }
              ]
            },
            {
              "name": "環境保全基金繰入金",
              "v": 0.71728,
              "prevV": 0.71671,
              "moku": [
                {
                  "name": "環境保全基金繰入金",
                  "v": 0.71728,
                  "prevV": 0.71671
                }
              ]
            },
            {
              "name": "社会福祉基金繰入金",
              "v": 0.66012,
              "prevV": 0.83516,
              "moku": [
                {
                  "name": "社会福祉基金繰入金",
                  "v": 0.66012,
                  "prevV": 0.83516
                }
              ]
            },
            {
              "name": "協働の森基金繰入金",
              "v": 0.55,
              "prevV": 0.35,
              "moku": [
                {
                  "name": "協働の森基金繰入金",
                  "v": 0.55,
                  "prevV": 0.35
                }
              ]
            },
            {
              "name": "市民活動推進基金繰入金",
              "v": 0.37186,
              "prevV": 0.36446,
              "moku": [
                {
                  "name": "市民活動推進基金繰入金",
                  "v": 0.37186,
                  "prevV": 0.36446
                }
              ]
            },
            {
              "name": "世界を目指す若者応援基金繰入金",
              "v": 0.112,
              "prevV": 0.112,
              "moku": [
                {
                  "name": "世界を目指す若者応援基金繰入金",
                  "v": 0.112,
                  "prevV": 0.112
                }
              ]
            },
            {
              "name": "動物園基金繰入金",
              "v": 0.05,
              "prevV": 0.09,
              "moku": [
                {
                  "name": "動物園基金繰入金",
                  "v": 0.05,
                  "prevV": 0.09
                }
              ]
            }
          ],
          "繰越金": [
            {
              "name": "繰越金",
              "v": 0.00001,
              "prevV": 0.00001,
              "moku": [
                {
                  "name": "繰越金",
                  "v": 0.00001,
                  "prevV": 0.00001
                }
              ]
            }
          ],
          "諸収入": [
            {
              "name": "貸付金元利収入",
              "v": 1492.08233,
              "prevV": 2269.82974,
              "moku": [
                {
                  "name": "経済費貸付金元利収入",
                  "v": 1436.17567,
                  "prevV": 1925.45066
                },
                {
                  "name": "道路費貸付金元利収入",
                  "v": 35,
                  "prevV": 325
                },
                {
                  "name": "総務費貸付金元利収入",
                  "v": 16.45299,
                  "prevV": 13.91166
                },
                {
                  "name": "港湾費貸付金元利収入",
                  "v": 1.70078,
                  "prevV": 2.43391
                },
                {
                  "name": "建築費貸付金元利収入",
                  "v": 0.90248,
                  "prevV": 0.94892
                },
                {
                  "name": "環境創造費貸付金元利収入",
                  "v": 0.7011,
                  "prevV": 0.7011
                },
                {
                  "name": "文化観光費貸付金元利収入",
                  "v": 0.58016,
                  "prevV": 0.54708
                },
                {
                  "name": "市民費貸付金元利収入",
                  "v": 0.31239,
                  "prevV": 0.30599
                },
                {
                  "name": "健康福祉費貸付金元利収入",
                  "v": 0.21253,
                  "prevV": 0.46452
                },
                {
                  "name": "教育費貸付金元利収入",
                  "v": 0.03474,
                  "prevV": 0.05478
                },
                {
                  "name": "資源循環費貸付金元利収入",
                  "v": 0.00949,
                  "prevV": 0.01112
                }
              ]
            },
            {
              "name": "雑入",
              "v": 137.38057,
              "prevV": 135.92852,
              "moku": [
                {
                  "name": "資源循環費雑入",
                  "v": 49.90845,
                  "prevV": 43.99122
                },
                {
                  "name": "雑入",
                  "v": 23.15829,
                  "prevV": 23.10769
                },
                {
                  "name": "健康福祉費雑入",
                  "v": 20.01114,
                  "prevV": 20.43375
                },
                {
                  "name": "総務費雑入",
                  "v": 16.90503,
                  "prevV": 15.34922
                },
                {
                  "name": "こども青少年費雑入",
                  "v": 7.84771,
                  "prevV": 8.20318
                },
                {
                  "name": "港湾費雑入",
                  "v": 5.69894,
                  "prevV": 6.30169
                },
                {
                  "name": "経済費雑入",
                  "v": 2.50014,
                  "prevV": 3.28825
                },
                {
                  "name": "環境創造費雑入",
                  "v": 2.32505,
                  "prevV": 5.80813
                },
                {
                  "name": "道路費雑入",
                  "v": 2.25725,
                  "prevV": 2.26903
                },
                {
                  "name": "市民費雑入",
                  "v": 2.04693,
                  "prevV": 2.35969
                },
                {
                  "name": "消防費雑入",
                  "v": 1.86762,
                  "prevV": 1.84897
                },
                {
                  "name": "建築費雑入",
                  "v": 1.60114,
                  "prevV": 1.43699
                },
                {
                  "name": "教育費雑入",
                  "v": 0.93663,
                  "prevV": 0.9344
                },
                {
                  "name": "都市整備費雑入",
                  "v": 0.31625,
                  "prevV": 0.59631
                }
              ]
            },
            {
              "name": "収益事業収入",
              "v": 100,
              "prevV": 100,
              "moku": [
                {
                  "name": "宝くじ収入",
                  "v": 100,
                  "prevV": 100
                }
              ]
            },
            {
              "name": "延滞金、加算金及び過料",
              "v": 3.29626,
              "prevV": 3.48297,
              "moku": [
                {
                  "name": "延滞金",
                  "v": 3.25614,
                  "prevV": 3.44285
                },
                {
                  "name": "過料",
                  "v": 0.04011,
                  "prevV": 0.04011
                },
                {
                  "name": "加算金",
                  "v": 0.00001,
                  "prevV": 0.00001
                }
              ]
            },
            {
              "name": "市預金利子",
              "v": 0.007,
              "prevV": 0.015,
              "moku": [
                {
                  "name": "市預金利子",
                  "v": 0.007,
                  "prevV": 0.015
                }
              ]
            }
          ],
          "市債": [
            {
              "name": "市債",
              "v": 1360,
              "prevV": 1717.9,
              "moku": [
                {
                  "name": "臨時財政対策債",
                  "v": 395,
                  "prevV": 780
                },
                {
                  "name": "教育債",
                  "v": 191.21,
                  "prevV": 166.86
                },
                {
                  "name": "道路債",
                  "v": 177.21,
                  "prevV": 227.09
                },
                {
                  "name": "都市整備債",
                  "v": 89.08,
                  "prevV": 100.55
                },
                {
                  "name": "文化観光債",
                  "v": 87.74,
                  "prevV": 52.47
                },
                {
                  "name": "環境創造債",
                  "v": 76.79,
                  "prevV": 66.31
                },
                {
                  "name": "健康福祉債",
                  "v": 59.61,
                  "prevV": 64.77
                },
                {
                  "name": "建築債",
                  "v": 57.84,
                  "prevV": 41.61
                },
                {
                  "name": "諸支出債",
                  "v": 53.98,
                  "prevV": 36.91
                },
                {
                  "name": "消防債",
                  "v": 47.51,
                  "prevV": 29.61
                },
                {
                  "name": "資源循環債",
                  "v": 36.14,
                  "prevV": 40.51
                },
                {
                  "name": "市民債",
                  "v": 30.33,
                  "prevV": 34.8
                },
                {
                  "name": "港湾債",
                  "v": 27.5,
                  "prevV": 35.54
                },
                {
                  "name": "総務債",
                  "v": 19.91,
                  "prevV": 25.27
                },
                {
                  "name": "こども青少年債",
                  "v": 10.15,
                  "prevV": 15.6
                }
              ]
            }
          ]
        },
        "expenditure": {
          "議会費": [
            {
              "name": "議会費",
              "v": 30.60629,
              "prevV": 30.95987,
              "moku": [
                {
                  "name": "議会費",
                  "v": 30.60629,
                  "prevV": 30.95987
                }
              ]
            }
          ],
          "総務費": [
            {
              "name": "総務費",
              "v": 335.66679,
              "prevV": 310.07979,
              "moku": [
                {
                  "name": "人事管理費",
                  "v": 160.22178,
                  "prevV": 147.32599
                },
                {
                  "name": "行政運営費",
                  "v": 84.7981,
                  "prevV": 83.37963
                },
                {
                  "name": "情報化推進費",
                  "v": 59.14602,
                  "prevV": 52.97332
                },
                {
                  "name": "デジタル統括推進費",
                  "v": 18.21855,
                  "prevV": 6.00406
                },
                {
                  "name": "危機管理費",
                  "v": 13.28234,
                  "prevV": 20.39679
                }
              ]
            },
            {
              "name": "政策費",
              "v": 190.4827,
              "prevV": 194.10569,
              "moku": [
                {
                  "name": "政策推進費",
                  "v": 189.93401,
                  "prevV": 192.73418
                },
                {
                  "name": "統計情報費",
                  "v": 0.54869,
                  "prevV": 1.37151
                }
              ]
            },
            {
              "name": "税務費",
              "v": 138.06466,
              "prevV": 131.97333,
              "moku": [
                {
                  "name": "税務管理費",
                  "v": 89.24293,
                  "prevV": 89.70369
                },
                {
                  "name": "賦課徴収費",
                  "v": 48.82173,
                  "prevV": 42.26964
                }
              ]
            },
            {
              "name": "財政費",
              "v": 36.65206,
              "prevV": 32.60304,
              "moku": [
                {
                  "name": "財政運営費",
                  "v": 35.09793,
                  "prevV": 30.55927
                },
                {
                  "name": "財産管理費",
                  "v": 1.55413,
                  "prevV": 2.04377
                }
              ]
            },
            {
              "name": "選挙費",
              "v": 28.33438,
              "prevV": 8.33045,
              "moku": [
                {
                  "name": "参議院議員選挙費",
                  "v": 13.33619,
                  "prevV": null
                },
                {
                  "name": "選挙管理委員会費",
                  "v": 8.51615,
                  "prevV": 8.33045
                },
                {
                  "name": "統一地方選挙費",
                  "v": 6.48204,
                  "prevV": null
                }
              ]
            },
            {
              "name": "国際費",
              "v": 16.34083,
              "prevV": 15.31875,
              "moku": [
                {
                  "name": "国際費",
                  "v": 16.34083,
                  "prevV": 15.31875
                }
              ]
            },
            {
              "name": "会計管理費",
              "v": 15.36723,
              "prevV": 15.22678,
              "moku": [
                {
                  "name": "会計管理費",
                  "v": 15.36723,
                  "prevV": 15.22678
                }
              ]
            },
            {
              "name": "監査費",
              "v": 4.17177,
              "prevV": 4.23959,
              "moku": [
                {
                  "name": "監査委員費",
                  "v": 3.99672,
                  "prevV": 4.06454
                },
                {
                  "name": "外部監査費",
                  "v": 0.17505,
                  "prevV": 0.17505
                }
              ]
            },
            {
              "name": "人事委員会費",
              "v": 2.67761,
              "prevV": 2.66844,
              "moku": [
                {
                  "name": "人事委員会費",
                  "v": 2.67761,
                  "prevV": 2.66844
                }
              ]
            }
          ],
          "市民費": [
            {
              "name": "地域行政費",
              "v": 295.58887,
              "prevV": 302.70282,
              "moku": [
                {
                  "name": "個性ある区づくり推進費",
                  "v": 156.02297,
                  "prevV": 155.10163
                },
                {
                  "name": "戸籍住民登録費",
                  "v": 98.62204,
                  "prevV": 101.18957
                },
                {
                  "name": "地域施設費",
                  "v": 40.94386,
                  "prevV": 46.41162
                }
              ]
            },
            {
              "name": "市民行政費",
              "v": 202.27318,
              "prevV": 220.08564,
              "moku": [
                {
                  "name": "市民総務費",
                  "v": 131.08325,
                  "prevV": 133.96447
                },
                {
                  "name": "スポーツ振興費",
                  "v": 36.97109,
                  "prevV": 49.45942
                },
                {
                  "name": "市民協働推進費",
                  "v": 22.31739,
                  "prevV": 25.18262
                },
                {
                  "name": "広報広聴費",
                  "v": 11.40401,
                  "prevV": 10.94779
                },
                {
                  "name": "人権施策推進費",
                  "v": 0.49744,
                  "prevV": 0.53134
                }
              ]
            }
          ],
          "文化観光費": [
            {
              "name": "文化観光費",
              "v": 226.26433,
              "prevV": 184.71621,
              "moku": [
                {
                  "name": "文化芸術創造都市推進費",
                  "v": 157.71413,
                  "prevV": 108.10187
                },
                {
                  "name": "観光ＭＩＣＥ振興費",
                  "v": 50.70872,
                  "prevV": 57.93637
                },
                {
                  "name": "文化観光総務費",
                  "v": 13.21016,
                  "prevV": 13.19437
                },
                {
                  "name": "文化プログラム推進費",
                  "v": 4.63132,
                  "prevV": 5.4836
                }
              ]
            }
          ],
          "経済費": [
            {
              "name": "経済費",
              "v": 1551.96056,
              "prevV": 2055.05039,
              "moku": [
                {
                  "name": "中小企業金融対策費",
                  "v": 1480.21619,
                  "prevV": 1980.37456
                },
                {
                  "name": "誘致イノベーション推進費",
                  "v": 29.25473,
                  "prevV": 30.41125
                },
                {
                  "name": "市民経済労働費",
                  "v": 17.13469,
                  "prevV": 14.36074
                },
                {
                  "name": "経済総務費",
                  "v": 16.29661,
                  "prevV": 16.90537
                },
                {
                  "name": "中小企業経営支援費",
                  "v": 9.05834,
                  "prevV": 12.99847
                }
              ]
            }
          ],
          "こども青少年費": [
            {
              "name": "子育て支援費",
              "v": 2052.55754,
              "prevV": 1956.04392,
              "moku": [
                {
                  "name": "保育・教育施設運営費",
                  "v": 1771.42304,
                  "prevV": 1690.52847
                },
                {
                  "name": "放課後児童育成費",
                  "v": 117.02093,
                  "prevV": 97.41947
                },
                {
                  "name": "幼児教育費",
                  "v": 103.06201,
                  "prevV": 110.53596
                },
                {
                  "name": "地域子育て支援費",
                  "v": 30.52615,
                  "prevV": 26.85489
                },
                {
                  "name": "保育所等整備費",
                  "v": 30.52541,
                  "prevV": 30.70513
                }
              ]
            },
            {
              "name": "こども福祉保健費",
              "v": 1011.21666,
              "prevV": 1004.84678,
              "moku": [
                {
                  "name": "こども手当費",
                  "v": 580.93638,
                  "prevV": 606.92115
                },
                {
                  "name": "こども家庭福祉費",
                  "v": 207.48838,
                  "prevV": 167.07766
                },
                {
                  "name": "児童措置費",
                  "v": 99.85064,
                  "prevV": 95.97418
                },
                {
                  "name": "親子保健費",
                  "v": 55.27561,
                  "prevV": 62.90051
                },
                {
                  "name": "児童福祉施設運営費",
                  "v": 39.11881,
                  "prevV": 37.81363
                },
                {
                  "name": "児童相談所費",
                  "v": 20.43764,
                  "prevV": 18.91748
                },
                {
                  "name": "児童福祉施設整備費",
                  "v": 8.1092,
                  "prevV": 15.24217
                }
              ]
            },
            {
              "name": "青少年費",
              "v": 226.70619,
              "prevV": 227.34699,
              "moku": [
                {
                  "name": "こども青少年総務費",
                  "v": 213.03473,
                  "prevV": 214.09016
                },
                {
                  "name": "青少年育成費",
                  "v": 13.67146,
                  "prevV": 13.25683
                }
              ]
            }
          ],
          "健康福祉費": [
            {
              "name": "生活援護費",
              "v": 1324.10562,
              "prevV": 1316.86416,
              "moku": [
                {
                  "name": "生活保護費",
                  "v": 1304.6537,
                  "prevV": 1296.99497
                },
                {
                  "name": "援護対策費",
                  "v": 19.45192,
                  "prevV": 19.86919
                }
              ]
            },
            {
              "name": "障害者福祉費",
              "v": 1283.14433,
              "prevV": 1198.72083,
              "moku": [
                {
                  "name": "障害者福祉費",
                  "v": 1062.77958,
                  "prevV": 978.1132
                },
                {
                  "name": "重度障害者医療費",
                  "v": 165.39963,
                  "prevV": 162.34152
                },
                {
                  "name": "リハビリテーションセンター等運営費",
                  "v": 31.07884,
                  "prevV": 33.2586
                },
                {
                  "name": "障害者手当費",
                  "v": 11.29721,
                  "prevV": 10.94437
                },
                {
                  "name": "障害者福祉施設運営費",
                  "v": 6.4025,
                  "prevV": 7.68979
                },
                {
                  "name": "こころの健康相談センター等運営費",
                  "v": 6.18657,
                  "prevV": 6.37335
                }
              ]
            },
            {
              "name": "公衆衛生費",
              "v": 674.56831,
              "prevV": 542.70844,
              "moku": [
                {
                  "name": "健康安全費",
                  "v": 545.4738,
                  "prevV": 410.3204
                },
                {
                  "name": "地域保健推進費",
                  "v": 65.15425,
                  "prevV": 58.84689
                },
                {
                  "name": "健康診査費",
                  "v": 49.11365,
                  "prevV": 58.42967
                },
                {
                  "name": "健康づくり費",
                  "v": 9.44462,
                  "prevV": 9.6785
                },
                {
                  "name": "公害・石綿健康被害対策事業費",
                  "v": 5.38199,
                  "prevV": 5.43298
                }
              ]
            },
            {
              "name": "社会福祉費",
              "v": 465.74281,
              "prevV": 452.27742,
              "moku": [
                {
                  "name": "社会福祉総務費",
                  "v": 277.36075,
                  "prevV": 268.5157
                },
                {
                  "name": "小児医療費",
                  "v": 104.49784,
                  "prevV": 104.81596
                },
                {
                  "name": "社会福祉事業振興費",
                  "v": 65.07215,
                  "prevV": 61.72408
                },
                {
                  "name": "ひとり親家庭等医療費",
                  "v": 16.81732,
                  "prevV": 15.66189
                },
                {
                  "name": "国民年金費",
                  "v": 1.99475,
                  "prevV": 1.55979
                }
              ]
            },
            {
              "name": "老人福祉費",
              "v": 172.21219,
              "prevV": 136.55729,
              "moku": [
                {
                  "name": "老人福祉費",
                  "v": 135.75059,
                  "prevV": 104.56337
                },
                {
                  "name": "老人措置費",
                  "v": 34.50483,
                  "prevV": 30.621
                },
                {
                  "name": "老人福祉施設運営費",
                  "v": 1.95677,
                  "prevV": 1.37292
                }
              ]
            },
            {
              "name": "健康福祉施設整備費",
              "v": 92.06538,
              "prevV": 96.07924,
              "moku": [
                {
                  "name": "健康福祉施設整備費",
                  "v": 92.06538,
                  "prevV": 96.07924
                }
              ]
            },
            {
              "name": "医療政策費",
              "v": 40.584,
              "prevV": 46.96156,
              "moku": [
                {
                  "name": "医療政策費",
                  "v": 40.584,
                  "prevV": 46.96156
                }
              ]
            },
            {
              "name": "環境衛生費",
              "v": 31.57099,
              "prevV": 30.4916,
              "moku": [
                {
                  "name": "葬務費",
                  "v": 23.93167,
                  "prevV": 22.73974
                },
                {
                  "name": "衛生研究所費",
                  "v": 2.49406,
                  "prevV": 2.5482
                },
                {
                  "name": "動物保護指導費",
                  "v": 1.862,
                  "prevV": 1.85423
                },
                {
                  "name": "食品衛生費",
                  "v": 1.77675,
                  "prevV": 1.82506
                },
                {
                  "name": "食肉衛生検査所費",
                  "v": 0.81132,
                  "prevV": 0.82221
                },
                {
                  "name": "環境衛生指導費",
                  "v": 0.69519,
                  "prevV": 0.70216
                }
              ]
            }
          ],
          "環境創造費": [
            {
              "name": "環境整備費",
              "v": 155.79899,
              "prevV": 158.09809,
              "moku": [
                {
                  "name": "公園緑地整備費",
                  "v": 155.79899,
                  "prevV": 158.09809
                }
              ]
            },
            {
              "name": "環境総務費",
              "v": 92.29343,
              "prevV": 92.11948,
              "moku": [
                {
                  "name": "環境総務費",
                  "v": 63.07504,
                  "prevV": 63.49292
                },
                {
                  "name": "みどり基金積立金",
                  "v": 28.54,
                  "prevV": 28.05
                },
                {
                  "name": "地籍調査費",
                  "v": 0.67839,
                  "prevV": 0.57656
                }
              ]
            },
            {
              "name": "環境施設費",
              "v": 91.27414,
              "prevV": 93.44386,
              "moku": [
                {
                  "name": "公園緑地管理費",
                  "v": 67.32784,
                  "prevV": 69.50175
                },
                {
                  "name": "動物園費",
                  "v": 23.9463,
                  "prevV": 23.94211
                }
              ]
            },
            {
              "name": "総合企画費",
              "v": 11.3179,
              "prevV": 11.67457,
              "moku": [
                {
                  "name": "温暖化対策費",
                  "v": 8.37649,
                  "prevV": 8.68136
                },
                {
                  "name": "環境科学研究費",
                  "v": 1.80467,
                  "prevV": 1.81744
                },
                {
                  "name": "建設発生土対策費",
                  "v": 0.759,
                  "prevV": 0.7667
                },
                {
                  "name": "環境政策費",
                  "v": 0.37774,
                  "prevV": 0.40907
                }
              ]
            },
            {
              "name": "環境活動推進費",
              "v": 8.76547,
              "prevV": 9.55764,
              "moku": [
                {
                  "name": "農政推進費",
                  "v": 4.50464,
                  "prevV": 4.58953
                },
                {
                  "name": "環境活動事業費",
                  "v": 3.15043,
                  "prevV": 3.77517
                },
                {
                  "name": "農業振興費",
                  "v": 1.1104,
                  "prevV": 1.19294
                }
              ]
            },
            {
              "name": "環境保全費",
              "v": 4.1895,
              "prevV": 4.29411,
              "moku": [
                {
                  "name": "環境保全事業費",
                  "v": 4.1895,
                  "prevV": 4.29411
                }
              ]
            }
          ],
          "資源循環費": [
            {
              "name": "資源循環管理費",
              "v": 234.61566,
              "prevV": 236.44237,
              "moku": [
                {
                  "name": "資源循環総務費",
                  "v": 154.22313,
                  "prevV": 157.13525
                },
                {
                  "name": "減量・リサイクル推進費",
                  "v": 54.07339,
                  "prevV": 49.88379
                },
                {
                  "name": "車両管理費",
                  "v": 19.0204,
                  "prevV": 20.8543
                },
                {
                  "name": "事務所費",
                  "v": 7.29874,
                  "prevV": 8.56903
                }
              ]
            },
            {
              "name": "適正処理費",
              "v": 183.77545,
              "prevV": 188.64502,
              "moku": [
                {
                  "name": "工場費",
                  "v": 81.77523,
                  "prevV": 79.86398
                },
                {
                  "name": "適正処理総務費",
                  "v": 64.77072,
                  "prevV": 63.90869
                },
                {
                  "name": "処分地費",
                  "v": 34.1338,
                  "prevV": 39.80391
                },
                {
                  "name": "産業廃棄物対策費",
                  "v": 3.0957,
                  "prevV": 5.06844
                }
              ]
            },
            {
              "name": "し尿処理費",
              "v": 3.79492,
              "prevV": 3.29246,
              "moku": [
                {
                  "name": "し尿処理施設費",
                  "v": 2.06381,
                  "prevV": 1.52408
                },
                {
                  "name": "し尿処理総務費",
                  "v": 1.73111,
                  "prevV": 1.76838
                }
              ]
            }
          ],
          "建築費": [
            {
              "name": "住宅費",
              "v": 139.87047,
              "prevV": 124.4524,
              "moku": [
                {
                  "name": "市営住宅管理費",
                  "v": 74.40731,
                  "prevV": 75.11833
                },
                {
                  "name": "市営住宅整備費",
                  "v": 50.65542,
                  "prevV": 30.80894
                },
                {
                  "name": "優良賃貸住宅事業費",
                  "v": 12.6979,
                  "prevV": 16.26334
                },
                {
                  "name": "住宅施策推進費",
                  "v": 2.10984,
                  "prevV": 2.26179
                }
              ]
            },
            {
              "name": "建築指導費",
              "v": 110.82611,
              "prevV": 118.26531,
              "moku": [
                {
                  "name": "建築行政総務費",
                  "v": 71.40734,
                  "prevV": 75.6415
                },
                {
                  "name": "公共建築物長寿命化対策費",
                  "v": 37.98238,
                  "prevV": 40.76138
                },
                {
                  "name": "都市計画調査費",
                  "v": 1.06843,
                  "prevV": 1.56147
                },
                {
                  "name": "工事監理費",
                  "v": 0.36796,
                  "prevV": 0.30096
                }
              ]
            }
          ],
          "都市整備費": [
            {
              "name": "都市整備費",
              "v": 175.71643,
              "prevV": 189.97814,
              "moku": [
                {
                  "name": "都市交通費",
                  "v": 95.62385,
                  "prevV": 103.60351
                },
                {
                  "name": "地域整備費",
                  "v": 50.19646,
                  "prevV": 52.99614
                },
                {
                  "name": "企画費",
                  "v": 29.89612,
                  "prevV": 33.37849
                }
              ]
            }
          ],
          "道路費": [
            {
              "name": "道路整備費",
              "v": 494.87478,
              "prevV": 1069.70768,
              "moku": [
                {
                  "name": "街路整備費",
                  "v": 265.73314,
                  "prevV": 837.99505
                },
                {
                  "name": "道路特別整備費",
                  "v": 155.7882,
                  "prevV": 133.85764
                },
                {
                  "name": "道路費負担金",
                  "v": 63.56332,
                  "prevV": 87.19832
                },
                {
                  "name": "交通安全施設等整備費",
                  "v": 5.84335,
                  "prevV": 6.77628
                },
                {
                  "name": "地域交通対策費",
                  "v": 2.07503,
                  "prevV": 2.46792
                },
                {
                  "name": "高速道路等整備費",
                  "v": 1.87174,
                  "prevV": 1.41247
                }
              ]
            },
            {
              "name": "道路維持管理費",
              "v": 251.05814,
              "prevV": 248.0245,
              "moku": [
                {
                  "name": "道路等維持費",
                  "v": 130.2308,
                  "prevV": 126.72736
                },
                {
                  "name": "道路行政総務費",
                  "v": 69.04899,
                  "prevV": 69.93726
                },
                {
                  "name": "道路等管理費",
                  "v": 30.05354,
                  "prevV": 29.49004
                },
                {
                  "name": "交通安全・自転車政策推進事業費",
                  "v": 21.72481,
                  "prevV": 21.86984
                }
              ]
            },
            {
              "name": "河川費",
              "v": 33.86476,
              "prevV": 39.32433,
              "moku": [
                {
                  "name": "河川整備費",
                  "v": 19.91576,
                  "prevV": 25.59576
                },
                {
                  "name": "河川管理費",
                  "v": 13.949,
                  "prevV": 13.72857
                }
              ]
            }
          ],
          "港湾費": [
            {
              "name": "港湾管理費",
              "v": 78.53235,
              "prevV": 101.75169,
              "moku": [
                {
                  "name": "港湾総務費",
                  "v": 25.66822,
                  "prevV": 25.90036
                },
                {
                  "name": "みなと賑わい振興費",
                  "v": 23.19506,
                  "prevV": 23.29646
                },
                {
                  "name": "港湾施設等維持費",
                  "v": 11.03921,
                  "prevV": 33.56981
                },
                {
                  "name": "港湾物流費",
                  "v": 9.74158,
                  "prevV": 10.50141
                },
                {
                  "name": "港湾管理費",
                  "v": 8.88828,
                  "prevV": 8.48365
                }
              ]
            },
            {
              "name": "港湾整備費",
              "v": 38.45337,
              "prevV": 29.63012,
              "moku": [
                {
                  "name": "港湾整備費負担金",
                  "v": 25.7134,
                  "prevV": 22.6849
                },
                {
                  "name": "港湾環境施設等整備費",
                  "v": 7.5,
                  "prevV": null
                },
                {
                  "name": "港湾施設等改良費",
                  "v": 5.23997,
                  "prevV": 6.94522
                }
              ]
            }
          ],
          "消防費": [
            {
              "name": "消防費",
              "v": 432.87495,
              "prevV": 407.99905,
              "moku": [
                {
                  "name": "消防総務費",
                  "v": 338.26683,
                  "prevV": 339.52295
                },
                {
                  "name": "消防施設費",
                  "v": 47.03765,
                  "prevV": 25.24676
                },
                {
                  "name": "警防活動費",
                  "v": 21.03333,
                  "prevV": 17.82702
                },
                {
                  "name": "消防団費",
                  "v": 19.74288,
                  "prevV": 19.3615
                },
                {
                  "name": "航空活動費",
                  "v": 3.5495,
                  "prevV": 2.61315
                },
                {
                  "name": "予防活動費",
                  "v": 1.79432,
                  "prevV": 1.71388
                },
                {
                  "name": "消防研修費",
                  "v": 1.45044,
                  "prevV": 1.71379
                }
              ]
            }
          ],
          "教育費": [
            {
              "name": "教育総務費",
              "v": 1875.02684,
              "prevV": 1875.66278,
              "moku": [
                {
                  "name": "教職員費",
                  "v": 1653.68975,
                  "prevV": 1662.31529
                },
                {
                  "name": "事務局費",
                  "v": 115.23434,
                  "prevV": 113.65741
                },
                {
                  "name": "教育指導振興費",
                  "v": 84.13785,
                  "prevV": 77.90114
                },
                {
                  "name": "教育相談費",
                  "v": 14.72028,
                  "prevV": 14.5967
                },
                {
                  "name": "特別支援教育指導振興費",
                  "v": 6.0509,
                  "prevV": 5.45293
                },
                {
                  "name": "教育センター費",
                  "v": 0.98012,
                  "prevV": 1.52589
                },
                {
                  "name": "教育委員会費",
                  "v": 0.2136,
                  "prevV": 0.21342
                }
              ]
            },
            {
              "name": "教育施設整備費",
              "v": 316.97108,
              "prevV": 284.98792,
              "moku": [
                {
                  "name": "学校施設営繕費",
                  "v": 179.94305,
                  "prevV": 185.71584
                },
                {
                  "name": "小・中学校整備費",
                  "v": 115.8543,
                  "prevV": 76.65465
                },
                {
                  "name": "学校用地費",
                  "v": 11.01987,
                  "prevV": 14.39021
                },
                {
                  "name": "教育施設解体費",
                  "v": 5.28469,
                  "prevV": 0.16028
                },
                {
                  "name": "学校施設整備基金積立金",
                  "v": 2.2542,
                  "prevV": 5.42124
                },
                {
                  "name": "特別支援教育施設整備費",
                  "v": 1.31427,
                  "prevV": 1.31427
                },
                {
                  "name": "高等学校整備費",
                  "v": 1.3007,
                  "prevV": 1.33143
                }
              ]
            },
            {
              "name": "学校保健体育費",
              "v": 240.18292,
              "prevV": 216.74139,
              "moku": [
                {
                  "name": "学校給食物資購入費",
                  "v": 114.82643,
                  "prevV": 105.89705
                },
                {
                  "name": "学校給食費",
                  "v": 111.84119,
                  "prevV": 96.95059
                },
                {
                  "name": "学校保健費",
                  "v": 7.36139,
                  "prevV": 7.00954
                },
                {
                  "name": "学校体育費",
                  "v": 6.15391,
                  "prevV": 6.88421
                }
              ]
            },
            {
              "name": "小学校費",
              "v": 130.23075,
              "prevV": 122.37894,
              "moku": [
                {
                  "name": "学校管理費",
                  "v": 88.57836,
                  "prevV": 86.1064
                },
                {
                  "name": "学校運営費",
                  "v": 41.65239,
                  "prevV": 36.27254
                }
              ]
            },
            {
              "name": "中学校費",
              "v": 59.01822,
              "prevV": 57.60278,
              "moku": [
                {
                  "name": "学校管理費",
                  "v": 33.90578,
                  "prevV": 33.2708
                },
                {
                  "name": "学校運営費",
                  "v": 25.11244,
                  "prevV": 24.33198
                }
              ]
            },
            {
              "name": "生涯学習費",
              "v": 34.73077,
              "prevV": 30.92606,
              "moku": [
                {
                  "name": "図書館費",
                  "v": 19.48407,
                  "prevV": 16.90275
                },
                {
                  "name": "文化財保護費",
                  "v": 10.44068,
                  "prevV": 10.33363
                },
                {
                  "name": "生涯学習推進費",
                  "v": 4.80602,
                  "prevV": 3.68968
                }
              ]
            },
            {
              "name": "特別支援学校費",
              "v": 16.4329,
              "prevV": 15.7617,
              "moku": [
                {
                  "name": "学校管理費",
                  "v": 13.79305,
                  "prevV": 13.55901
                },
                {
                  "name": "学校運営費",
                  "v": 2.63985,
                  "prevV": 2.20269
                }
              ]
            },
            {
              "name": "高等学校費",
              "v": 9.98673,
              "prevV": 9.50005,
              "moku": [
                {
                  "name": "学校管理費",
                  "v": 6.18428,
                  "prevV": 6.44953
                },
                {
                  "name": "学校運営費",
                  "v": 3.80245,
                  "prevV": 3.05052
                }
              ]
            }
          ],
          "公債費": [
            {
              "name": "公債費",
              "v": 1846.30402,
              "prevV": 1812.56107,
              "moku": [
                {
                  "name": "元金",
                  "v": 1610.5081,
                  "prevV": 1565.83258
                },
                {
                  "name": "利子",
                  "v": 226.02396,
                  "prevV": 234.96347
                },
                {
                  "name": "公債諸費",
                  "v": 9.77196,
                  "prevV": 11.76502
                }
              ]
            },
            {
              "name": "第三セクター等改革推進債公債費",
              "v": 283.98177,
              "prevV": 75.75678,
              "moku": [
                {
                  "name": "元金",
                  "v": 281.73221,
                  "prevV": 73.22196
                },
                {
                  "name": "利子",
                  "v": 2.24165,
                  "prevV": 2.52616
                },
                {
                  "name": "公債諸費",
                  "v": 0.00791,
                  "prevV": 0.00866
                }
              ]
            }
          ],
          "諸支出金": [
            {
              "name": "特別会計繰出金",
              "v": 1935.05333,
              "prevV": 1887.00723,
              "moku": [
                {
                  "name": "介護保険事業費会計繰出金",
                  "v": 490.85657,
                  "prevV": 491.90647
                },
                {
                  "name": "下水道事業会計繰出金",
                  "v": 410.74493,
                  "prevV": 396.48373
                },
                {
                  "name": "後期高齢者医療事業費会計繰出金",
                  "v": 398.1224,
                  "prevV": 372.93821
                },
                {
                  "name": "国民健康保険事業費会計繰出金",
                  "v": 278.68314,
                  "prevV": 274.87714
                },
                {
                  "name": "高速鉄道事業会計繰出金",
                  "v": 88.98661,
                  "prevV": 75.06018
                },
                {
                  "name": "病院事業会計繰出金",
                  "v": 73.13765,
                  "prevV": 74.40953
                },
                {
                  "name": "自動車事業会計繰出金",
                  "v": 65.86361,
                  "prevV": 66.87256
                },
                {
                  "name": "みどり保全創造事業費会計繰出金",
                  "v": 36.30316,
                  "prevV": 33.85648
                },
                {
                  "name": "市街地開発事業費会計繰出金",
                  "v": 34.29506,
                  "prevV": 43.97862
                },
                {
                  "name": "中央と畜場費会計繰出金",
                  "v": 23.01905,
                  "prevV": 25.19029
                },
                {
                  "name": "水道事業会計繰出金",
                  "v": 21.83155,
                  "prevV": 20.17045
                },
                {
                  "name": "公共事業用地費会計繰出金",
                  "v": 5.62756,
                  "prevV": 4.78362
                },
                {
                  "name": "自動車駐車場事業費会計繰出金",
                  "v": 3.26189,
                  "prevV": 3.88114
                },
                {
                  "name": "中央卸売市場費会計繰出金",
                  "v": 1.90038,
                  "prevV": 0.673
                },
                {
                  "name": "港湾整備事業費会計繰出金",
                  "v": 1.64598,
                  "prevV": 0.87255
                },
                {
                  "name": "母子父子寡婦福祉資金会計繰出金",
                  "v": 0.30762,
                  "prevV": 0.30762
                },
                {
                  "name": "埋立事業会計繰出金",
                  "v": 0.18745,
                  "prevV": 0.4651
                },
                {
                  "name": "勤労者福祉共済事業費会計繰出金",
                  "v": 0.15696,
                  "prevV": 0.15296
                },
                {
                  "name": "公害被害者救済事業費会計繰出金",
                  "v": 0.11024,
                  "prevV": 0.11306
                },
                {
                  "name": "工業用水道事業会計繰出金",
                  "v": 0.01152,
                  "prevV": 0.01452
                }
              ]
            }
          ],
          "予備費": [
            {
              "name": "予備費",
              "v": 10,
              "prevV": 10,
              "moku": [
                {
                  "name": "予備費",
                  "v": 10,
                  "prevV": 10
                }
              ]
            }
          ]
        }
      },
      "sourceTitle": "令和4年度 横浜市予算に関する説明書（一般会計・款項目＋前年度）",
      "localUrl": "/sources/yokohama-setsumeisho-r4/r4ippan.zip",
      "refLabel": "r4ippan.zip",
      "originUrl": "https://www.city.yokohama.lg.jp/city-info/zaisei/jokyo/yosan/r4/r4.files/r4ippan.zip",
      "archiveUrl": "https://www.city.yokohama.lg.jp/city-info/zaisei/jokyo/yosan/r4/r4.files/r4ippan.zip"
    },
    {
      "fy": "R3",
      "fyLabel": "令和3年度 当初予算",
      "byKan": {
        "revenue": {
          "市税": [
            {
              "name": "市民税",
              "v": 4212.3,
              "prevV": 4652.38,
              "moku": [
                {
                  "name": "個人",
                  "v": 3883.13,
                  "prevV": 4177.19
                },
                {
                  "name": "法人",
                  "v": 329.17,
                  "prevV": 475.19
                }
              ]
            },
            {
              "name": "固定資産税",
              "v": 2699.76,
              "prevV": 2769.96,
              "moku": [
                {
                  "name": "固定資産税",
                  "v": 2690.62,
                  "prevV": 2760.71
                },
                {
                  "name": "国有資産等所在市町村交付金及び納付金",
                  "v": 9.14,
                  "prevV": 9.25
                }
              ]
            },
            {
              "name": "都市計画税",
              "v": 590.86,
              "prevV": 603.07,
              "moku": [
                {
                  "name": "都市計画税",
                  "v": 590.86,
                  "prevV": 603.07
                }
              ]
            },
            {
              "name": "市たばこ税",
              "v": 210.69,
              "prevV": 198.85,
              "moku": [
                {
                  "name": "市たばこ税",
                  "v": 210.69,
                  "prevV": 198.85
                }
              ]
            },
            {
              "name": "事業所税",
              "v": 176.8,
              "prevV": 184.57,
              "moku": [
                {
                  "name": "事業所税",
                  "v": 176.8,
                  "prevV": 184.57
                }
              ]
            },
            {
              "name": "軽自動車税",
              "v": 32.29,
              "prevV": 31.2,
              "moku": [
                {
                  "name": "種別割",
                  "v": 30.69,
                  "prevV": 29.52
                },
                {
                  "name": "環境性能割",
                  "v": 1.6,
                  "prevV": 1.68
                }
              ]
            },
            {
              "name": "入湯税",
              "v": 0.39,
              "prevV": 0.79,
              "moku": [
                {
                  "name": "入湯税",
                  "v": 0.39,
                  "prevV": 0.79
                }
              ]
            }
          ],
          "地方譲与税": [
            {
              "name": "自動車重量譲与税",
              "v": 44.49,
              "prevV": 45.14,
              "moku": [
                {
                  "name": "自動車重量譲与税",
                  "v": 44.49,
                  "prevV": 45.14
                }
              ]
            },
            {
              "name": "地方揮発油譲与税",
              "v": 28.31,
              "prevV": 29.56,
              "moku": [
                {
                  "name": "地方揮発油譲与税",
                  "v": 28.31,
                  "prevV": 29.56
                }
              ]
            },
            {
              "name": "特別とん譲与税",
              "v": 10.75,
              "prevV": 11.61,
              "moku": [
                {
                  "name": "特別とん譲与税",
                  "v": 10.75,
                  "prevV": 11.61
                }
              ]
            },
            {
              "name": "森林環境譲与税",
              "v": 3.02,
              "prevV": 3.02,
              "moku": [
                {
                  "name": "森林環境譲与税",
                  "v": 3.02,
                  "prevV": 3.02
                }
              ]
            },
            {
              "name": "石油ガス譲与税",
              "v": 0.15,
              "prevV": 0.29,
              "moku": [
                {
                  "name": "石油ガス譲与税",
                  "v": 0.15,
                  "prevV": 0.29
                }
              ]
            },
            {
              "name": "地方道路譲与税",
              "v": 0.00001,
              "prevV": 0.00001,
              "moku": [
                {
                  "name": "地方道路譲与税",
                  "v": 0.00001,
                  "prevV": 0.00001
                }
              ]
            }
          ],
          "利子割交付金": [
            {
              "name": "利子割交付金",
              "v": 3.39,
              "prevV": 4.64,
              "moku": [
                {
                  "name": "利子割交付金",
                  "v": 3.39,
                  "prevV": 4.64
                }
              ]
            }
          ],
          "配当割交付金": [
            {
              "name": "配当割交付金",
              "v": 43.66,
              "prevV": 46.48,
              "moku": [
                {
                  "name": "配当割交付金",
                  "v": 43.66,
                  "prevV": 46.48
                }
              ]
            }
          ],
          "株式等譲渡所得割交付金": [
            {
              "name": "株式等譲渡所得割交付金",
              "v": 34.64,
              "prevV": 33.96,
              "moku": [
                {
                  "name": "株式等譲渡所得割交付金",
                  "v": 34.64,
                  "prevV": 33.96
                }
              ]
            }
          ],
          "分離課税所得割交付金": [
            {
              "name": "分離課税所得割交付金",
              "v": 9.91,
              "prevV": 9.91,
              "moku": [
                {
                  "name": "分離課税所得割交付金",
                  "v": 9.91,
                  "prevV": 9.91
                }
              ]
            }
          ],
          "法人事業税交付金": [
            {
              "name": "法人事業税交付金",
              "v": 74.12,
              "prevV": 38.81,
              "moku": [
                {
                  "name": "法人事業税交付金",
                  "v": 74.12,
                  "prevV": 38.81
                }
              ]
            }
          ],
          "地方消費税交付金": [
            {
              "name": "地方消費税交付金",
              "v": 750.88,
              "prevV": 823.69,
              "moku": [
                {
                  "name": "地方消費税交付金",
                  "v": 750.88,
                  "prevV": 823.69
                }
              ]
            }
          ],
          "ゴルフ場利用税交付金": [
            {
              "name": "ゴルフ場利用税交付金",
              "v": 1.33,
              "prevV": 1.39,
              "moku": [
                {
                  "name": "ゴルフ場利用税交付金",
                  "v": 1.33,
                  "prevV": 1.39
                }
              ]
            }
          ],
          "環境性能割交付金": [
            {
              "name": "環境性能割交付金",
              "v": 21.83,
              "prevV": 23.54,
              "moku": [
                {
                  "name": "環境性能割交付金",
                  "v": 21.82999,
                  "prevV": 23.54
                },
                {
                  "name": "旧法による自動車取得税交付金",
                  "v": 0.00001,
                  "prevV": null
                }
              ]
            }
          ],
          "軽油引取税交付金": [
            {
              "name": "軽油引取税交付金",
              "v": 116.47,
              "prevV": 118.95,
              "moku": [
                {
                  "name": "軽油引取税交付金",
                  "v": 116.46,
                  "prevV": 118.94
                },
                {
                  "name": "旧法による軽油引取税交付金",
                  "v": 0.01,
                  "prevV": 0.01
                }
              ]
            }
          ],
          "国有提供施設等所在市町村助成交付金": [
            {
              "name": "国有提供施設等所在市町村助成交付金",
              "v": 5,
              "prevV": 5,
              "moku": [
                {
                  "name": "国有提供施設等所在市町村助成交付金",
                  "v": 5,
                  "prevV": 5
                }
              ]
            }
          ],
          "地方特例交付金": [
            {
              "name": "新型コロナウイルス感染症対策地方税減収補填特別交付金",
              "v": 60.67,
              "prevV": null,
              "moku": [
                {
                  "name": "新型コロナウイルス感染症対策地方税減収補填特別交付金",
                  "v": 60.67,
                  "prevV": null
                }
              ]
            },
            {
              "name": "地方特例交付金",
              "v": 52.39,
              "prevV": 50.51,
              "moku": [
                {
                  "name": "地方特例交付金",
                  "v": 52.39,
                  "prevV": 50.51
                }
              ]
            }
          ],
          "地方交付税": [
            {
              "name": "地方交付税",
              "v": 230,
              "prevV": 200,
              "moku": [
                {
                  "name": "地方交付税",
                  "v": 230,
                  "prevV": 200
                }
              ]
            }
          ],
          "交通安全対策特別交付金": [
            {
              "name": "交通安全対策特別交付金",
              "v": 8.14,
              "prevV": 8.4,
              "moku": [
                {
                  "name": "交通安全対策特別交付金",
                  "v": 8.14,
                  "prevV": 8.4
                }
              ]
            }
          ],
          "分担金及び負担金": [
            {
              "name": "負担金",
              "v": 282.76962,
              "prevV": 272.52736,
              "moku": [
                {
                  "name": "教育費負担金",
                  "v": 107.65986,
                  "prevV": 101.17382
                },
                {
                  "name": "こども青少年費負担金",
                  "v": 102.97491,
                  "prevV": 99.09808
                },
                {
                  "name": "健康福祉費負担金",
                  "v": 64.20706,
                  "prevV": 62.38024
                },
                {
                  "name": "道路費負担金",
                  "v": 5.70266,
                  "prevV": 7.18393
                },
                {
                  "name": "都市整備費負担金",
                  "v": 1.14,
                  "prevV": 0.97
                },
                {
                  "name": "港湾費負担金",
                  "v": 0.98468,
                  "prevV": 1.63034
                },
                {
                  "name": "資源循環費負担金",
                  "v": 0.06483,
                  "prevV": 0.06587
                },
                {
                  "name": "消防費負担金",
                  "v": 0.03562,
                  "prevV": 0.02508
                }
              ]
            }
          ],
          "使用料及び手数料": [
            {
              "name": "使用料",
              "v": 387.13964,
              "prevV": 395.69176,
              "moku": [
                {
                  "name": "建築使用料",
                  "v": 109.61334,
                  "prevV": 110.88845
                },
                {
                  "name": "港湾使用料",
                  "v": 92.62913,
                  "prevV": 94.14579
                },
                {
                  "name": "こども青少年使用料",
                  "v": 73.96817,
                  "prevV": 80.04854
                },
                {
                  "name": "道路使用料",
                  "v": 72.09029,
                  "prevV": 70.93586
                },
                {
                  "name": "健康福祉使用料",
                  "v": 16.11258,
                  "prevV": 17.046
                },
                {
                  "name": "環境創造使用料",
                  "v": 10.67523,
                  "prevV": 10.67523
                },
                {
                  "name": "教育使用料",
                  "v": 8.94663,
                  "prevV": 8.94462
                },
                {
                  "name": "総務使用料",
                  "v": 1.46807,
                  "prevV": 1.25982
                },
                {
                  "name": "市民使用料",
                  "v": 0.77087,
                  "prevV": 0.8893
                },
                {
                  "name": "消防使用料",
                  "v": 0.52094,
                  "prevV": 0.47711
                },
                {
                  "name": "経済使用料",
                  "v": 0.27148,
                  "prevV": 0.24796
                },
                {
                  "name": "文化観光使用料",
                  "v": 0.07291,
                  "prevV": 0.13308
                }
              ]
            },
            {
              "name": "手数料",
              "v": 105.54516,
              "prevV": 103.07103,
              "moku": [
                {
                  "name": "資源循環手数料",
                  "v": 57.37626,
                  "prevV": 54.05299
                },
                {
                  "name": "道路手数料",
                  "v": 22.57893,
                  "prevV": 22.92774
                },
                {
                  "name": "市民手数料",
                  "v": 15.21414,
                  "prevV": 15.32696
                },
                {
                  "name": "健康福祉手数料",
                  "v": 3.42697,
                  "prevV": 3.66837
                },
                {
                  "name": "建築手数料",
                  "v": 2.10063,
                  "prevV": 2.09113
                },
                {
                  "name": "総務手数料",
                  "v": 1.88071,
                  "prevV": 2.24705
                },
                {
                  "name": "消防手数料",
                  "v": 1.61953,
                  "prevV": 1.42041
                },
                {
                  "name": "都市整備手数料",
                  "v": 0.7054,
                  "prevV": 0.7636
                },
                {
                  "name": "経済手数料",
                  "v": 0.38042,
                  "prevV": 0.30898
                },
                {
                  "name": "教育手数料",
                  "v": 0.25419,
                  "prevV": 0.25343
                },
                {
                  "name": "環境創造手数料",
                  "v": 0.00779,
                  "prevV": 0.01016
                },
                {
                  "name": "港湾手数料",
                  "v": 0.0001,
                  "prevV": 0.00012
                },
                {
                  "name": "こども青少年手数料",
                  "v": 0.00009,
                  "prevV": 0.00009
                }
              ]
            }
          ],
          "国庫支出金": [
            {
              "name": "国庫負担金",
              "v": 3016.9108,
              "prevV": 2779.30717,
              "moku": [
                {
                  "name": "健康福祉費国庫負担金",
                  "v": 1600.6939,
                  "prevV": 1389.78509
                },
                {
                  "name": "こども青少年費国庫負担金",
                  "v": 1047.1473,
                  "prevV": 1020.65538
                },
                {
                  "name": "教育費国庫負担金",
                  "v": 369.0696,
                  "prevV": 368.8667
                }
              ]
            },
            {
              "name": "国庫補助金",
              "v": 832.26668,
              "prevV": 463.49321,
              "moku": [
                {
                  "name": "健康福祉費国庫補助金",
                  "v": 143.72082,
                  "prevV": 54.97781
                },
                {
                  "name": "道路費国庫補助金",
                  "v": 143.33735,
                  "prevV": 69.08276
                },
                {
                  "name": "こども青少年費国庫補助金",
                  "v": 143.18744,
                  "prevV": 131.39836
                },
                {
                  "name": "新型コロナウイルス感染症対応地方創生臨時交付金",
                  "v": 89.06365,
                  "prevV": null
                },
                {
                  "name": "市民費国庫補助金",
                  "v": 87.55851,
                  "prevV": 49.45315
                },
                {
                  "name": "教育費国庫補助金",
                  "v": 58.92077,
                  "prevV": 38.50084
                },
                {
                  "name": "経済費国庫補助金",
                  "v": 50.705,
                  "prevV": null
                },
                {
                  "name": "環境創造費国庫補助金",
                  "v": 36.60402,
                  "prevV": 24.5381
                },
                {
                  "name": "建築費国庫補助金",
                  "v": 30.5406,
                  "prevV": 28.59745
                },
                {
                  "name": "都市整備費国庫補助金",
                  "v": 15.23591,
                  "prevV": 10.58045
                },
                {
                  "name": "文化観光費国庫補助金",
                  "v": 9.72056,
                  "prevV": 12.93492
                },
                {
                  "name": "資源循環費国庫補助金",
                  "v": 9.21629,
                  "prevV": 8.53001
                },
                {
                  "name": "港湾費国庫補助金",
                  "v": 9.09981,
                  "prevV": 30.2705
                },
                {
                  "name": "総務費国庫補助金",
                  "v": 1.87224,
                  "prevV": 2.30925
                },
                {
                  "name": "消防費国庫補助金",
                  "v": 1.78871,
                  "prevV": 0.93808
                },
                {
                  "name": "地方創生推進交付金",
                  "v": 1.695,
                  "prevV": 1.38153
                }
              ]
            },
            {
              "name": "国庫委託金",
              "v": 12.76778,
              "prevV": 12.10204,
              "moku": [
                {
                  "name": "健康福祉費国庫委託金",
                  "v": 9.36454,
                  "prevV": 8.72644
                },
                {
                  "name": "教育費国庫委託金",
                  "v": 1.33801,
                  "prevV": 1.40791
                },
                {
                  "name": "経済費国庫委託金",
                  "v": 1.29427,
                  "prevV": 1.2748
                },
                {
                  "name": "市民費国庫委託金",
                  "v": 0.43358,
                  "prevV": 0.39508
                },
                {
                  "name": "こども青少年費国庫委託金",
                  "v": 0.31728,
                  "prevV": 0.27771
                },
                {
                  "name": "環境創造費国庫委託金",
                  "v": 0.013,
                  "prevV": 0.013
                },
                {
                  "name": "総務費国庫委託金",
                  "v": 0.0071,
                  "prevV": 0.0071
                }
              ]
            }
          ],
          "県支出金": [
            {
              "name": "県負担金",
              "v": 660.56217,
              "prevV": 648.4668,
              "moku": [
                {
                  "name": "こども青少年費県負担金",
                  "v": 354.18947,
                  "prevV": 347.78521
                },
                {
                  "name": "健康福祉費県負担金",
                  "v": 302.71797,
                  "prevV": 297.08526
                },
                {
                  "name": "総務費県負担金",
                  "v": 2.63,
                  "prevV": 2.90025
                },
                {
                  "name": "道路費県負担金",
                  "v": 0.34857,
                  "prevV": 0.069
                },
                {
                  "name": "環境創造費県負担金",
                  "v": 0.31328,
                  "prevV": 0.35289
                },
                {
                  "name": "教育費県負担金",
                  "v": 0.25286,
                  "prevV": 0.25286
                },
                {
                  "name": "港湾費県負担金",
                  "v": 0.1,
                  "prevV": null
                },
                {
                  "name": "建築費県負担金",
                  "v": 0.00929,
                  "prevV": 0.00944
                },
                {
                  "name": "消防費県負担金",
                  "v": 0.00073,
                  "prevV": 0.01189
                }
              ]
            },
            {
              "name": "県補助金",
              "v": 203.19912,
              "prevV": 167.64047,
              "moku": [
                {
                  "name": "健康福祉費県補助金",
                  "v": 110.05447,
                  "prevV": 90.55959
                },
                {
                  "name": "こども青少年費県補助金",
                  "v": 73.01522,
                  "prevV": 63.47127
                },
                {
                  "name": "道路費県補助金",
                  "v": 7.24071,
                  "prevV": 7.58738
                },
                {
                  "name": "市民費県補助金",
                  "v": 5.98013,
                  "prevV": 0.49078
                },
                {
                  "name": "消防費県補助金",
                  "v": 4.22572,
                  "prevV": 3.60072
                },
                {
                  "name": "建築費県補助金",
                  "v": 1.37252,
                  "prevV": 0.61677
                },
                {
                  "name": "総務費県補助金",
                  "v": 0.50506,
                  "prevV": 0.38286
                },
                {
                  "name": "環境創造費県補助金",
                  "v": 0.38288,
                  "prevV": 0.38388
                },
                {
                  "name": "経済費県補助金",
                  "v": 0.37417,
                  "prevV": 0.48724
                },
                {
                  "name": "教育費県補助金",
                  "v": 0.04824,
                  "prevV": 0.05998
                }
              ]
            },
            {
              "name": "県委託金",
              "v": 80.72468,
              "prevV": 82.46922,
              "moku": [
                {
                  "name": "総務費県委託金",
                  "v": 78.282,
                  "prevV": 80.53936
                },
                {
                  "name": "市民費県委託金",
                  "v": 1.93222,
                  "prevV": 1.42666
                },
                {
                  "name": "健康福祉費県委託金",
                  "v": 0.47921,
                  "prevV": 0.47237
                },
                {
                  "name": "環境創造費県委託金",
                  "v": 0.01835,
                  "prevV": 0.01835
                },
                {
                  "name": "港湾費県委託金",
                  "v": 0.0129,
                  "prevV": 0.01248
                }
              ]
            }
          ],
          "財産収入": [
            {
              "name": "財産売払収入",
              "v": 418.91722,
              "prevV": 88.80897,
              "moku": [
                {
                  "name": "工作物売払収入",
                  "v": 338,
                  "prevV": null
                },
                {
                  "name": "不動産売払収入",
                  "v": 76.30927,
                  "prevV": 88.36715
                },
                {
                  "name": "有価証券売払収入",
                  "v": 4.095,
                  "prevV": null
                },
                {
                  "name": "物品売払収入",
                  "v": 0.43962,
                  "prevV": 0.33852
                },
                {
                  "name": "生産物売払収入",
                  "v": 0.07333,
                  "prevV": 0.1033
                }
              ]
            },
            {
              "name": "財産運用収入",
              "v": 60.30396,
              "prevV": 57.1537,
              "moku": [
                {
                  "name": "財産貸付収入",
                  "v": 57.45295,
                  "prevV": 54.39515
                },
                {
                  "name": "利子及び配当金",
                  "v": 2.85101,
                  "prevV": 2.75855
                }
              ]
            }
          ],
          "寄附金": [
            {
              "name": "寄附金",
              "v": 11.61005,
              "prevV": 10.79821,
              "moku": [
                {
                  "name": "指定寄附金",
                  "v": 6.74088,
                  "prevV": 7.32859
                },
                {
                  "name": "一般寄附金",
                  "v": 4.86917,
                  "prevV": 3.46962
                }
              ]
            }
          ],
          "繰入金": [
            {
              "name": "減債基金繰入金",
              "v": 243.14985,
              "prevV": 259.2175,
              "moku": [
                {
                  "name": "減債基金繰入金",
                  "v": 243.14985,
                  "prevV": 259.2175
                }
              ]
            },
            {
              "name": "財政調整基金繰入金",
              "v": 54,
              "prevV": 41.38889,
              "moku": [
                {
                  "name": "財政調整基金繰入金",
                  "v": 54,
                  "prevV": 41.38889
                }
              ]
            },
            {
              "name": "資産活用推進基金繰入金",
              "v": 42.93536,
              "prevV": 21.09221,
              "moku": [
                {
                  "name": "資産活用推進基金繰入金",
                  "v": 42.93536,
                  "prevV": 21.09221
                }
              ]
            },
            {
              "name": "母子父子寡婦福祉資金会計繰入金",
              "v": 2.63231,
              "prevV": 2.11866,
              "moku": [
                {
                  "name": "母子父子寡婦福祉資金会計繰入金",
                  "v": 2.63231,
                  "prevV": 2.11866
                }
              ]
            },
            {
              "name": "都市交通基盤整備基金繰入金",
              "v": 2.44066,
              "prevV": 1.90263,
              "moku": [
                {
                  "name": "都市交通基盤整備基金繰入金",
                  "v": 2.44066,
                  "prevV": 1.90263
                }
              ]
            },
            {
              "name": "都市整備基金繰入金",
              "v": 2.3,
              "prevV": 2,
              "moku": [
                {
                  "name": "都市整備基金繰入金",
                  "v": 2.3,
                  "prevV": 2
                }
              ]
            },
            {
              "name": "社会福祉基金繰入金",
              "v": 0.83516,
              "prevV": 0.71736,
              "moku": [
                {
                  "name": "社会福祉基金繰入金",
                  "v": 0.83516,
                  "prevV": 0.71736
                }
              ]
            },
            {
              "name": "環境保全基金繰入金",
              "v": 0.71671,
              "prevV": 0.60539,
              "moku": [
                {
                  "name": "環境保全基金繰入金",
                  "v": 0.71671,
                  "prevV": 0.60539
                }
              ]
            },
            {
              "name": "学校給食費調整基金繰入金",
              "v": 0.5676,
              "prevV": null,
              "moku": [
                {
                  "name": "学校給食費調整基金繰入金",
                  "v": 0.5676,
                  "prevV": null
                }
              ]
            },
            {
              "name": "市民活動推進基金繰入金",
              "v": 0.36446,
              "prevV": 0.38171,
              "moku": [
                {
                  "name": "市民活動推進基金繰入金",
                  "v": 0.36446,
                  "prevV": 0.38171
                }
              ]
            },
            {
              "name": "協働の森基金繰入金",
              "v": 0.35,
              "prevV": 0.25,
              "moku": [
                {
                  "name": "協働の森基金繰入金",
                  "v": 0.35,
                  "prevV": 0.25
                }
              ]
            },
            {
              "name": "世界を目指す若者応援基金繰入金",
              "v": 0.112,
              "prevV": 0.112,
              "moku": [
                {
                  "name": "世界を目指す若者応援基金繰入金",
                  "v": 0.112,
                  "prevV": 0.112
                }
              ]
            },
            {
              "name": "動物園基金繰入金",
              "v": 0.09,
              "prevV": 0.09,
              "moku": [
                {
                  "name": "動物園基金繰入金",
                  "v": 0.09,
                  "prevV": 0.09
                }
              ]
            }
          ],
          "繰越金": [
            {
              "name": "繰越金",
              "v": 0.00001,
              "prevV": 0.00001,
              "moku": [
                {
                  "name": "繰越金",
                  "v": 0.00001,
                  "prevV": 0.00001
                }
              ]
            }
          ],
          "諸収入": [
            {
              "name": "貸付金元利収入",
              "v": 2269.82974,
              "prevV": 466.97112,
              "moku": [
                {
                  "name": "経済費貸付金元利収入",
                  "v": 1925.45066,
                  "prevV": 360.70141
                },
                {
                  "name": "道路費貸付金元利収入",
                  "v": 325,
                  "prevV": 53
                },
                {
                  "name": "総務費貸付金元利収入",
                  "v": 13.91166,
                  "prevV": 18.76943
                },
                {
                  "name": "港湾費貸付金元利収入",
                  "v": 2.43391,
                  "prevV": 3.786
                },
                {
                  "name": "建築費貸付金元利収入",
                  "v": 0.94892,
                  "prevV": 0.97281
                },
                {
                  "name": "環境創造費貸付金元利収入",
                  "v": 0.7011,
                  "prevV": 0.7011
                },
                {
                  "name": "文化観光費貸付金元利収入",
                  "v": 0.54708,
                  "prevV": 27.42087
                },
                {
                  "name": "健康福祉費貸付金元利収入",
                  "v": 0.46452,
                  "prevV": 0.72017
                },
                {
                  "name": "市民費貸付金元利収入",
                  "v": 0.30599,
                  "prevV": 0.80954
                },
                {
                  "name": "教育費貸付金元利収入",
                  "v": 0.05478,
                  "prevV": 0.07867
                },
                {
                  "name": "資源循環費貸付金元利収入",
                  "v": 0.01112,
                  "prevV": 0.01112
                }
              ]
            },
            {
              "name": "雑入",
              "v": 135.92852,
              "prevV": 140.23884,
              "moku": [
                {
                  "name": "資源循環費雑入",
                  "v": 43.99122,
                  "prevV": 44.43929
                },
                {
                  "name": "雑入",
                  "v": 23.10769,
                  "prevV": 22.78442
                },
                {
                  "name": "健康福祉費雑入",
                  "v": 20.43375,
                  "prevV": 18.98314
                },
                {
                  "name": "総務費雑入",
                  "v": 15.34922,
                  "prevV": 17.69192
                },
                {
                  "name": "こども青少年費雑入",
                  "v": 8.20318,
                  "prevV": 8.08959
                },
                {
                  "name": "港湾費雑入",
                  "v": 6.30169,
                  "prevV": 6.07417
                },
                {
                  "name": "環境創造費雑入",
                  "v": 5.80813,
                  "prevV": 7.43859
                },
                {
                  "name": "経済費雑入",
                  "v": 3.28825,
                  "prevV": 4.7094
                },
                {
                  "name": "市民費雑入",
                  "v": 2.35969,
                  "prevV": 2.07726
                },
                {
                  "name": "道路費雑入",
                  "v": 2.26903,
                  "prevV": 2.2786
                },
                {
                  "name": "消防費雑入",
                  "v": 1.84897,
                  "prevV": 2.96904
                },
                {
                  "name": "建築費雑入",
                  "v": 1.43699,
                  "prevV": 1.08434
                },
                {
                  "name": "教育費雑入",
                  "v": 0.9344,
                  "prevV": 1.02277
                },
                {
                  "name": "都市整備費雑入",
                  "v": 0.59631,
                  "prevV": 0.59631
                }
              ]
            },
            {
              "name": "収益事業収入",
              "v": 100,
              "prevV": 100,
              "moku": [
                {
                  "name": "宝くじ収入",
                  "v": 100,
                  "prevV": 100
                }
              ]
            },
            {
              "name": "延滞金、加算金及び過料",
              "v": 3.48297,
              "prevV": 3.94171,
              "moku": [
                {
                  "name": "延滞金",
                  "v": 3.44285,
                  "prevV": 3.90159
                },
                {
                  "name": "過料",
                  "v": 0.04011,
                  "prevV": 0.04011
                },
                {
                  "name": "加算金",
                  "v": 0.00001,
                  "prevV": 0.00001
                }
              ]
            },
            {
              "name": "市預金利子",
              "v": 0.015,
              "prevV": 0.02,
              "moku": [
                {
                  "name": "市預金利子",
                  "v": 0.015,
                  "prevV": 0.02
                }
              ]
            }
          ],
          "市債": [
            {
              "name": "市債",
              "v": 1717.9,
              "prevV": 1266.61,
              "moku": [
                {
                  "name": "臨時財政対策債",
                  "v": 780,
                  "prevV": 300
                },
                {
                  "name": "道路債",
                  "v": 227.09,
                  "prevV": 264.5
                },
                {
                  "name": "教育債",
                  "v": 166.86,
                  "prevV": 179.2
                },
                {
                  "name": "都市整備債",
                  "v": 100.55,
                  "prevV": 96.77
                },
                {
                  "name": "環境創造債",
                  "v": 66.31,
                  "prevV": 72.53
                },
                {
                  "name": "健康福祉債",
                  "v": 64.77,
                  "prevV": 32.05
                },
                {
                  "name": "文化観光債",
                  "v": 52.47,
                  "prevV": 17.92
                },
                {
                  "name": "建築債",
                  "v": 41.61,
                  "prevV": 41.11
                },
                {
                  "name": "資源循環債",
                  "v": 40.51,
                  "prevV": 29.79
                },
                {
                  "name": "諸支出債",
                  "v": 36.91,
                  "prevV": 34.45
                },
                {
                  "name": "港湾債",
                  "v": 35.54,
                  "prevV": 46.29
                },
                {
                  "name": "市民債",
                  "v": 34.8,
                  "prevV": 63.98
                },
                {
                  "name": "消防債",
                  "v": 29.61,
                  "prevV": 21.39
                },
                {
                  "name": "総務債",
                  "v": 25.27,
                  "prevV": 54.14
                },
                {
                  "name": "こども青少年債",
                  "v": 15.6,
                  "prevV": 12.49
                }
              ]
            }
          ]
        },
        "expenditure": {
          "議会費": [
            {
              "name": "議会費",
              "v": 30.95987,
              "prevV": 31.18043,
              "moku": [
                {
                  "name": "議会費",
                  "v": 30.95987,
                  "prevV": 31.18043
                }
              ]
            }
          ],
          "総務費": [
            {
              "name": "総務費",
              "v": 310.07979,
              "prevV": 410.71855,
              "moku": [
                {
                  "name": "人事管理費",
                  "v": 147.32599,
                  "prevV": 149.27398
                },
                {
                  "name": "行政運営費",
                  "v": 87.18951,
                  "prevV": 187.99492
                },
                {
                  "name": "情報化推進費",
                  "v": 55.1675,
                  "prevV": 48.86069
                },
                {
                  "name": "危機管理費",
                  "v": 20.39679,
                  "prevV": 24.58896
                }
              ]
            },
            {
              "name": "政策費",
              "v": 194.10569,
              "prevV": 220.89671,
              "moku": [
                {
                  "name": "政策推進費",
                  "v": 192.73418,
                  "prevV": 203.80484
                },
                {
                  "name": "統計情報費",
                  "v": 1.37151,
                  "prevV": 17.09187
                }
              ]
            },
            {
              "name": "税務費",
              "v": 131.97333,
              "prevV": 133.12208,
              "moku": [
                {
                  "name": "税務管理費",
                  "v": 89.70369,
                  "prevV": 90.83771
                },
                {
                  "name": "賦課徴収費",
                  "v": 42.26964,
                  "prevV": 42.28437
                }
              ]
            },
            {
              "name": "選挙費",
              "v": 34.79115,
              "prevV": 9.0156,
              "moku": [
                {
                  "name": "衆議院議員選挙費",
                  "v": 13.4607,
                  "prevV": null
                },
                {
                  "name": "市長選挙費",
                  "v": 13,
                  "prevV": null
                },
                {
                  "name": "選挙管理委員会費",
                  "v": 8.33045,
                  "prevV": 9.0156
                }
              ]
            },
            {
              "name": "財政費",
              "v": 32.61182,
              "prevV": 26.44265,
              "moku": [
                {
                  "name": "財政運営費",
                  "v": 30.55927,
                  "prevV": 24.78076
                },
                {
                  "name": "財産管理費",
                  "v": 2.05255,
                  "prevV": 1.66189
                }
              ]
            },
            {
              "name": "国際費",
              "v": 15.31875,
              "prevV": 16.65601,
              "moku": [
                {
                  "name": "国際費",
                  "v": 15.31875,
                  "prevV": 16.65601
                }
              ]
            },
            {
              "name": "会計管理費",
              "v": 15.22678,
              "prevV": 15.81823,
              "moku": [
                {
                  "name": "会計管理費",
                  "v": 15.22678,
                  "prevV": 15.81823
                }
              ]
            },
            {
              "name": "監査費",
              "v": 4.23959,
              "prevV": 4.41007,
              "moku": [
                {
                  "name": "監査委員費",
                  "v": 4.06454,
                  "prevV": 4.23502
                },
                {
                  "name": "外部監査費",
                  "v": 0.17505,
                  "prevV": 0.17505
                }
              ]
            },
            {
              "name": "人事委員会費",
              "v": 2.66844,
              "prevV": 2.7033,
              "moku": [
                {
                  "name": "人事委員会費",
                  "v": 2.66844,
                  "prevV": 2.7033
                }
              ]
            }
          ],
          "市民費": [
            {
              "name": "地域行政費",
              "v": 302.69404,
              "prevV": 288.1122,
              "moku": [
                {
                  "name": "個性ある区づくり推進費",
                  "v": 155.09285,
                  "prevV": 155.37297
                },
                {
                  "name": "戸籍住民登録費",
                  "v": 101.18957,
                  "prevV": 62.75999
                },
                {
                  "name": "地域施設費",
                  "v": 46.41162,
                  "prevV": 69.97924
                }
              ]
            },
            {
              "name": "市民行政費",
              "v": 220.08564,
              "prevV": 228.51509,
              "moku": [
                {
                  "name": "市民総務費",
                  "v": 133.96447,
                  "prevV": 132.42676
                },
                {
                  "name": "スポーツ振興費",
                  "v": 49.45942,
                  "prevV": 63.16204
                },
                {
                  "name": "市民協働推進費",
                  "v": 25.18262,
                  "prevV": 21.64535
                },
                {
                  "name": "広報広聴費",
                  "v": 10.94779,
                  "prevV": 10.75464
                },
                {
                  "name": "人権施策推進費",
                  "v": 0.53134,
                  "prevV": 0.5263
                }
              ]
            }
          ],
          "文化観光費": [
            {
              "name": "文化観光費",
              "v": 184.71621,
              "prevV": 142.83901,
              "moku": [
                {
                  "name": "文化芸術創造都市推進費",
                  "v": 108.10187,
                  "prevV": 73.41571
                },
                {
                  "name": "観光ＭＩＣＥ振興費",
                  "v": 57.93637,
                  "prevV": 49.72875
                },
                {
                  "name": "文化観光総務費",
                  "v": 13.19437,
                  "prevV": 13.99255
                },
                {
                  "name": "文化プログラム推進費",
                  "v": 5.4836,
                  "prevV": 5.702
                }
              ]
            }
          ],
          "経済費": [
            {
              "name": "経済費",
              "v": 2055.05039,
              "prevV": 436.09572,
              "moku": [
                {
                  "name": "中小企業金融対策費",
                  "v": 1980.37456,
                  "prevV": 366.9315
                },
                {
                  "name": "誘致推進費",
                  "v": 27.26018,
                  "prevV": 25.92412
                },
                {
                  "name": "経済総務費",
                  "v": 16.90537,
                  "prevV": 16.71897
                },
                {
                  "name": "経営支援費",
                  "v": 9.42087,
                  "prevV": 4.46605
                },
                {
                  "name": "雇用労働費",
                  "v": 8.17755,
                  "prevV": 8.10893
                },
                {
                  "name": "産業活性化推進費",
                  "v": 6.72867,
                  "prevV": 8.04305
                },
                {
                  "name": "消費経済費",
                  "v": 3.50319,
                  "prevV": 3.36689
                },
                {
                  "name": "商業振興費",
                  "v": 2.68,
                  "prevV": 2.53621
                }
              ]
            }
          ],
          "こども青少年費": [
            {
              "name": "子育て支援費",
              "v": 1956.04392,
              "prevV": 1879.66013,
              "moku": [
                {
                  "name": "保育・教育施設運営費",
                  "v": 1690.52847,
                  "prevV": 1616.44613
                },
                {
                  "name": "幼児教育費",
                  "v": 110.53596,
                  "prevV": 119.41633
                },
                {
                  "name": "放課後児童育成費",
                  "v": 97.41947,
                  "prevV": 88.30475
                },
                {
                  "name": "保育所等整備費",
                  "v": 30.70513,
                  "prevV": 32.37799
                },
                {
                  "name": "地域子育て支援費",
                  "v": 26.85489,
                  "prevV": 23.11493
                }
              ]
            },
            {
              "name": "こども福祉保健費",
              "v": 1004.84678,
              "prevV": 975.60473,
              "moku": [
                {
                  "name": "こども手当費",
                  "v": 606.92115,
                  "prevV": 620.72655
                },
                {
                  "name": "こども家庭福祉費",
                  "v": 167.07766,
                  "prevV": 149.76849
                },
                {
                  "name": "児童措置費",
                  "v": 95.97418,
                  "prevV": 94.94676
                },
                {
                  "name": "親子保健費",
                  "v": 62.90051,
                  "prevV": 47.71873
                },
                {
                  "name": "児童福祉施設運営費",
                  "v": 37.81363,
                  "prevV": 37.70555
                },
                {
                  "name": "児童相談所費",
                  "v": 18.91748,
                  "prevV": 16.71118
                },
                {
                  "name": "児童福祉施設整備費",
                  "v": 15.24217,
                  "prevV": 8.02747
                }
              ]
            },
            {
              "name": "青少年費",
              "v": 227.34699,
              "prevV": 224.04209,
              "moku": [
                {
                  "name": "こども青少年総務費",
                  "v": 214.09016,
                  "prevV": 211.32044
                },
                {
                  "name": "青少年育成費",
                  "v": 13.25683,
                  "prevV": 12.72165
                }
              ]
            }
          ],
          "健康福祉費": [
            {
              "name": "生活援護費",
              "v": 1316.86416,
              "prevV": 1294.39389,
              "moku": [
                {
                  "name": "生活保護費",
                  "v": 1296.99497,
                  "prevV": 1274.651
                },
                {
                  "name": "援護対策費",
                  "v": 19.86919,
                  "prevV": 19.74289
                }
              ]
            },
            {
              "name": "障害者福祉費",
              "v": 1198.72083,
              "prevV": 1174.04031,
              "moku": [
                {
                  "name": "障害者福祉費",
                  "v": 978.11347,
                  "prevV": 961.85824
                },
                {
                  "name": "重度障害者医療費",
                  "v": 162.34152,
                  "prevV": 158.0637
                },
                {
                  "name": "リハビリテーションセンター等運営費",
                  "v": 33.2586,
                  "prevV": 30.76536
                },
                {
                  "name": "障害者手当費",
                  "v": 10.9441,
                  "prevV": 10.88474
                },
                {
                  "name": "障害者福祉施設運営費",
                  "v": 7.68979,
                  "prevV": 6.18139
                },
                {
                  "name": "こころの健康相談センター等運営費",
                  "v": 6.37335,
                  "prevV": 6.28688
                }
              ]
            },
            {
              "name": "公衆衛生費",
              "v": 542.70844,
              "prevV": 232.42192,
              "moku": [
                {
                  "name": "健康安全費",
                  "v": 410.3204,
                  "prevV": 106.5026
                },
                {
                  "name": "地域保健推進費",
                  "v": 58.84689,
                  "prevV": 54.36356
                },
                {
                  "name": "健康診査費",
                  "v": 58.42967,
                  "prevV": 56.97491
                },
                {
                  "name": "健康づくり費",
                  "v": 9.6785,
                  "prevV": 9.13695
                },
                {
                  "name": "公害・石綿健康被害対策事業費",
                  "v": 5.43298,
                  "prevV": 5.4439
                }
              ]
            },
            {
              "name": "社会福祉費",
              "v": 452.27742,
              "prevV": 447.19948,
              "moku": [
                {
                  "name": "社会福祉総務費",
                  "v": 268.5157,
                  "prevV": 262.44093
                },
                {
                  "name": "小児医療費",
                  "v": 104.81596,
                  "prevV": 106.19788
                },
                {
                  "name": "社会福祉事業振興費",
                  "v": 61.72408,
                  "prevV": 60.57137
                },
                {
                  "name": "ひとり親家庭等医療費",
                  "v": 15.66189,
                  "prevV": 16.36958
                },
                {
                  "name": "国民年金費",
                  "v": 1.55979,
                  "prevV": 1.61972
                }
              ]
            },
            {
              "name": "老人福祉費",
              "v": 135.49889,
              "prevV": 117.47499,
              "moku": [
                {
                  "name": "老人福祉費",
                  "v": 103.50497,
                  "prevV": 86.46381
                },
                {
                  "name": "老人措置費",
                  "v": 30.621,
                  "prevV": 29.52637
                },
                {
                  "name": "老人福祉施設運営費",
                  "v": 1.37292,
                  "prevV": 1.48481
                }
              ]
            },
            {
              "name": "健康福祉施設整備費",
              "v": 97.13764,
              "prevV": 60.05648,
              "moku": [
                {
                  "name": "健康福祉施設整備費",
                  "v": 97.13764,
                  "prevV": 60.05648
                }
              ]
            },
            {
              "name": "医療政策費",
              "v": 46.96156,
              "prevV": 37.26549,
              "moku": [
                {
                  "name": "医療政策費",
                  "v": 46.96156,
                  "prevV": 37.26549
                }
              ]
            },
            {
              "name": "環境衛生費",
              "v": 30.4916,
              "prevV": 32.02789,
              "moku": [
                {
                  "name": "葬務費",
                  "v": 22.73974,
                  "prevV": 24.25153
                },
                {
                  "name": "衛生研究所費",
                  "v": 2.5482,
                  "prevV": 2.42905
                },
                {
                  "name": "動物保護指導費",
                  "v": 1.85423,
                  "prevV": 1.90627
                },
                {
                  "name": "食品衛生費",
                  "v": 1.82506,
                  "prevV": 1.94546
                },
                {
                  "name": "食肉衛生検査所費",
                  "v": 0.82221,
                  "prevV": 0.79728
                },
                {
                  "name": "環境衛生指導費",
                  "v": 0.70216,
                  "prevV": 0.6983
                }
              ]
            }
          ],
          "環境創造費": [
            {
              "name": "環境整備費",
              "v": 158.09809,
              "prevV": 151.53409,
              "moku": [
                {
                  "name": "公園緑地整備費",
                  "v": 158.09809,
                  "prevV": 151.53409
                }
              ]
            },
            {
              "name": "環境施設費",
              "v": 93.44386,
              "prevV": 92.36397,
              "moku": [
                {
                  "name": "公園緑地管理費",
                  "v": 69.50175,
                  "prevV": 68.38417
                },
                {
                  "name": "動物園費",
                  "v": 23.94211,
                  "prevV": 23.9798
                }
              ]
            },
            {
              "name": "環境総務費",
              "v": 92.11948,
              "prevV": 93.05827,
              "moku": [
                {
                  "name": "環境総務費",
                  "v": 63.49292,
                  "prevV": 63.8585
                },
                {
                  "name": "みどり基金積立金",
                  "v": 28.05,
                  "prevV": 28.58
                },
                {
                  "name": "地籍調査費",
                  "v": 0.57656,
                  "prevV": 0.61977
                }
              ]
            },
            {
              "name": "総合企画費",
              "v": 11.67457,
              "prevV": 12.02232,
              "moku": [
                {
                  "name": "温暖化対策費",
                  "v": 8.68136,
                  "prevV": 8.06853
                },
                {
                  "name": "環境科学研究費",
                  "v": 1.81744,
                  "prevV": 1.73395
                },
                {
                  "name": "建設発生土対策費",
                  "v": 0.7667,
                  "prevV": 1.8282
                },
                {
                  "name": "環境政策費",
                  "v": 0.40907,
                  "prevV": 0.39164
                }
              ]
            },
            {
              "name": "環境活動推進費",
              "v": 9.55764,
              "prevV": 10.09033,
              "moku": [
                {
                  "name": "農政推進費",
                  "v": 4.58953,
                  "prevV": 4.58818
                },
                {
                  "name": "環境活動事業費",
                  "v": 3.77517,
                  "prevV": 4.50436
                },
                {
                  "name": "農業振興費",
                  "v": 1.19294,
                  "prevV": 0.99779
                }
              ]
            },
            {
              "name": "環境保全費",
              "v": 4.29411,
              "prevV": 4.6437,
              "moku": [
                {
                  "name": "環境保全事業費",
                  "v": 4.29411,
                  "prevV": 4.6437
                }
              ]
            }
          ],
          "資源循環費": [
            {
              "name": "資源循環管理費",
              "v": 236.44237,
              "prevV": 229.43858,
              "moku": [
                {
                  "name": "資源循環総務費",
                  "v": 157.13525,
                  "prevV": 160.84561
                },
                {
                  "name": "減量・リサイクル推進費",
                  "v": 49.88379,
                  "prevV": 46.2957
                },
                {
                  "name": "車両管理費",
                  "v": 20.8543,
                  "prevV": 17.53965
                },
                {
                  "name": "事務所費",
                  "v": 8.56903,
                  "prevV": 4.75762
                }
              ]
            },
            {
              "name": "適正処理費",
              "v": 188.64502,
              "prevV": 186.27823,
              "moku": [
                {
                  "name": "工場費",
                  "v": 79.86398,
                  "prevV": 80.52677
                },
                {
                  "name": "適正処理総務費",
                  "v": 63.90869,
                  "prevV": 63.11747
                },
                {
                  "name": "処分地費",
                  "v": 39.80391,
                  "prevV": 34.78845
                },
                {
                  "name": "産業廃棄物対策費",
                  "v": 5.06844,
                  "prevV": 7.84554
                }
              ]
            },
            {
              "name": "し尿処理費",
              "v": 3.29246,
              "prevV": 4.21584,
              "moku": [
                {
                  "name": "し尿処理総務費",
                  "v": 1.76838,
                  "prevV": 1.72479
                },
                {
                  "name": "し尿処理施設費",
                  "v": 1.52408,
                  "prevV": 2.49105
                }
              ]
            }
          ],
          "建築費": [
            {
              "name": "住宅費",
              "v": 124.4524,
              "prevV": 124.37666,
              "moku": [
                {
                  "name": "市営住宅管理費",
                  "v": 75.11833,
                  "prevV": 77.0373
                },
                {
                  "name": "市営住宅整備費",
                  "v": 30.80894,
                  "prevV": 29.38879
                },
                {
                  "name": "優良賃貸住宅事業費",
                  "v": 16.26334,
                  "prevV": 15.6578
                },
                {
                  "name": "住宅施策推進費",
                  "v": 2.26179,
                  "prevV": 2.29277
                }
              ]
            },
            {
              "name": "建築指導費",
              "v": 118.26531,
              "prevV": 124.76624,
              "moku": [
                {
                  "name": "建築行政総務費",
                  "v": 75.6415,
                  "prevV": 86.83986
                },
                {
                  "name": "公共建築物長寿命化対策費",
                  "v": 40.76138,
                  "prevV": 36.26575
                },
                {
                  "name": "都市計画調査費",
                  "v": 1.56147,
                  "prevV": 1.36131
                },
                {
                  "name": "工事監理費",
                  "v": 0.30096,
                  "prevV": 0.29932
                }
              ]
            }
          ],
          "都市整備費": [
            {
              "name": "都市整備費",
              "v": 193.57814,
              "prevV": 207.72826,
              "moku": [
                {
                  "name": "都市交通費",
                  "v": 103.60351,
                  "prevV": 113.33064
                },
                {
                  "name": "地域整備費",
                  "v": 52.99614,
                  "prevV": 62.10314
                },
                {
                  "name": "企画費",
                  "v": 33.37849,
                  "prevV": 28.29448
                },
                {
                  "name": "ＩＲ推進費",
                  "v": 3.6,
                  "prevV": 4
                }
              ]
            }
          ],
          "道路費": [
            {
              "name": "道路整備費",
              "v": 1073.06382,
              "prevV": 533.18663,
              "moku": [
                {
                  "name": "街路整備費",
                  "v": 837.99505,
                  "prevV": 298.40538
                },
                {
                  "name": "道路特別整備費",
                  "v": 136.75378,
                  "prevV": 127.2985
                },
                {
                  "name": "道路費負担金",
                  "v": 87.19832,
                  "prevV": 95.98
                },
                {
                  "name": "交通安全施設等整備費",
                  "v": 7.23628,
                  "prevV": 6.551
                },
                {
                  "name": "地域交通対策費",
                  "v": 2.46792,
                  "prevV": 2.3283
                },
                {
                  "name": "高速道路等整備費",
                  "v": 1.41247,
                  "prevV": 2.62345
                }
              ]
            },
            {
              "name": "道路維持管理費",
              "v": 244.66836,
              "prevV": 246.08617,
              "moku": [
                {
                  "name": "道路等維持費",
                  "v": 122.8544,
                  "prevV": 122.55533
                },
                {
                  "name": "道路行政総務費",
                  "v": 66.79075,
                  "prevV": 67.87186
                },
                {
                  "name": "道路等管理費",
                  "v": 29.49004,
                  "prevV": 29.48865
                },
                {
                  "name": "交通安全・自転車政策推進事業費",
                  "v": 21.86984,
                  "prevV": 22.50589
                },
                {
                  "name": "道路台帳整備費",
                  "v": 3.14651,
                  "prevV": 3.14762
                },
                {
                  "name": "道路用地整理費",
                  "v": 0.51682,
                  "prevV": 0.51682
                }
              ]
            },
            {
              "name": "河川費",
              "v": 39.32433,
              "prevV": 38.47663,
              "moku": [
                {
                  "name": "河川整備費",
                  "v": 25.59576,
                  "prevV": 23.56691
                },
                {
                  "name": "河川管理費",
                  "v": 13.72857,
                  "prevV": 14.90972
                }
              ]
            }
          ],
          "港湾費": [
            {
              "name": "港湾管理費",
              "v": 101.73282,
              "prevV": 157.24564,
              "moku": [
                {
                  "name": "港湾施設等維持費",
                  "v": 33.64225,
                  "prevV": 73.34892
                },
                {
                  "name": "港湾総務費",
                  "v": 25.86074,
                  "prevV": 25.99504
                },
                {
                  "name": "みなと賑わい振興費",
                  "v": 23.33608,
                  "prevV": 33.16875
                },
                {
                  "name": "港湾物流費",
                  "v": 10.49641,
                  "prevV": 11.28223
                },
                {
                  "name": "港湾管理費",
                  "v": 8.39734,
                  "prevV": 13.4507
                }
              ]
            },
            {
              "name": "港湾整備費",
              "v": 29.64899,
              "prevV": 33.1038,
              "moku": [
                {
                  "name": "港湾整備費負担金",
                  "v": 22.6849,
                  "prevV": 9.56
                },
                {
                  "name": "港湾施設等改良費",
                  "v": 6.96409,
                  "prevV": 23.5438
                }
              ]
            }
          ],
          "消防費": [
            {
              "name": "消防費",
              "v": 407.99905,
              "prevV": 395.22528,
              "moku": [
                {
                  "name": "消防総務費",
                  "v": 339.52295,
                  "prevV": 337.70353
                },
                {
                  "name": "消防施設費",
                  "v": 25.24676,
                  "prevV": 16.23535
                },
                {
                  "name": "消防団費",
                  "v": 19.3615,
                  "prevV": 18.80748
                },
                {
                  "name": "警防活動費",
                  "v": 17.82702,
                  "prevV": 17.14324
                },
                {
                  "name": "航空活動費",
                  "v": 2.61315,
                  "prevV": 2.45936
                },
                {
                  "name": "予防活動費",
                  "v": 1.71388,
                  "prevV": 1.54284
                },
                {
                  "name": "消防研修費",
                  "v": 1.71379,
                  "prevV": 1.33348
                }
              ]
            }
          ],
          "教育費": [
            {
              "name": "教育総務費",
              "v": 1875.66278,
              "prevV": 1867.95004,
              "moku": [
                {
                  "name": "教職員費",
                  "v": 1662.31529,
                  "prevV": 1675.63781
                },
                {
                  "name": "事務局費",
                  "v": 113.65741,
                  "prevV": 102.91848
                },
                {
                  "name": "教育指導振興費",
                  "v": 77.90114,
                  "prevV": 68.49199
                },
                {
                  "name": "教育相談費",
                  "v": 14.5967,
                  "prevV": 13.46253
                },
                {
                  "name": "特別支援教育指導振興費",
                  "v": 5.45293,
                  "prevV": 5.10441
                },
                {
                  "name": "教育センター費",
                  "v": 1.52589,
                  "prevV": 2.12122
                },
                {
                  "name": "教育委員会費",
                  "v": 0.21342,
                  "prevV": 0.2136
                }
              ]
            },
            {
              "name": "教育施設整備費",
              "v": 284.98792,
              "prevV": 295.48777,
              "moku": [
                {
                  "name": "学校施設営繕費",
                  "v": 185.71584,
                  "prevV": 175.12509
                },
                {
                  "name": "小・中学校整備費",
                  "v": 76.65465,
                  "prevV": 89.40783
                },
                {
                  "name": "学校用地費",
                  "v": 14.39021,
                  "prevV": 14.65464
                },
                {
                  "name": "学校施設整備基金積立金",
                  "v": 5.42124,
                  "prevV": 7.44088
                },
                {
                  "name": "高等学校整備費",
                  "v": 1.33143,
                  "prevV": 7.54506
                },
                {
                  "name": "特別支援教育施設整備費",
                  "v": 1.31427,
                  "prevV": 1.31427
                },
                {
                  "name": "教育施設解体費",
                  "v": 0.16028,
                  "prevV": null
                }
              ]
            },
            {
              "name": "学校保健体育費",
              "v": 216.74139,
              "prevV": 203.55639,
              "moku": [
                {
                  "name": "学校給食物資購入費",
                  "v": 105.89705,
                  "prevV": 99.53279
                },
                {
                  "name": "学校給食費",
                  "v": 96.95059,
                  "prevV": 88.16404
                },
                {
                  "name": "学校保健費",
                  "v": 7.00954,
                  "prevV": 6.80375
                },
                {
                  "name": "学校体育費",
                  "v": 6.88421,
                  "prevV": 9.05581
                }
              ]
            },
            {
              "name": "小学校費",
              "v": 122.37894,
              "prevV": 112.07678,
              "moku": [
                {
                  "name": "学校管理費",
                  "v": 86.1064,
                  "prevV": 73.62337
                },
                {
                  "name": "学校運営費",
                  "v": 36.27254,
                  "prevV": 38.45341
                }
              ]
            },
            {
              "name": "中学校費",
              "v": 57.60278,
              "prevV": 53.08127,
              "moku": [
                {
                  "name": "学校管理費",
                  "v": 33.2708,
                  "prevV": 28.86977
                },
                {
                  "name": "学校運営費",
                  "v": 24.33198,
                  "prevV": 24.2115
                }
              ]
            },
            {
              "name": "生涯学習費",
              "v": 30.92606,
              "prevV": 29.22426,
              "moku": [
                {
                  "name": "図書館費",
                  "v": 16.90275,
                  "prevV": 16.00179
                },
                {
                  "name": "文化財保護費",
                  "v": 10.33363,
                  "prevV": 10.03768
                },
                {
                  "name": "生涯学習推進費",
                  "v": 3.68968,
                  "prevV": 3.18479
                }
              ]
            },
            {
              "name": "特別支援学校費",
              "v": 15.7617,
              "prevV": 13.47474,
              "moku": [
                {
                  "name": "学校管理費",
                  "v": 13.55901,
                  "prevV": 11.28112
                },
                {
                  "name": "学校運営費",
                  "v": 2.20269,
                  "prevV": 2.19362
                }
              ]
            },
            {
              "name": "高等学校費",
              "v": 9.50005,
              "prevV": 8.86232,
              "moku": [
                {
                  "name": "学校管理費",
                  "v": 6.44953,
                  "prevV": 5.84502
                },
                {
                  "name": "学校運営費",
                  "v": 3.05052,
                  "prevV": 3.0173
                }
              ]
            }
          ],
          "公債費": [
            {
              "name": "公債費",
              "v": 1812.56107,
              "prevV": 1815.65663,
              "moku": [
                {
                  "name": "元金",
                  "v": 1565.83258,
                  "prevV": 1545.55181
                },
                {
                  "name": "利子",
                  "v": 234.96347,
                  "prevV": 256.41724
                },
                {
                  "name": "公債諸費",
                  "v": 11.76502,
                  "prevV": 13.68758
                }
              ]
            },
            {
              "name": "第三セクター等改革推進債公債費",
              "v": 75.75678,
              "prevV": 76.03379,
              "moku": [
                {
                  "name": "元金",
                  "v": 73.22196,
                  "prevV": 73.22196
                },
                {
                  "name": "利子",
                  "v": 2.52616,
                  "prevV": 2.80243
                },
                {
                  "name": "公債諸費",
                  "v": 0.00866,
                  "prevV": 0.0094
                }
              ]
            }
          ],
          "諸支出金": [
            {
              "name": "特別会計繰出金",
              "v": 1887.00723,
              "prevV": 1830.20638,
              "moku": [
                {
                  "name": "介護保険事業費会計繰出金",
                  "v": 491.90647,
                  "prevV": 465.33614
                },
                {
                  "name": "下水道事業会計繰出金",
                  "v": 396.48373,
                  "prevV": 387.28906
                },
                {
                  "name": "後期高齢者医療事業費会計繰出金",
                  "v": 372.93821,
                  "prevV": 360.2708
                },
                {
                  "name": "国民健康保険事業費会計繰出金",
                  "v": 274.87714,
                  "prevV": 279.70647
                },
                {
                  "name": "高速鉄道事業会計繰出金",
                  "v": 75.06018,
                  "prevV": 79.19962
                },
                {
                  "name": "病院事業会計繰出金",
                  "v": 74.40953,
                  "prevV": 74.89743
                },
                {
                  "name": "自動車事業会計繰出金",
                  "v": 66.87256,
                  "prevV": 63.87993
                },
                {
                  "name": "市街地開発事業費会計繰出金",
                  "v": 43.97862,
                  "prevV": 36.24963
                },
                {
                  "name": "みどり保全創造事業費会計繰出金",
                  "v": 33.85648,
                  "prevV": 32.67929
                },
                {
                  "name": "中央と畜場費会計繰出金",
                  "v": 25.19029,
                  "prevV": 22.54134
                },
                {
                  "name": "水道事業会計繰出金",
                  "v": 20.17045,
                  "prevV": 16.34095
                },
                {
                  "name": "公共事業用地費会計繰出金",
                  "v": 4.78362,
                  "prevV": 4.29317
                },
                {
                  "name": "自動車駐車場事業費会計繰出金",
                  "v": 3.88114,
                  "prevV": 3.62511
                },
                {
                  "name": "港湾整備事業費会計繰出金",
                  "v": 0.87255,
                  "prevV": 1.00255
                },
                {
                  "name": "中央卸売市場費会計繰出金",
                  "v": 0.673,
                  "prevV": 1.478
                },
                {
                  "name": "埋立事業会計繰出金",
                  "v": 0.4651,
                  "prevV": 0.76854
                },
                {
                  "name": "母子父子寡婦福祉資金会計繰出金",
                  "v": 0.30762,
                  "prevV": 0.37029
                },
                {
                  "name": "勤労者福祉共済事業費会計繰出金",
                  "v": 0.15296,
                  "prevV": 0.14425
                },
                {
                  "name": "公害被害者救済事業費会計繰出金",
                  "v": 0.11306,
                  "prevV": 0.11629
                },
                {
                  "name": "工業用水道事業会計繰出金",
                  "v": 0.01452,
                  "prevV": 0.01752
                }
              ]
            }
          ],
          "予備費": [
            {
              "name": "予備費",
              "v": 10,
              "prevV": 10,
              "moku": [
                {
                  "name": "予備費",
                  "v": 10,
                  "prevV": 10
                }
              ]
            }
          ]
        }
      },
      "sourceTitle": "令和3年度 横浜市予算に関する説明書（一般会計・款項目＋前年度）",
      "localUrl": "/sources/yokohama-setsumeisho-r3/r3ippan.zip",
      "refLabel": "r3ippan.zip",
      "originUrl": "https://www.city.yokohama.lg.jp/city-info/zaisei/jokyo/yosan/r3/r3.files/r3ippan.zip",
      "archiveUrl": "https://web.archive.org/web/20251126044931/https://www.city.yokohama.lg.jp/city-info/zaisei/jokyo/yosan/r3/r3.files/r3ippan.zip"
    }
  ]
};
