$(document).ready(function () {
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBkQXSwdYrdVjEnx1Yb-TqMgdCxQpxdQh8",
    authDomain: "trainschedule-172e2.firebaseapp.com",
    databaseURL: "https://trainschedule-172e2.firebaseio.com",
    projectId: "trainschedule-172e2",
    storageBucket: "trainschedule-172e2.appspot.com",
    messagingSenderId: "236087521437"
  };
  firebase.initializeApp(config);

      // Capture Button Click
      $("#submit").on("click", function (event) {
        event.preventDefault();
        // Capture User Inputs and store them into variables
        var input1 = $("#trainname").val().trim();
        var input2 = $("#destination").val().trim();
        var input3 = $("#firstTrain").val().trim();
        var input4 = $("#frequency").val().trim();
        var input5 = moment().diff(moment('input3','MM/DD/YYYY'), 'months')
         console.log(input5)
        $("#trainname").val("");
        $("#destination").val("");
        $("#firstTrain").val("");
        $("#frequency").val("");
        database.ref().push({
            name: input1,
            role: input2,
            date: input3,
            rate: input4,
            worked: input5,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
        // Output all of the new information into the relevant HTML sections
        $("#trainSchedule").append("<tr><th>" + input1 + "</th><th>" + input2 + "</th><th>" + input3 + "</th><th>" + input5 + "</th><th>" + input4 + "</th><th>" + input4 + "</th></tr>")
        database.ref().orderByChild('rate').limitToLast(1).on('child_added', function(snap){
            console.log(snap.val())
            })
        return false
    })

    database.ref().on("value", function(snap){
        console.log(snap.val())
    })
})