let currentquestionindex,shuffledquestion,answers,catselect,diffselect,points;

$('document').ready(function(){
    
    $('#start-btn').click(function(){

        if($.trim(catselect)==''|| $.trim(diffselect)=='')
        {
        alert('Select Category & Difficulty First') 
        }
        else
        {
            sendApiRequest()
            startgame()
            points=0
        }
    });

    function startgame(data){
        $('#start-btn').hide()
        $('#question-contaioner').show() 
        shuffledquestion=data
        currentquestionindex=0
    }    
    
    async function sendApiRequest(){
        let response= await fetch (`https://the-trivia-api.com/api/questions?categories=${catselect}&limit=10&region=IN&difficulty=${diffselect}`)
        data = await response.json()
        
        console.log(data)
        showquestion(data)
       
}
    function showquestion(data)
    {
        resetState()
        $('#Question').text(data[currentquestionindex].question)
        answers=[
            data[currentquestionindex].correctAnswer,
            data[currentquestionindex].incorrectAnswers[0],
            data[currentquestionindex].incorrectAnswers[1],
            data[currentquestionindex].incorrectAnswers[2]
        ]
        answers.sort( ()=>Math.random()-0.5 );
        // console.log(answers)
        $('.btn1').text(answers[0])
        $('.btn2').text(answers[1])
        $('.btn3').text(answers[2])
        $('.btn4').text(answers[3])
        
    }

    $('.answer').click(function(){
        if($(event.target).html()==data[currentquestionindex].correctAnswer){
            $(event.target).addClass('correct')
            $("button:not(.correct)").addClass('wrong')
            $('.next-btn').show()
            points=points+1
        }
        else{
            $(event.target).addClass('wrong')
            $("button:not(.wrong)").addClass('disabled')
            $('.next-btn').show()
            $('.correctans').html(`Answer : ${data[currentquestionindex].correctAnswer}`)
        }
    })
    
    $('.next-btn').click(function(){
        currentquestionindex++
        showquestion(data,currentquestionindex)
    })

   
    function resetState(){
        $('.btn').removeClass('correct')
        $('.btn').removeClass('wrong')
        $('.btn').removeClass('disabled')
        $('#next-btn').hide()
        $('.correctans').html(``)

        if(data.length<currentquestionindex+1){
            $('.answer').hide()
            $('#Question').hide()
            $('.restart').show()
            $('.correctans').html(`Your Score : ${points} / 10`)
        }else{
            $('.answer').show()
            $('#Question').show()
           
        }
        
    }

    $('.restart').click(function(){
        location.reload(true); 
    })
    //selection

    $('#c1').click(function(){
    $('.category').html(`General Knowledge`);
    catselect='General Knowledge';
    $('.Category').hide()
    });

    $('#c2').click(function(){
    $('.category').html(`Science`);
    catselect='science';
    $('.Category').hide()
    });
    
    $('#c3').click(function(){
    $('.category').html(`Sport & Leisure`);
    catselect="Sport_and_Leisure"
    $('.Category').hide()
    });

    $('#c4').click(function(){
    $('.category').html(`Arts & Literature`);
    catselect="Arts_and_Literature"
    $('.Category').hide()
    });

    $('#c5').click(function(){
    $('.category').html(`Film & TV`);
    catselect="Film_and_TV";
    $('.Category').hide()
    });


    $('#d1').click(function(){
    $('.difficulty').html(`Easy `);
    diffselect='easy'
    $('.Difficulty').hide()
});

    $('#d2').click(function(){
    $('.difficulty').html(`Medium`);
    diffselect='medium'
    $('.Difficulty').hide()
});

  $('#d3').click(function(){
    $('.difficulty').html(`Hard`);
    diffselect='hard'
    $('.Difficulty').hide()
});
  


})