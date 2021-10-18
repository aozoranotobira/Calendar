const week = ["日", "月", "火", "水", "木", "金", "土"];
const today = new Date();
// 月末だとずれる可能性があるため、1日固定で取得
var showDate = new Date(today.getFullYear(), today.getMonth(), 1);

function setup() {
  createCanvas(400, 400);

  let prev = createButton("＜");
  prev.position(90, 30);
  prev.mousePressed(() => { showDate.setMonth(showDate.getMonth() - 1); });
  setButtonStyle(prev, "1px 7px 1px 3px");

  let next = createButton("＞");
  next.position(300, 30);
  next.mousePressed(() => { showDate.setMonth(showDate.getMonth() + 1); });
  setButtonStyle(next, "1px 3px 1px 7px");
}

function setButtonStyle(button, padding) {
  button.style("cursor", "pointer");
  button.style("font-size", "16px");
  button.style("font-weight", "bold");
  button.style("padding", padding);
  button.style("color", "#ffffff");
  button.style("background", "#D20000");
  button.style("border", "none");
  button.style("border-radius", "13px");
}

function draw() {
  background(0);
  noStroke();
  textSize(20);
  textAlign(CENTER, CENTER);

  // 背景
  fill(210, 0, 0);
  ellipse(200, 60, 360, 200);
  fill(0, 0, 0);
  ellipse(200, 0, 300, 200);
  fill(210, 0, 0);
  rect(0, 60, 400, 340, 20, 20, 20, 20);
  fill(0, 0, 0);
  rect(10, 70, 380, 320, 20, 20, 20, 20);

  // 年月
  const year = showDate.getFullYear();
  const month = showDate.getMonth();
  fill(255, 255, 255);
  text(`${year}年${month + 1}月`, 200, 35);

  // 曜日
  for (let j = 0; j < week.length; j++) {
    if (j == 0 || j == 6) {
      fill(210, 0, 0);
    } else {
      fill(255, 255, 255);
    }
    text(week[j], j * 55 + 35, 95);
  }

  // 日付
  let count = 0;
  const startDayOfWeek = new Date(year, month, 1).getDay();
  const endDate = new Date(year, month + 1, 0).getDate();
  const lastMonthEndDate = new Date(year, month, 0).getDate();
  const row = 6; //var row = Math.ceil((startDayOfWeek + endDate) / week.length);
  // 1行ずつ設定
  for (let i = 0; i < row; i++) {
    // 1colum単位で設定
    for (let j = 0; j < week.length; j++) {
      textSize(20);
      if (i == 0 && j < startDayOfWeek) {
        // 1行目で1日まで先月の日付を設定
        fill(127, 127, 127);
        text(lastMonthEndDate - startDayOfWeek + j + 1, j * 55 + 35, i * 45 + 140);
      } else if (count >= endDate) {
        // 最終行で最終日以降、翌月の日付を設定
        count++;
        fill(127, 127, 127);
        text(count - endDate, j * 55 + 35, i * 45 + 140);
      } else {
        // 当月の日付を曜日に照らし合わせて設定
        count++;
        var date = new Date(year, month, count);
        var holiday = JapaneseHolidays.isHoliday(date);
        var qreki = new kyureki(date.getJD());
        // 今日は赤枠で表示
        if (year == today.getFullYear() && month == today.getMonth() && count == today.getDate()) {
          fill(210, 0, 0, 127);
          rect(j * 55 + 5, i * 45 + 130, 60, 40);
        }
        // 土日祝日は赤字で表示
        if (j == 0 || j == 6 || holiday) {
          fill(255, 0, 0);
        } else {
          fill(255, 255, 255);
        }
        text(count, j * 55 + 35, i * 45 + 140);
        // 六曜・祝日を表示
        textSize(10);
        fill(255, 255, 255);
        text(qreki.rokuyo, j * 55 + 35, i * 45 + 155);
        if (holiday) {
          text(holiday, j * 55 + 35, i * 45 + 165);
        }
      }
    }
  }
}
