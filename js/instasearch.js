        function loadImage(insta_pic){
            //create a loading image before to put the original image
            var containerDiv = $("<div />").attr('class', 'col-lg-2 col-md-4 col-xs-6 thumb');
            var spinnerImage = $("<img />").attr('src', 'img/spinner.gif');
            var link = $("<a />").attr('href', insta_pic.link).attr('class', 'thumbnail');
            link.append(spinnerImage);

            containerDiv.append(link);
            $('#instafeed').append(containerDiv);

            //now, load the instagram image
            var img = $("<img />").attr('src', insta_pic.images.thumbnail.url).attr('class', 'img-responsive');
            img.load(function(){
                link.empty();
                link.append(img);
            });

        }

        $(document).ready(function(){
            //using Ajax
            $('#search_pics').submit(function(event) {

                //Clear the image container 
                $('#instafeed').empty();

                //Show loading screen
                //$('#loadingModal').modal('show');

                $.ajax({
                    url: String.concat('https://api.instagram.com/v1/tags/', 
                                                                $('#tag').val(), 
                                                                '/media/recent'),
                    type: 'GET',
                    dataType: 'jsonp',
                    data: {
                        client_id: '4b32b5a4a99e4ad7b3ad67e6708eac81',
                        count: 50
                    },
                })
                .done(function(data) {
                    console.log("success");

                    for(var i = 0; i < data.data.length; i++){

                        var insta_pic = data.data[i];
                        loadImage(insta_pic);

                    }
                    //hide the load screen
                    //$('#loadingModal').modal('hide');

                })
                .fail(function() {
                    console.log("error");
                })
                .always(function() {
                    console.log("complete");
                });
                
                event.preventDefault();
            });
            


            //Using instafeed
            // $('#search_pics').submit(function(event) {
            //     var feed = new Instafeed({
            //         get: 'tagged',
            //         tagName: $('#hastag').val(),
            //         resolution: 'low_resolution',
            //         clientId: '4b32b5a4a99e4ad7b3ad67e6708eac81',
            //         template: '<a href="{{link}}"><img src="{{image}}" /></a>',
            //          custom: {
            //             images: [],
            //             currentImage: 0,
            //             showImage: function () {
            //                 var result, image;
            //                 for(var i = 0; i < this.options.custom.images.length; i++){
            //                     image = this.options.custom.images[i];
            //                     result = this._makeTemplate(this.options.template, {
            //                     link: image.link,
            //                     image: image.images[this.options.resolution].url,
            //                     });
            //                     console.log(result);
            //                     $("#instafeed").html(result);
            //                 }
            //             }
            //         },
            //         success: function (data) {
            //             console.dir(data);
            //             this.options.custom.images = data.data; 
            //             this.options.custom.showImage.call(this);
            //         }
            //     });

            //     feed.run();

            //     event.preventDefault();
            // });
        });