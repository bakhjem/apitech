var express = require("express");
var router = express.Router();
const request = require("request-promise");
const cheerio = require("cheerio");
var cookieParser = require("cookie-parser");

/* GET users listing. */
router.get("/", function (req, res, next) {
  var novel = [];
  var page = req.query.page;
  const URL =
    "https://www.techz.vn/C/tin-tuc-cong-nghe/page/";

  const getPageContent = uri => {
    const options = {
      uri,
      headers: {
        "User-Agent": "Request-Promise"
      },
      transform: body => {
        return cheerio.load(body);
      }
    };

    return request(options);
  };
  var data = [];
  var title = null;
  var image = null;
  var idnew = null;
  var description = null;
  var cover = null;
  var lastupdates = [];
  var update_time = null;
  var id = null;
  var view = null;
  var totalpages = null;
  var des = null;
  getPageContent(URL + page).then($ => {
    console.log(URL + page)
    // console.log(
    //   "http://www.nettruyen.com/tim-truyen?status=-1&sort=15&page=" + page
    // );
    // var pagett = $(".pagination-outter ul li.hidden").text();
    // totalpage = pagett.slice(pagett.search("/") + 2);
    $("article").each(function (result) {
      // console.log($(this).html())
      $(this)
        .find(".post-title a")
        .each(function () {
          title = $(this).text();
          idnew = $(this).attr('href');
          // idnovel = idnovel.slice(1)
          idnew = idnew.slice(idnew.search("techz.vn/") + 9);
          // console.log(idnew);
        });
        $(this)
        .find(".post-thumbnail img")
        .each(function () {
          image = $(this).attr('src');
          
          // console.log(image);
        });
        $(this)
        .find(".post-sapo")
        .each(function () {
          description = $(this).text();
          description = description.replace(/\(Techz.vn\)/g, "")
          // console.log(description);
        });
      

      data.push({
        'title': title,
        'image': image,
        'idnew': idnew,
        'description': description,
      })
    });
    // var totalpage = $('.phan-trang a:last-child').attr('href');
    // if (totalpage === undefined) {
    //   var novels = {
    //     url: URL + page,
    //     page: page,
    //     data: data,
    //     totalpage: 1
    //   };

    //   return res.send(JSON.stringify(novels));
    // }
    // console.log(totalpage)
    // totalpages = totalpage.slice(totalpage.search('page=') + 5);
    // console.log(totalpages);
    var news = {
      url: URL + page,
      page: page,
      data: data
    };

    res.send(JSON.stringify(news));
  });
});

module.exports = router;
