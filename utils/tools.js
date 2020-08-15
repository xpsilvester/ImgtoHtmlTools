$(function () {
    let $this = null;
    $('table p').on('mousedown', function (e) {
        console.log(e)
        $this = null;
        $this = this;
        let y = e.clientY,
            x = e.clientX,
            top = parseInt($(this).css('marginTop')),
            left = parseInt($(this).css('marginLeft'));
        //移动元素
        $(document).on('mousemove', function (e) {
            e.preventDefault();
            let moveY = e.clientY - y,
                moveX = e.clientX - x;
            $($this).css({
                marginLeft: left + moveX + 'px',
                marginTop: top + moveY + 'px'
            })
        })
        //鼠标滚轮事件，控制字体大小
        $($this).on('mousewheel', function (e) {
            let $fontSize = parseInt($(this).css('fontSize'))
            e = e || window.event;
            if (navigator.userAgent.toLowerCase().indexOf('msie') >= 0) {
                event.returnValue = false;
            } else {
                e.preventDefault();
            };
            $($this).css({ fontSize: $fontSize + e.deltaY + 'px' })
        })
        //删除元素
        $(document).on('keydown', function (event) {
            e.preventDefault();
            if (event.keyCode == 8) {
                $($this).remove()
            }
        });
        //鼠标松开，解绑
        $(document).on('mouseup', function (e) {
            $(document).off('mousemove');
            $(document).off('keydown')
        })
        $(this).colorpicker({
            fillcolor: true,
            event: 'click',
            target: $(this),
            success: function (o, color) {
                console.log(o, color)
                $($this).css({ color: color })
                $('.colorpanel').remove()
            }
        })
    })
    $("#copy").click(function() { 
       $('#copy-content').val($('#thematic').html())
       $('#copy-content').css({display:'block'})
    })
})