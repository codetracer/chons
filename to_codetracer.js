#!/node
var fs = require('fs');
var path = require('path');
var current_path = fs.realpathSync('.'); //获取当前路径 

function replaceStr(file){
    let extname = path.extname(file);
    let filename = path.basename(file);
    if (extname !== '.jpg' && extname !== '.png' && extname !== '.gif' && filename !== 'to_blackmatrix7.js' && filename !== 'to_codetracer.js'){
        fs.readFile(file, {encoding:'utf-8'}, function(err, data){
            data = data.replace(/https?:\/\/raw\.githubusercontent\.com\/blackmatrix7\/2019-nCov-autoreport\/master/g, 'https://raw.githubusercontent.com/codetracer/chons/master');
            data = data.replace(/https?:\/\/github\.com\/blackmatrix7\/2019-nCov-autoreport\/tree\/master\//g, 'https://github.com/codetracer/chons/tree/master/');
            data = data.replace(/https?:\/\/github\.com\/blackmatrix7\/2019-nCov-autoreport\/blob\/master\//g, 'https://github.com/codetracer/chons/blob/master/');
            data = data.replace(/blackmatrix7/g, 'codetracer');
            data = data.replace(/2019-nCov-autoreport/g, 'chons');
            fs.writeFile(file, data, function(err){
                if(err){
                    console.log(file + ' error!');
                }else{
                    console.log(file + ' ok!');
                }
            });
        })
    }
}

//获取当前文件夹内所有指定格式的文件的绝对路径并缓存起来
function walk(path){  
    var dirList = fs.readdirSync(path);
    dirList.forEach(function(item){
        if (item.indexOf('.') != 0){
            if(fs.statSync(path + '/' + item).isDirectory()){
                walk(path + '/' + item);
            }
            else{
                replaceStr(path + '/' + item)
            }
        }
    });
}

walk(current_path);
