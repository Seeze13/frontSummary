const util = require('util');

function print(res){
    console.log(util.inspect(res, {showHidden: false, depth: null}));
}

let input = [
    {
        id: 1, val: '学校', parentId: null
    }, {
        id: 2, val: '班级1', parentId: 1
    }, {
        id: 3, val: '班级2', parentId: 1
    }, {
        id: 4, val: '学生1', parentId: 2
    }, {
        id: 5, val: '学生2', parentId: 2
    }, {
        id: 6, val: '学生3', parentId: 3
    },
]

let output = {
    id: 1,
    val: '学校',
    children: [{
        id: 2,
        val: '班级1',
        children: [
            {
                id: 4,
                val: '学生1',
                children: []
            },
            {
                id: 5,
                val: '学生2',
                children: []
            }
        ]
    }, {
        id: 3,
        val: '班级2',
        children: [{
            id: 6,
            val: '学生3',
            children: []
        }]
    }]
}

function arrayToTree(array){
    const map = {};
    const roots = [];
    
    for(let i = 0; i < array.length; i++){
        const item = array[i];
        map[item.id] = {...item, children:[]};
    }

    for(let i = 0; i < array.length; i++){
        const node = map[array[i].id];
        if(node.parentId){
            map[node.parentId].children.push(node);
        }else{
            roots.push(node);
        }
    }

    return roots[0];
}

function arrayToTree2(array){
    // 这一步就是拿到树的根节点，需要根据不同输入情况而定
    let root = array[0];
    // 定义树结构，剩下的交给toTree函数去递归
    let tree = {
        id: root.id,
        val: root.val,
        children: array.length > 0 ? toTree(root.id, array) : [],
    }
    return tree;
}

// 递归函数:负责递归生成子节点
function toTree(parentId, array){
    let children = [];
    let len = array.length;
    // 每一遍递归都会扫一遍数组
    for(let i = 0; i < len; i++){
        let node = array[i];
        // 如果是当前节点的子节点，就装进去
        if(node.parentId === parentId){
            children.push({
                id: node.id,
                val: node.val,
                children: toTree(node.id, array),
            })
        }
    }
    return children;
}

const res = arrayToTree2(input);

print([1,2,3,4].reverse());