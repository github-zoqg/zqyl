export default {
    test: (data) => {
        return data + " test"
    },
    // 金额千分位格式化
    format_money: (data, num) => {
        // console.log(data, num)
        if (typeof data == "number") {
            data = data.toFixed(num ? num : 2);                                                                 //固定小数位数  

            let a = data.split(".");                                                                            //从小数点处分为两个数组
            let z = a[0];
            let _length = z.length % 3 == 0 ? parseInt(z.length / 3) : parseInt(z.length / 3) + 1               //余数不为零，计算次数加1
            let zh = [];
            for (var i = 0; i < _length; i++) {                                                                 //三位数切割push到数组中（从后开始切割）
                zh.push(z.substring(z.length - (3 * (i + 1)), z.length - (3 * i)));
                // console.log(z.length - (3 * (i + 1)), z.length - (3 * i), z.substring(z.length - (3 * (i + 1)), z.length - (3 * i)))
            }
            return zh.reverse().toString() + "." + a[1]
        } else {
            return data + " 不是number类型"
        }

    },

    // 金额数字化
    format_money_number: data => {

        return Number(data.replace(/,/g, ""))

    },

    // 时间格式化
    format_date: (item, data) => {
        let now = new Date(item);

        let Y = now.getFullYear();
        let M = now.getMonth() + 1 > 10 ? now.getMonth() + 1 : "0" + now.getMonth() + 1;
        let D = now.getDate() > 10 ? now.getDate() : "0" + now.getDate();

        let hh = now.getHours() > 10 ? now.getHours() : "0" + now.getHours();
        let mm = now.getMinutes() > 10 ? now.getMinutes() : "0" + now.getMinutes();
        let ss = now.getSeconds() > 10 ? now.getSeconds() : "0" + now.getSeconds();

        if (data) {
            switch (data) {
                case "hm": return Y + "年" + M + "月" + D + "日" + " " + hh + ":" + mm; break;
                case "hms": return Y + "年" + M + "月" + D + "日" + " " + hh + ":" + mm + ":" + ss; break;
            }
        } else {
            return Y + "年" + M + "月" + D + "日";
        }

    }
}