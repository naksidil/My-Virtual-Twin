$(document).ready(function () {
    $('input[type="range"]').each(function () {
        const valueSpan = $("#" + $(this).attr("id") + "Value");
        valueSpan.text($(this).val());
        $(this).on("input", function () {
            valueSpan.text($(this).val());
        });
    });

    $('#SendDataButton').click(function () {
        var bodyMeasurements = {
            Height: parseFloat($('#Height').val()),
            Waist: parseFloat($('#Waist').val()),
            Chest: parseFloat($('#Chest').val()),
            Hip: parseFloat($('#Hips').val()),
            ShoulderWidth: parseFloat($('#Weight').val())
        };
        $.ajax({
            url: '/editor/generate-3d-model',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(bodyMeasurements),
            success: function (response) {
                var canvas = document.getElementById('modelCanvas');
                var ctx = canvas.getContext('2d');
                ctx.clearRect(0, 0, canvas.width, canvas.height);  

                var vertices = response.vertices;

                const scaleFactor = 200;  
                const offsetX = canvas.width / 2; 
                const offsetY = canvas.height / 2;  

                vertices.forEach(function (vertex) {
                    const x = vertex[0] * scaleFactor + offsetX; 
                    const y = -vertex[1] * scaleFactor + offsetY; 

                    const size = Math.max(3, 5 - Math.abs(vertex[2])); 

                    ctx.beginPath();
                    ctx.arc(x, y, size, 0, 2 * Math.PI);
                    ctx.fillStyle = 'rgba(0, 0, 255, 0.5)';
                    ctx.fill();
                    ctx.closePath();
                });
            },
            error: function (xhr, status, error) {
                console.error('Bir hata oluştu:', error);
            }
        });
    });


});
