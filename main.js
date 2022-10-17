// https://teachablemachine.withgoogle.com/models/3oLcxnTxf/

Webcam.set({
    width:350,
    height:300,
    image_format : 'png',
    png_quality: 90
});

var happy = ["&#128522;", "&#128512;"]
randomNumber=Math.floor(Math.random()*2)

var angry = ["&#128545;", "&#128548;"]
randomNumber=Math.floor(Math.random()*2)

var sad = ["&#128546;", "&#128532;"]
randomNumber=Math.floor(Math.random()*2)

camera=document.getElementById("camera");
Webcam.attach('#camera')

function takeSnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML="<img id='captured_image' src='"+data_uri+"'/>"
    });
}
console.log('ml5 version:', ml5.version);
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/3oLcxnTxf/model.json', modelLoaded);

function modelLoaded(){
    console.log("Model Loaded!")
}

function gotResult(error, results){
    if (error){
        console.error(error)
    }
    else{
        console.log(results)
        document.getElementById("result_emotion_name").innerHTML=results[0].label;
        document.getElementById("result_emotion_name2").innerHTML=results[1].label;
        prediction_1=results[0].label;
        prediction_2=results[1].label;
        speak();

        if (prediction_1 == "Happy"){
            document.getElementById("update_emoji").innerHTML = happy[randomNumber]
        }
        if (prediction_1 == "Sad"){
            document.getElementById("update_emoji").innerHTML = sad[randomNumber]
        }
        if (prediction_1 == "Angry"){
            document.getElementById("update_emoji").innerHTML = angry[randomNumber]
        }

        if (prediction_2 == "Happy"){
            document.getElementById("update_emoji2").innerHTML = happy[randomNumber]
        }
        if (prediction_2 == "Sad"){
            document.getElementById("update_emoji2").innerHTML = sad[randomNumber]
        }
        if (prediction_2 == "Angry"){
            document.getElementById("update_emoji2").innerHTML = angry[randomNumber]
        }
    }
}

function check(){
    img = document.getElementById("captured_image");
    classifier.classify(img, gotResult)
}

function speak(){
    var synth=window.speechSynthesis;
    speak_data_1 = "The first prediction is: " + prediction_1
    speak_data_2 = "The second prediction is: " + prediction_2
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2)
    synth.speak(utterThis)
};