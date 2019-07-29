var express = require("express");
var router = express.Router();
const request = require("request-promise");
const cheerio = require("cheerio");
var cookieParser = require("cookie-parser");

/* GET users listing. */
router.get("/", function (req, res, next) {
  var novel = [];
  var idnovels = req.query.id;
  const URL = "https://www.techz.vn/";

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
  var titlename = null;
  var description = null;
  var genresdata = [];
  var chapterlist = [];
  var dateupdate = null;
  var view = null;
  var othername = null;
  var lasterchapter = null;
  var idnovel = null;
  var idchapter = null;
  var cover = null;
  var des = null;
  var lastupdates = [];
  var content = null;
  var id = null;
  var totalpages = null;
  getPageContent(URL + idnovels).then($ => {
    titlename = $(".h1").text();
    description = $(".post-sapo").text();
    description = description.replace(/\(Techz.vn\)/g, "")
    // console.log(description)
    // cover = $('.info_image img').attr('src');
    // // cover = 'https://webnovel.online'+cover;
    // // othername = $(".truyen_info_right li:nth-child(1) span").text();
    // content = $(".block_ads_connect").html();
   
    // console.log(content)
    var content = ''
    $("#abdf p").each(function (result) {
      var tx = '';
      tx = $(this).html();
      content = content.concat(`${tx} <br/>`)
    });
    // status = $(".truyen_info_right li:nth-child(4) a").text();
    // view = $(".truyen_info_right li:nth-child(7)").text();
    // view = view.slice(view.search(': ')+1)
    // // dateupdate = $(".updated").text();
    // description = $("#noidungm").html();
    // des = $("#noidungm").text();
    // // description = description.slice(1,description.search('<hr>'))
    // $(".chapter-list .row").each(function (result) {
    //   $(this)
    //     .find("span a")
    //     .each(function () {
    //       chaptername = $(this).text();
    //       var chapterid = $(this).attr("href");
    //       idchapter = chapterid.slice(
    //         chapterid.search(idnovels + "/") + (idnovels.length + 1)
    //       );
    //       chapterlist.unshift({
    //         chaptername: chaptername,
    //         idchapter: idchapter
    //       })
    //     });

    // });
    novel = {
      titlename: titlename,
      description: description,
      // othername: othername,
      content: content,
      id: idnovels,
    }
    // // console.log(chapterlist);
    res.send(JSON.stringify(novel));
  });
});

module.exports = router;
