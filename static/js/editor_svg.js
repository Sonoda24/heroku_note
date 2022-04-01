////
  function svg_list(svgtag,level){
    level=level+1;
    var leng=svgtag.children.length;
console.log('svg_list level= ',level,'child leng= ',svgtag.children.length,svgtag);
    for (var i=0 ;i<leng ;i++){
	tagn=svgtag.children[i];
console.log('**nodename= ',tagn.nodeName);
	if(tagn.children.length) {
		svg_list(tagn,level);
		}
	else {
console.log('Svg text=',tagn.outerHTML);
//		const domParser = new DOMParser();
//    　　	const parsedSVGDoc = domParser.parseFromString(tagn.outerHTML, 'image/svg+xml');
//console.log(parsedSVGDoc);

//		var oDOM = domParser.parseFromString(tagn.outerHTML, "application/xml");
// print the name of the root element or error message
//console.log(oDOM.documentElement.nodeName == "parsererror" ? "error while parsing" : oDOM.documentElement.nodeName);
//console.log(oDOM);
//var oSerializer = new XMLSerializer();
//var sXML = oSerializer.serializeToString(tagn);
//console.log(sXML)
//JavaScript 属性値を取得/設定/削除する(getAttribute)
		attr_char=tagn.getAttribute("d"); 
console.log('**attr= ',attr_char);
		if(attr_char){
			replaced = attr_char.replace(/-/g, ',-');
console.log(replaced);
			var result = replaced.split(/,|M|T|Q|q|S|s|C|c|L|l|Z/);     // '-'を分割文字にするとマイナス符号と見做さないのでまずい
console.log('leng=',result.length,result);
//(x,y)のペアを作りさらに形式を変えて（作図用）保存
			r_val=[];
			for ( var i = 0 ; i < result.length ; i++ ){
				if (result[i]!="") {
					val=Number(result[i]);
					r_val.push(val);
					}
				}
console.log('r_val=',r_val);
			path_p=[];
			result=splitArray(r_val,2);
console.log('Result=',result,'r_val=',r_val);
			for(var k=0; k<result.length;k++){
				path_p.push({x: result[k][0],y: result[k][1]});
				}
console.log('path_p= ',path_p);
//円を描いてみる
			for(var k=0; k<path_p.length;k++){
console.log(path_p[k]);
				first_point=createFirstPoint([path_p[k]]);
	        		Object.assign(first_point.style, defaultPointStyle);
        			container.appendChild(first_point);
				}
			}
		}
	}
    }
////
  resolv_svg.onclick = function() {
    //htmlのSVG
　　const svgtag = document.querySelector('#myCanvas');
	var level=0;
	svg_list(svgtag,level);	
    }
////
  reg_svg.onclick = function() {
console.log('*** Reg_Svg Entered  ***');
	var svg_tags=document.querySelector('#myCanvas');
console.log('**Svg_tag length=',svg_tags.childElementCount);
	svg_tag='';
	for (nn = 0; nn < svg_tags.childElementCount; nn++) {
		svg_tag=svg_tag+svg_tags.children[nn].outerHTML+'|<=>|';
console.log('***list n =',nn,' length = ', svg_tag.length);
		}
	var svg_tag=escapeHtml(escape(svg_tag));
	var tex='新規のSVG登録';
console.log('svg_tag',svg_tag);
        $.ajax({
            url: "/db_serv/reg_svg/",
            data: {
		"description":tex,
		"svg":svg_tag,
		},
            dataType: 'json'
        })
        .done((data) => {
            //結果が帰ってきたら、表示します。
console.log('**Ajax Returned result=',data);
        });
   }
////
function line_seq(Step){
//console.log('switch=',sw_flag);
	if(drawingPoints.length==1){
		first_point=createFirstPoint(drawingPoints)
	        Object.assign(first_point.style, defaultPointStyle);
        	container.appendChild(first_point)
		}
	else {
		if (first_point){
			container.removeChild(first_point);
			first_point=null;
			}
		}
       if (drawingPath) {
       			container.removeChild(drawingPath);
            		}
        	drawingPath = createPath(drawingPoints,0);
        	Object.assign(drawingPath.style, defaultPathStyle);
        	container.appendChild(drawingPath);
//console.log('Path=',drawingPath);
	}

