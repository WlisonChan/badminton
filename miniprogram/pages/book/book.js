// pages/book/book.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showCalendar:false,
    currentDate:'2021-05-09',
    curShow:{
      show:true
    },
    list:[
      
      {
        pagePath:"/pages/book/book",
        text:"场地预定",
        iconPath:"/images/icon/book.png",
        selectedIconPath:"/images/icon/book_selected.png"
      },
      {
          pagePath:"/pages/index/index",
          text:"个人预定",
          iconPath:"/images/icon/personal.png",
          selectedIconPath:"/images/icon/personal_selected.png"
      }
    ],
    dataSite:[
      {
        name:'1号场地',
        show:true,
        book:[
          {
            time:'8:30~9:00 PM',
            isBook:false
          },
          {
            time:'9:00~9:30 PM',
            isBook:false
          },
          {
            time:'9:30~10:00 PM',
            isBook:true
          },
          {
            time:'10:00~10:30 PM',
            isBook:true
          }
        ]
      },
      {
        name:'2号场地',
        show:false,
        book:[
          {
            time:'8:30~9:00 PM',
            isBook:true
          },
          {
            time:'9:00~9:30 PM',
            isBook:false
          },
          {
            time:'9:30~10:00 PM',
            isBook:true
          },
          {
            time:'10:00~10:30 PM',
            isBook:false
          }
        ]
      }
    ]
  },
  onLoad: function (options) {
    this.formatDate(new Date())
  },
  linselect(e){
    console.log(e.detail)
    this.formatDate(e.detail)
    this.setData({
      showCalendar:!this.data.showCalendar
    })
  },
  select(e){
    let index = e.currentTarget.dataset.index
    console.log(this.data.dataSite[index].show)

    this.setData({
      [`dataSite[`+index+`].show`]: !this.data.dataSite[index].show
    })
  },
  selectDate(){
    this.setData({
      showCalendar:!this.data.showCalendar
    })
  }
  ,
  formatDate(date){
    let year = date.getYear()+1900
    let month = date.getMonth() +1
    if(month<10){
      month = '0'+month
    }
    let day = date.getDate()
    if(day<10){
      day = '0'+day
    }
    this.setData({
      currentDate:year+'-'+month+'-'+day
    })
  }
})