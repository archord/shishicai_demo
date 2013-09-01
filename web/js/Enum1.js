/// <reference path="~/JS/NoUse/JScript.js" />

TKCPCEO.Enum.prototype.Lottery.Speed.FCCQSSC = {
    PlayType: {
        s5DanShi: 3015,
        s5FuXuan: 3025,
        s5ZuHe: 3035,
        s5TongXuan: 312,

        s3DanShi: 3013,
        s3FuXuan: 3023,
        s3ZuHe: 3033,
        s3HeZhi: 304,
        s3Zu3DanShi: 313,
        s3Zu3FuShi: 315,
        s3Zu6DanShi: 314,
        s3Zu6FuShi: 316,
        s3ZuXuanBaoDan: 317,
        s3ZuXuanBaoDian: 318,
        s3ZhiXuanZuHeFuShi: 319,

        s2DanShi: 3012,
        s2FuXuan: 3022,
        s2ZuHe: 3032,
        s2HeZhi: 305,
        s2ZuXuanDanShi: 307,
        s2ZuXuanFuShi: 308,
        s2ZuXuanFenZu: 309,
        s2ZuXuanHeZhi: 310,
        s2ZuXuanBaoDan: 311,

        s1DanShi: 3011,

        sDXDS: 306
    },
    BetMethod: {
        Standard: 0,
        Trend: 3,
        File: 2,
        Sum: 8
    }
}

TKCPCEO.Enum.prototype.getAnteText = function(_playType, _anteCode) {
    var IR = _anteCode;
//    alert(_playType + "\n" + TKCPCEO.Enum.prototype.Lottery.Speed.FCCQSSC.PlayType.sDXDS + "\n" + IR);
    switch (parseInt(_playType, 10)) {
        case TKCPCEO.Enum.prototype.Lottery.Speed.FCCQSSC.PlayType.sDXDS:
            IR = IR.replace(/2/g, "大").replace(/1/g, "小").replace(/5/g, "单").replace(/4/g, "双");
            break;
    }
    return IR;
}

TKCPCEO.Enum.prototype.getChn = function(_playType, _anteCode) {
    var retPlayType = "未知玩法";
    switch (_playType) {
        case 301:
        case 302:
        case 303:
            var blankCount = 0;
            var aryAnteCode = _anteCode.split(",");
            for (var i = 0; i < aryAnteCode.length; i++) {
                if (aryAnteCode[i].toString().trim() == "_") {
                    blankCount++;
                }
            }
            _playType = _playType.toString() + (5 - blankCount).toString();
            break;
    }
    switch (parseInt(_playType, 10)) {
        case 3015:
            retPlayType = "五星单式";
            break;
        case 3013:
            retPlayType = "三星单式";
            break;
        case 3012:
            retPlayType = "二星单式";
            break;
        case 3011:
            retPlayType = "一星单式";
            break;
        case 3025:
            retPlayType = "五星复选";
            break;
        case 3023:
            retPlayType = "三星复选";
            break;
        case 3022:
            retPlayType = "二星复选";
            break;
        case 3035:
            retPlayType = "五星组合";
            break;
        case 3033:
            retPlayType = "三星组合";
            break;
        case 3032:
            retPlayType = "二星组合";
            break;
        case 304:
            retPlayType = "三星和值";
            break;
        case 305:
            retPlayType = "二星和值";
            break;
        case 306:
            retPlayType = "大小单双";
            break;
        case 307:
            retPlayType = "二星组选单式";
            break;
        case 308:
            retPlayType = "二星组选复式";
            break;
        case 309:
            retPlayType = "二星组选分组";
            break;
        case 310:
            retPlayType = "二星组选包点"; ///二星组选和值
            break;
        case 311:
            retPlayType = "二星组选包胆";
            break;
        case 312:
            retPlayType = "五星通选";
            break;
        case 313:
            retPlayType = "组三单式";
            break;
        case 314:
            retPlayType = "组六单式";
            break;
        case 315:
            retPlayType = "组三复式";
            break;
        case 316:
            retPlayType = "组六复式";
            break;
        case 317:
            retPlayType = "三星组选包胆";
            break;
        case 318:
            retPlayType = "三星组选包点";
            break;
        case 319:
            retPlayType = "三星直选组合";
            break;
        default:
            retPlayType = "未知玩法";
            break;
    }
    return retPlayType;
}