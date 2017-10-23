//定义棋盘数组
var board=[];
// 初始化棋盘为二维数组，0为未放置，-1为本方，1为AI
function initBoard(){
	board=[
[0,0,0],
[0,0,0],
[0,0,0]
]
}
// 落子后更新棋盘
function newBoard(arr){
	board[arr[0]][arr[1]]=-1;
}
function getBoard(){
	return board;
}
// 是否游戏结束
var gameEnd=false;
// 前台传入位置参数
function gameClick(position){
	// 防止重复添加
	if(document.getElementById(position).getAttribute("class")!='col-xs-4 active'){
	$("#"+position).append('<span class="text-center">O</span>');
    $("#"+position).addClass("active");
    // 更新位置
    newBoard(changeBoard(position));
    // 判断是否有胜利方
    gameJudge();
    //如果有胜利方则停止当前动作
    containerBox();
    // 电脑落子开始
    computer(getBoard(),changeBoard(position));
    // 判断是否有胜利方
    gameJudge();
    //如果有胜利方则停止当前动作
    containerBox();
    }
}
// 数组形式返回落子位置
function changeBoard(pos){
	var posArr=pos.split(/[a-z]+/);
	posArr.shift();
	return posArr;
}
// 胜负判断
function gameJudge(){
	// 三行三列两对角线是否存在全为0或全为1
	var human=false;
	var computer=false;
	if(board[0][0]+board[0][1]+board[0][2]==-3||
		board[1][0]+board[1][1]+board[1][2]==-3||
		board[2][0]+board[2][1]+board[2][2]==-3||
		board[0][0]+board[1][1]+board[2][2]==-3||
		board[0][2]+board[1][1]+board[2][0]==-3||
		board[0][0]+board[1][0]+board[2][0]==-3||
		board[0][1]+board[1][1]+board[2][1]==-3||
		board[0][2]+board[1][2]+board[2][2]==-3){
		human=true;
		$("#gameResult").html("玩家胜利！");
		gameEnd=true;
		return;
		}
	else if(board[0][0]+board[0][1]+board[0][2]==3||
		board[1][0]+board[1][1]+board[1][2]==3||
		board[2][0]+board[2][1]+board[2][2]==3||
		board[0][0]+board[1][1]+board[2][2]==3||
		board[0][2]+board[1][1]+board[2][0]==3||
		board[0][0]+board[1][0]+board[2][0]==3||
		board[0][1]+board[1][1]+board[2][1]==3||
		board[0][2]+board[1][2]+board[2][2]==3){
		computer=true;
		$("#gameResult").html("电脑胜利！");
		gameEnd=true;
		return;
		}
	else if(board[0][0]+board[0][1]+board[0][2]+
		board[1][0]+board[1][1]+board[1][2]+
		board[2][0]+board[2][1]+board[2][2]==-1&&$.inArray(0, board[0])==-1&&$.inArray(0, board[1])==-1&&$.inArray(0, board[2])==-1  ){
		$("#gameResult").html("平局！");
	    gameEnd=true;
	    return;
		}
}
// 下面开始电脑落子算法
function computer(boardNow,positionNew){
	// 传入目前棋盘与玩家最新落子位置
	// 若在边角上,则必须占据中央否则必输
	if(ifWin()&&gameEnd==false)win();
	else if(boolJudge()&&!ifWin()&&gameEnd==false)block();
	else if(!boolJudge()&&!ifWin()&&gameEnd==false){
	if(positionNew[0]==0&&positionNew[1]==0||
		positionNew[0]==0&&positionNew[1]==2||
		positionNew[0]==2&&positionNew[1]==2||
		positionNew[0]==2&&positionNew[1]==0||
		positionNew[0]==0&&positionNew[1]==1||
		positionNew[0]==1&&positionNew[1]==2||
		positionNew[0]==2&&positionNew[1]==1||
		positionNew[0]==1&&positionNew[1]==0){
		if(boardNow[1][1]==0){
			board[1][1]=1;
			$("#x1y1").append('<span class="text-center">X</span>');
            $("#x1y1").addClass("active");
		}
		else if(boardNow[2][2]==-1&&boardNow[1][1]==-1){
			if(board[0][2]==0){
				board[0][2]=1;
				$("#x0y2").append('<span class="text-center">X</span>');
	            $("#x0y2").addClass("active");
			}
			else if(board[2][0]==0){
				board[2][0]=1;
				$("#x2y0").append('<span class="text-center">X</span>');
	            $("#x2y0").addClass("active");
			}
		}
		else if(boardNow[0][0]==0&&(boardNow[0][2]+boardNow[1][1]+boardNow[2][0]!=-1)){
			board[0][0]=1;
			$("#x0y0").append('<span class="text-center">X</span>');
            $("#x0y0").addClass("active");
		}
		else if(boardNow[0][2]==0&&(boardNow[0][0]+boardNow[1][1]+boardNow[2][2]!=-1)){
			board[0][2]=1;
			$("#x0y2").append('<span class="text-center">X</span>');
            $("#x0y2").addClass("active");
		}
		else if(boardNow[2][0]==0&&(boardNow[0][0]+boardNow[1][1]+boardNow[2][2]!=-1)){
			board[2][0]=1;
			$("#x2y0").append('<span class="text-center">X</span>');
            $("#x2y0").addClass("active");
		}
		else if(boardNow[2][2]==0&&(boardNow[0][2]+boardNow[1][1]+boardNow[2][0]!=-1)){
			board[2][2]=1;
			$("#x2y2").append('<span class="text-center">X</span>');
            $("#x2y2").addClass("active");
		}
		else{
			if(board[0][1]==0){
				board[0][1]=1;
				$("#x0y1").append('<span class="text-center">X</span>');
	            $("#x0y1").addClass("active");
			}
			else if(board[1][0]==0){
				board[1][0]=1;
				$("#x1y0").append('<span class="text-center">X</span>');
	            $("#x1y0").addClass("active");
			}
			else if(board[1][2]==0){
				board[1][2]=1;
				$("#x1y2").append('<span class="text-center">X</span>');
	            $("#x1y2").addClass("active");
			}
			else if(board[2][1]==0){
				board[2][1]=1;
				$("#x2y1").append('<span class="text-center">X</span>');
	            $("#x2y1").addClass("active");
			}
		}
		}
	// 若在中央
	if(positionNew[0]==1&&positionNew[1]==1){
		if(boardNow[0][0]==0){
			board[0][0]=1;
			$("#x0y0").append('<span class="text-center">X</span>');
            $("#x0y0").addClass("active");
		}

	}
	}

}
function ifWin(){
	var ifWin=false;
	// 若能使自己赢，则填充为三连
	if(board[0][0]+board[0][1]+board[0][2]==2||
		board[1][0]+board[1][1]+board[1][2]==2||
		board[2][0]+board[2][1]+board[2][2]==2||
		board[0][0]+board[1][1]+board[2][2]==2||
		board[0][2]+board[1][1]+board[2][0]==2||
		board[0][0]+board[1][0]+board[2][0]==2||
		board[0][1]+board[1][1]+board[2][1]==2||
		board[0][2]+board[1][2]+board[2][2]==2)
		ifWin=true;
	return ifWin;
}
// 若可以先一步胜利
function win(){
		for(var i=0;i<3;i++){
			if(board[i][0]+board[i][1]+board[i][2]==2){
				if(board[i][0]==1&&board[i][1]==1){
					board[i][2]=1;
					$("#x"+i+"y2").append('<span class="text-center">X</span>');
					$("#x"+i+"y2").addClass("active");
				}
				else if(board[i][0]==1&&board[i][2]==1){
					board[i][1]=1;
					$("#x"+i+"y1").append('<span class="text-center">X</span>');
					$("#x"+i+"y1").addClass("active");
					break;
				}
				else{
					board[i][0]=1;
					$("#x"+i+"y0").append('<span class="text-center">X</span>');
					$("#x"+i+"y0").addClass("active");
					break;
				}
			}
			else if(board[0][i]+board[1][i]+board[2][i]==2){
				if(board[0][i]==1&&board[1][i]==1){
					board[2][i]=1;
					$("#x2y"+i).append('<span class="text-center">X</span>');
					$("#x2y"+i).addClass("active");
				}
				else if(board[0][i]==1&&board[2][i]==1){
					board[1][i]=1;
					$("#x1y"+i).append('<span class="text-center">X</span>');
					$("#x1y"+i).addClass("active");
					break;
				}
				else{
					board[0][i]=1;
					$("#x0y"+i).append('<span class="text-center">X</span>');
					$("#x0y"+i).addClass("active");
					break;
				}
			}
			else if(board[0][0]+board[1][1]+board[2][2]==2){
				if(board[0][0]==1&&board[1][1]==1){
					board[2][2]=1;
					$("#x2y2").append('<span class="text-center">X</span>');
					$("#x2y2").addClass("active");
				}
				else if(board[0][0]==1&&board[2][2]==1){
					board[1][1]=1;
					$("#x1y1").append('<span class="text-center">X</span>');
					$("#x1y1").addClass("active");
					break;
				}
				else{
					board[0][0]=1;
					$("#x0y0").append('<span class="text-center">X</span>');
					$("#x0y0").addClass("active");
					break;
				}
			}
			else if(board[0][2]+board[1][1]+board[2][0]==2){
				if(board[0][2]==1&&board[1][1]==1){
					board[2][0]=1;
					$("#x2y0").append('<span class="text-center">X</span>');
					$("#x2y0").addClass("active");
				}
				else if(board[0][2]==1&&board[2][0]==1){
					board[1][1]=1;
					$("#x1y1").append('<span class="text-center">X</span>');
					$("#x1y1").addClass("active");
					break;
				}
				else{
					board[0][2]=1;
					$("#x0y2").append('<span class="text-center">X</span>');
					$("#x0y2").addClass("active");
					break;
				}
			}
		}
		}
