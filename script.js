$(function () {
    var playerTrack = $("#player-track");
    var bgArtwork = $('#bg-artwork');
    var bgArtworkUrl;
    var albumName = $('#album-name');
    var trackName = $('#track-name');
    var albumArt = $('#album-art'),
        sArea = $('#s-area'),
        seekBar = $('#seek-bar'),
        trackTime = $('#track-time'),
        insTime = $('#ins-time'),
        sHover = $('#s-hover'),
        playPauseButton = $("#play-pause-button"),
        i = playPauseButton.find('i'),
        tProgress = $('#current-time'),
        tTime = $('#track-length'),
        seekT, seekLoc, seekBarPos, cM, ctMinutes, ctSeconds, curMinutes, curSeconds, durMinutes, durSeconds, playProgress, bTime, nTime = 0,
        buffInterval = null, tFlag = false;

    var playPreviousTrackButton = $('#play-previous'), playNextTrackButton = $('#play-next'), currIndex = -1;

    var songs = [{
        artist: "Dig Didzay",
        name: "Bản tình ca không hoàn thiện",
        url: "Musics/Bantinhcakhonghoanthien.mp3",
        picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
        artist: "V.A",
        name: "[Live Ngẫu Hứng] Lối Nhỏ x Nghe Bài Này Đi Em - Củ Cải",
        url: "Musics/Loinho.mp3",
        picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
        artist: "V.A",
        name: "Khóc Cùng Em (Mr Siro x Gray x Wind) – Lê Thùy Trang Cover",
        url: "Musics/Khoccungem.mp3",
        picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
        artist: "V.A",
        name: "Chẳng Thể Tìm Được Em - PhucXp ft. Freak D",
        url: "Musics/Changthetimduocem.mp3",
        picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
        artist: "V.A",
        name: "Sao em lại tắt máy? - Phạm Nguyên Ngọc ft.Vanh",
        url: "Musics/Saoemlaitatmay.mp3",
        picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
        artist: "V.A",
        name: "3107 - W/n , Duongg, Nâu",
        url: "Musics/3107.mp3",
        picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
        artist: "V.A",
        name: "Nợ Ai Đó Lời Xin Lỗi (Lofi ver.) - Bozitt x Freak D",
        url: "Musics/Noaidoloixinloi.mp3",
        picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
        artist: "V.A",
        name: "Có lẽ em đã khóc rất nhiều. - Thắc Mắc (Lo-fi ver by Hawys)",
        url: "Musics/Coleemdakhocratnhieu.mp3",
        picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
        artist: "V.A",
        name: "LẠ LÙNG / Vũ. (Original)",
        url: "Musics/Lalung.mp3",
        picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
        artist: "V.A",
        name: "ĐÔNG KIẾM EM / Vũ. (Original)",
        url: "Musics/Dongkiemem.mp3",
        picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
        artist: "V.A",
        name: "Hôm Nay Em Cưới Rồi (Lofi Ver.) - Khải Đăng x Freak D",
        url: "Musics/Homnayemcuoiroi.mp3",
        picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
        artist: "V.A",
        name: "Đánh Mất Em (Lofi Ver.) - Quang Đăng Trần x Freak D",
        url: "Musics/Danhmatem.mp3",
        picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
        artist: "V.A",
        name: "DỪNG THƯƠNG | DATKAA",
        url: "Musics/Dungthuong.mp3",
        picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
        artist: "V.A",
        name: "Anh Mệt Rồi (Lofi Ver.) - Anh Quân Idol x Freak D",
        url: "Musics/Anhmetroi.mp3",
        picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
        artist: "V.A",
        name: "Ngày bên em - Wuyn",
        url: "Musics/Ngaybenem.mp3",
        picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
        artist: "V.A",
        name: "Đi đâu chẳng thấy - Summer Vee [Lyric]♫",
        url: "Musics/Didauchangthay.mp3",
        picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
        artist: "V.A",
        name: "Có anh ở đây rồi - Anh Quân Idol",
        url: "Musics/Coanhodayroi.mp3",
        picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
        artist: "V.A",
        name: "HỌ YÊU AI MẤT RỒI - Doãn Hiếu | Cover: Chương Chu",
        url: "Musics/Hoyeuaimatroi.mp3",
        picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
        artist: "V.A",
        name: "Khó Vẽ Nụ Cười - Cover",
        url: "Musics/Khovenucuoi.mp3",
        picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
        
        artist: "V.A",
        name: "Lyrics || Nếu Em Đi (Cover)",
        url: "Musics/Neuemdi.mp3",
        picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
        
        artist: "V.A",
        name: "Quên Em Trong Từng Cơn Đau ► Balin",
        url: "Musics/Quenemtrongtungcondau.mp3",
        picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
        
        artist: "V.A",
        name: "Ngày Đôi Ta Biệt Ly Giọt Buồn Chia Đôi Đường Đi",
        url: "Musics/Ngaydoitabietlygiotbuonchiadoiduongdi.mp3",
        picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
        
        artist: "V.A",
        name: "Chiều Thu Họa Bóng Nàng ( Lofi Ver. ) - DatKaa x Dino",
        url: "Musics/Chieuthuhoabongnang.mp3",
        picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
        
        artist: "V.A",
        name: "Chẳng Ai Yêu Mãi Một Người (Freak D Lofi Ver.)",
        url: "Musics/Changaiyeumaimotnguoidauem.mp3",
        picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
        
        artist: "V.A",
        name: "Cao Ốc 20 | B Ray x DatG ( Masew Mix )",
        url: "Musics/Caooc20.mp3",
        picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
        
        artist: "V.A",
        name: "Hạ Còn Vương Nắng - Lofi Ver DATKAA - KIDO Snow chill",
        url: "Musics/Haconvuongnang.mp3",
        picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
        
        artist: "V.A",
        name: "Kiếp Duyên Không Thành Lofi Ver DIMZ",
        url: "Musics/Kiepduyenkhongthanh.mp3",
        picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
        
        artist: "V.A",
        name: "Phận Duyên Lỡ Làng Lofi Ver by KProx Phát Huy T4 x Truzg x KProx",
        url: "Musics/Phanduyenlolang.mp3",
        picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
        
        artist: "V.A",
        name: "Phố Đã Lên Đèn Lofi Ver  Huyền Tâm Môn x Freak D",
        url: "Musics/Phodalenden.mp3",
        picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
        
        artist: "V.A",
        name: "Thê Lương Lofi Ver  Phúc Chinh  Dino",
        url: "Musics/Theluong.mp3",
        picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
        
        artist: "V.A",
        name: "Tình Yêu Màu Hồng Lofi Ver  Hồ Văn Quý x Xám x Freak D",
        url: "Musics/Tinhyeumauhong.mp3",
        picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
        
        artist: "V.A",
        name: "Đường Tôi Chở Em Về Lofi Ver  buitruonglinh x Freak D",
        url: "Musics/Duongtoichoemve.mp3",
        picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
        
        artist: "V.A",
        name: "Lỡ say bye là bye - lofi ver",
        url: "Musics/Losaybyelabye.mp3",
        picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
        
        artist: "V.A",
        name: "Anh Có Muốn Đưa Em Về Không Lofi Ver  Ngô Lan Hương x Freak D",
        url: "Musics/Anhcomuonduaemvekhong.mp3",
        picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
        
        artist: "V.A",
        name: "Khi Em Lớn Lofi Ver  Orange x Hoàng Dũng x Freak D",
        url: "Musics/Khiemlon.mp3",
        picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    }
    ];

    function shuffle(a) {
        var j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        return a;
    }
    songs = shuffle(songs);

    function playPause() {
        setTimeout(function () {
            if (audio.paused) {
                playerTrack.addClass('active');
                albumArt.addClass('active');
                checkBuffering();
                i.attr('class', 'fas fa-pause');
                audio.play();
            }
            else {
                playerTrack.removeClass('active');
                albumArt.removeClass('active');
                clearInterval(buffInterval);
                albumArt.removeClass('buffering');
                i.attr('class', 'fas fa-play');
                audio.pause();
            }
        }, 300);
    }


    function showHover(event) {
        seekBarPos = sArea.offset();
        seekT = event.clientX - seekBarPos.left;
        seekLoc = audio.duration * (seekT / sArea.outerWidth());

        sHover.width(seekT);

        cM = seekLoc / 60;

        ctMinutes = Math.floor(cM);
        ctSeconds = Math.floor(seekLoc - ctMinutes * 60);

        if ((ctMinutes < 0) || (ctSeconds < 0))
            return;

        if ((ctMinutes < 0) || (ctSeconds < 0))
            return;

        if (ctMinutes < 10)
            ctMinutes = '0' + ctMinutes;
        if (ctSeconds < 10)
            ctSeconds = '0' + ctSeconds;

        if (isNaN(ctMinutes) || isNaN(ctSeconds))
            insTime.text('--:--');
        else
            insTime.text(ctMinutes + ':' + ctSeconds);

        insTime.css({ 'left': seekT, 'margin-left': '-21px' }).fadeIn(0);

    }

    function hideHover() {
        sHover.width(0);
        insTime.text('00:00').css({ 'left': '0px', 'margin-left': '0px' }).fadeOut(0);
    }

    function playFromClickedPos() {
        audio.currentTime = seekLoc;
        seekBar.width(seekT);
        hideHover();
    }

    function updateCurrTime() {
        nTime = new Date();
        nTime = nTime.getTime();

        if (!tFlag) {
            tFlag = true;
            trackTime.addClass('active');
        }

        curMinutes = Math.floor(audio.currentTime / 60);
        curSeconds = Math.floor(audio.currentTime - curMinutes * 60);

        durMinutes = Math.floor(audio.duration / 60);
        durSeconds = Math.floor(audio.duration - durMinutes * 60);

        playProgress = (audio.currentTime / audio.duration) * 100;

        if (curMinutes < 10)
            curMinutes = '0' + curMinutes;
        if (curSeconds < 10)
            curSeconds = '0' + curSeconds;

        if (durMinutes < 10)
            durMinutes = '0' + durMinutes;
        if (durSeconds < 10)
            durSeconds = '0' + durSeconds;

        if (isNaN(curMinutes) || isNaN(curSeconds))
            tProgress.text('00:00');
        else
            tProgress.text(curMinutes + ':' + curSeconds);

        if (isNaN(durMinutes) || isNaN(durSeconds))
            tTime.text('00:00');
        else
            tTime.text(durMinutes + ':' + durSeconds);

        if (isNaN(curMinutes) || isNaN(curSeconds) || isNaN(durMinutes) || isNaN(durSeconds))
            trackTime.removeClass('active');
        else
            trackTime.addClass('active');


        seekBar.width(playProgress + '%');

        if (playProgress == 100) {
            i.attr('class', 'fa fa-play');
            seekBar.width(0);
            tProgress.text('00:00');
            albumArt.removeClass('buffering').removeClass('active');
            clearInterval(buffInterval);
            selectTrack(1);
        }
    }

    function checkBuffering() {
        clearInterval(buffInterval);
        buffInterval = setInterval(function () {
            if ((nTime == 0) || (bTime - nTime) > 1000)
                albumArt.addClass('buffering');
            else
                albumArt.removeClass('buffering');

            bTime = new Date();
            bTime = bTime.getTime();

        }, 100);
    }

    function selectTrack(flag) {
        if (flag == 0 || flag == 1)
            ++currIndex;
        else
            --currIndex;

        if ((currIndex > -1) && (currIndex < songs.length)) {
            if (flag == 0)
                i.attr('class', 'fa fa-play');
            else {
                albumArt.removeClass('buffering');
                i.attr('class', 'fa fa-pause');
            }

            seekBar.width(0);
            trackTime.removeClass('active');
            tProgress.text('00:00');
            tTime.text('00:00');

            currAlbum = songs[currIndex].name;
            currTrackName = songs[currIndex].artist;
            currArtwork = songs[currIndex].picture;

            audio.src = songs[currIndex].url;

            nTime = 0;
            bTime = new Date();
            bTime = bTime.getTime();

            if (flag != 0) {
                audio.play();
                playerTrack.addClass('active');
                albumArt.addClass('active');

                clearInterval(buffInterval);
                checkBuffering();
            }

            albumName.text(currAlbum);
            trackName.text(currTrackName);
            $('#album-art img').prop('src', bgArtworkUrl);
        }
        else {
            if (flag == 0 || flag == 1)
                --currIndex;
            else
                ++currIndex;
        }
    }

    function initPlayer() {
        audio = new Audio();

        selectTrack(0);

        audio.loop = false;

        playPauseButton.on('click', playPause);

        sArea.mousemove(function (event) { showHover(event); });

        sArea.mouseout(hideHover);

        sArea.on('click', playFromClickedPos);

        $(audio).on('timeupdate', updateCurrTime);

        playPreviousTrackButton.on('click', function () { selectTrack(-1); });
        playNextTrackButton.on('click', function () { selectTrack(1); });
    }

    initPlayer();
});