////
function quad_bezier_seq(Step){
console.log('Step=',Step);
	mStep=Step%3;
	if(mStep==1){	
		first_point=createFirstPoint([drawingPoints[drawingPoints.length-1]]);
	        Object.assign(first_point.style, defaultPointStyle);
        	container.appendChild(first_point)
		}
console.log('Bezier',Step,'length=',drawingPoints.length);
	if (mStep==2) {
//console.log(' last line= ',drawingPoints,[drawingPoints[drawingPoints.length-2],drawingPoints[drawingPoints.length-1]]);
		bezier_line=createPath([drawingPoints[drawingPoints.length-2],drawingPoints[drawingPoints.length-1]],0)
	        Object.assign(bezier_line.style, tempoPathStyle);
        	container.appendChild(bezier_line)

		if (first_point){
			container.removeChild(first_point);
			first_point=null;
			}
		}
	if(mStep==0) {
		if (drawingPath) {
       			container.removeChild(drawingPath);
            		}
                drawingPath = createQuadBezier(drawingPoints);
            	Object.assign(drawingPath.style, defaultPathStyle);
            	container.appendChild(drawingPath);

		if (bezier_line){
			container.removeChild(bezier_line);
			bezier_line=null;
console.log('cubic bezier dummy removed length=',drawingPoints.length);
			}
		}
console.log('append bezier');
}
////
function cubic_bezier_seq(Step){
console.log('Step=',Step);
	mStep=Step%4;
	if(mStep==1){	
		first_point=createFirstPoint([drawingPoints[drawingPoints.length-1]]);
	        Object.assign(first_point.style, defaultPointStyle);
        	container.appendChild(first_point)
		}
//console.log('Cubic Bezier',Step,'length=',drawingPoints.length);
	if(mStep==2){
console.log('Cubic Bezier line');
		bezier_line=createPath([drawingPoints[drawingPoints.length-2],drawingPoints[drawingPoints.length-1]],0)
	        Object.assign(bezier_line.style, tempoPathStyle);
       		container.appendChild(bezier_line)

		if (first_point){
			container.removeChild(first_point);
			first_point=null;
			}
		}
	if(mStep==3){
console.log('Cubic Bezier line');
		bezier_line1=createPath([drawingPoints[drawingPoints.length-2],drawingPoints[drawingPoints.length-1]],0)
	        Object.assign(bezier_line1.style, tempoPathStyle);
       		container.appendChild(bezier_line1)
		}
	if(mStep==0) {
		if (drawingPath) {
       			container.removeChild(drawingPath);
            		}
                drawingPath = createCubicBezier(drawingPoints);
            	Object.assign(drawingPath.style, defaultPathStyle);
            	container.appendChild(drawingPath);

		if (bezier_line){
			container.removeChild(bezier_line);
			bezier_line=null;
			}
		if (bezier_line1){
			container.removeChild(bezier_line1);
			bezier_line1=null;
			}
		}
console.log('Cubic Bezier line',drawingPoints);
}

////
    function createPath(points,close) {
        var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        var attribute = '';
        points.forEach((point, index) => {
            if (index === 0) {
                attribute += `M${point.x}, ${point.y}`;
            } else {
                attribute += `L${point.x}, ${point.y}`;
            }
        });
	if(close==true){
		attribute += ` Z`;
		}
        path.setAttributeNS(null, 'd', attribute);
console.log(path)
        return path;
    }
////
    function createQuadBezier(points) {
console.log('quad bezier','length=',points.length);
        var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        var attribute = '';
	var nx=2;
        points.forEach((point, index) => {
	    nx=nx+1;
	    mod3_nx=nx % 3;
console.log('nx=',nx,' mod3=',mod3_nx);
            if (mod3_nx== 0) {
		if(nx<4){
                	attribute += `M${point.x}, ${point.y}`;
            		} 
		else {
			attribute += `T${point.x}, ${point.y}`;
			}
		}
	    else if (mod3_nx==1) {
                attribute += `Q${point.x}, ${point.y}`;
            	}
	    else {
		attribute += ` ${point.x}, ${point.y}`;
		}
        });
        path.setAttributeNS(null, 'd', attribute);
console.log(path)
        return path;
    }
////
    function createCubicBezier(points) {
console.log('cubic bezier','length=',points.length);
        var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        var attribute = '';
	var nx=2;
        points.forEach((point, index) => {
	    nx=nx+1;
	    mod3_nx=nx % 3;
console.log('nx=',nx,' mod3=',mod3_nx);
            if (mod3_nx== 0) {
		if(nx<4){
                	attribute += `M${point.x}, ${point.y}`;
            		} 
		else {
			attribute += ` ${point.x}, ${point.y}`;
			}
		}
	    else if (mod3_nx==1) {
                attribute += `C${point.x}, ${point.y}`;
            	}
	    else {
		attribute += ` ${point.x}, ${point.y}`;
		}
        });
        path.setAttributeNS(null, 'd', attribute);
console.log(path)
        return path;
    }
////
    function createFirstPoint(points) {
	circ1=document.createElementNS('http://www.w3.org/2000/svg','circle');
	circ1.setAttribute('cx',points[0].x);
	circ1.setAttribute('cy',points[0].y);
	circ1.setAttribute('r',4);
//	circ1.setAttribute('fill','red');
//	circ1.setAttribute('stroke','black');
//	svg.appendChild(circ1);
console.log(circ1)
        return circ1;
    }