// 两子堵余下的空位
function block(){
	for(var i=0;i<3;i++){
			if(board[i][0]+board[i][1]+board[i][2]==-2){
				if(board[i][0]==-1&&board[i][1]==-1){
					board[i][2]=1;
					$("#x"+i+"y2").append('<span class="text-center">X</span>');
		            $("#x"+i+"y2").addClass("active");
		            break;
				}
				else if(board[i][0]==-1&&board[i][2]==-1){
					board[i][1]=1;
					$("#x"+i+"y1").append('<span class="text-center">X</span>');
		            $("#x"+i+"y1").addClass("active");
		            break;
				}
				else{
					board[i][0]=1;
					$("#x"+i+"y0").append('<span class="text-center">X</span>');
		            $("#x"+i+"y0").addClass("active");
		            break;
				}
			}
			if(board[0][i]+board[1][i]+board[2][i]==-2){
			if(board[0][i]==-1&&board[1][i]==-1){
					board[2][i]=1;
					$("#x2y"+i).append('<span class="text-center">X</span>');
		            $("#x2y"+i).addClass("active");
		            break;
				}
				else if(board[0][i]==-1&&board[2][i]==-1){
					board[1][i]=1;
					$("#x1y"+i).append('<span class="text-center">X</span>');
		            $("#x1y"+i).addClass("active");
		            break;
				}
				else{
					board[0][i]=1;
					$("#x0y"+i).append('<span class="text-center">X</span>');
		            $("#x0y"+i).addClass("active");
		            break;
				}
		}
		if(board[0][0]+board[1][1]+board[2][2]==-2){
			if(board[0][0]==-1&&board[1][1]==-1){
				board[2][2]=1;
				$("#x2y2").append('<span class="text-center">X</span>');
		        $("#x2y2").addClass("active");
		        break;
			}
			else if(board[0][0]==-1&&board[2][2]==-1){
				board[1][1]=1;
				$("#x1y1").append('<span class="text-center">X</span>');
		        $("#x1y1").addClass("active");
		        break;
			}
			else{
				board[0][0]=1;
				$("#x0y0").append('<span class="text-center">X</span>');
		        $("#x0y0").addClass("active");
		        break;
			}
			}
		if(board[0][2]+board[1][1]+board[2][0]==-2){
			if(board[0][2]==-1&&board[1][1]==-1){
				board[2][0]=1;
				$("#x2y0").append('<span class="text-center">X</span>');
		        $("#x2y0").addClass("active");
		        break;
			}
			else if(board[0][2]==-1&&board[2][0]==-1){
				board[1][1]=1;
				$("#x1y1").append('<span class="text-center">X</span>');
		        $("#x1y1").addClass("active");
		        break;
			}
			else{
				board[0][2]=1;
				$("#x0y2").append('<span class="text-center">X</span>');
		        $("#x0y2").addClass("active");
		        break;
			}
			}
		}
}
// 返回布尔值判断是否存在相加为-2的行列斜线
function boolJudge(){
	var boolJd=false;
	for(var i=0;i<3;i++){
			if(board[i][0]+board[i][1]+board[i][2]==-2||
				board[0][i]+board[1][i]+board[2][i]==-2)
				boolJd=true;
		}
	if(board[0][0]+board[1][1]+board[2][2]==-2||
		board[0][2]+board[1][1]+board[2][0]==-2)boolJd=true;
	return boolJd;
}
function containerBox(){
	if(gameEnd==true){
		$("#mainApp").addClass("containerbox");
		$("#gameStart").text("点击开始");
		}
}
$(document).ready(function(){
	$("#gameStart").click(function(){
		gameEnd=false;
		initBoard();
		containerBox();
		$("#mainApp").removeClass("containerbox");
		$("div").removeClass("active");
		$('span').remove();
		$("#gameResult").html("");
		$("#gameStart").text("重新开始");
	})
})