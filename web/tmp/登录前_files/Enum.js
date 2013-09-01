/// <reference path="~/JS/NoUse/JScript.js" />

TKCPCEO.Enum = function () {
    ///<summary>
    ///枚举
    ///</summary>
}
TKCPCEO.Enum.prototype = {
    Lottery: {
        Lottery: {
            LotteryType: {
                All_Account: -1,
                FCSSQ: 0,
                FC3D: 1,
                FCQLC: 2,
                FC20C5: 3,
                FCCQSSC: 4,
                FCJXSSC: 5,
                FCSHSSL: 6,
                TCPL3: 7,
                TCPL5: 8,
                TCQXC: 9,
                TC22C5: 10,
                TC29C7: 11,
                TCDLT: 12,
                TCSFC: 13,
                TC6CBQC: 14,
                TC4CJQ: 15,
                TC11C5: 16,
                FCXJSSC: 17,
                TCKL123: 18,
                TCHNWin481: 19,
                FCHaoCai1: 20,
                FCHLJSSC: 21,
                FCGDKL10: 22,
                TCDLC: 23,
                TCGD11: 24,
                FCSDQYH: 25,
                TCJLC22C5: 26,
                FCTJSSC: 27,
                FCHNSSC: 28,
                FCYNSSC: 29,
                FCFJSSC: 30,
                FCNMGSSC: 31,
                FCAHSSC: 32,
                FCCQKL10: 33,
                FCGXKL10: 34,
                FCBJKL8: 35,
                TCCQ11: 36,
                FCSHSSC: 37
            },
            KindFilter: {
                Matrix: 0,
                GraphChart: 1
            },
            ProjectType: {
                BetSelf: 0,
                BetUnion: 1,
                BetRobot: 2
            }
        },
        Lotto: {
            FCSSQ: new Object()
            ///JS/Lottery/Lotto/FCSSQ/Enum.js
        },
        Speed: {
            FCCQSSC: new Object()
            ///JS/Lottery/Speed/FCCQSSC/Enum.js
        }
    },
    UserInfo: {
        FavouriteType: {
            FCSSQ_FilterCase: 0,
            FCSSQ_TrendCase: 1,
            FCCQSSC_TrendCase: 2
        }
    }
    //    getChn: function(_enum, _value) {
    //        ///<summary>根据枚举获取中文</summary>
    //        ///<param name="_enum">最底层枚举对象</param>
    //        ///<param name="_value">枚举值</param>
    //    }
}