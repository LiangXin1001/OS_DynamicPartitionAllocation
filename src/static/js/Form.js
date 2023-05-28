/**
 * Fisher-Yates（又称Knuth）洗牌法对数组进行随机排序。
 * 这个函数随机挑选一个元素并与当前的元素交换，
 * 然后再进行下一个，直到没有元素可以洗牌。
 *
 * @param {Array} array - The array to be shuffled.
 * @returns {Array} The shuffled array.
 */
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // 当仍剩元素可以洗牌时
    while (0 !== currentIndex) {
        // 选取剩余元素中的一个...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // 并与当前元素交换。
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

let pairs = [];
let destroyList = [];
let projList = [];
/**
 * 页面加载完成后，当myForm表单提交时触发的函数。
 * 当用户输入的项目数 (ProNum) 与上次输入相同，则不进行任何操作。
 * 如果不同，则使用新的项目数来生成作业项目，并将其推入projList和destroyList中。
 * 在所有项目都被创建并分配到两个列表后，将destroyList中的所有项目追加到projList的末尾。
 * 
 * @function
 * @listens submit:myForm
 */
$(document).ready(function () {
    var previousProNum = 0;
    $('#myForm').submit(function (e) {
        e.preventDefault();

        var ProNum = $('#ProjNumber').val();
        
        if (ProNum == previousProNum) {
            return;
        }
        previousProNum = ProNum;
        // 清空projList和 destroyList 数组
        projList = [];
        destroyList = [];
        for (let i = 0; i < ProNum; i++) {
            let jobName = "作业" + (i + 1);
            let jobSize = Math.floor(Math.random() * (200 - 10) + 10);
            pairs.push([new Proj(jobName, jobSize), new Proj(jobName, -jobSize)]);
        }


        while (pairs.length > 0) {
            let randomIndex = Math.floor(Math.random() * pairs.length);
            let pair = pairs.splice(randomIndex, 1)[0];

            projList.push(pair[0]);
            destroyList.push(pair[1]);

            if (destroyList.length > 1 && destroyList.length | 2) {
                let randomIndexdestory = Math.floor(Math.random() * destroyList.length);
                projList.push(destroyList.splice(randomIndexdestory, 1)[0])

            }
        }

        console.log("destroyList")
        console.log(destroyList)
        projList = projList.concat(destroyList);
        console.log(projList)

    });
});


