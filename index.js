// Requires Google Analytics Tag Manager: `gtag()`
// Requires jQuery: `$()`   

$( "body" ).removeClass( "my-nojs" ).addClass( "my-js" );



////////////////////////////////////////////////////////////////////////////////
// Setup slide 1
//
var maxBooks  = 46;
var numCovers = 8;
while( maxBooks-- )  // Adds book-covers
	$( '<img class="my-bookcov">' )
		.attr( "src", "image/book" + Math.floor( maxBooks % numCovers ) + ".png" )
		.appendTo( $( "#my-slide-good .my-picture" ) );
		
		
		
$( "#my-slide-good .my-mouse-ptr span" ).on( "animationstart", function()
{
	$( "#my-fake-addrbar-url").removeClass( "my-active" );
});
		
$( "#my-slide-good .my-mouse-ptr span" ).on( "animationend", function()
{
	$( "#my-fake-addrbar-url").addClass( "my-active" );
});

$( "#my-slide-email .my-mouse-ptr span" ).on( "animationstart", function()
{
	$( "#my-slide-email .my-mailto").removeClass( "my-active" );
});
		
$( "#my-slide-email .my-mouse-ptr span" ).on( "animationend", function()
{
	$( "#my-slide-email .my-mailto").addClass( "my-active" );
});




////////////////////////////////////////////////////////////////////////////////
// Changes slides when user changes UI controls:
//
function showSlide( theSel )
{
	if( $( theSel ).hasClass( "my-active" ) ) return;
	
	const aniMove = "10px";
	const aniTime = 2000;
	const $a      = $( ".my-slide.my-active" );
	
	if( $a.length > 0 )  // Hide previous slide
	{
		$a.removeClass( "my-active" );
		$a.fadeOut( 1000 );
		$a.find( ".my-inner" ).animate({ opacity: 0.0 }, aniTime, function()
		{
			$( this ).css( "top", "-" + aniMove );
		});
	}
	
	$( theSel ).addClass( "my-active" );
	$( theSel ).fadeIn( 1000 );
	$( theSel ).find( ".my-inner" ).animate({ opacity: 1.0, "top": aniMove }, aniTime );
}

$( "input[type=email]" ).focus( function()
{
	showSlide( "#my-slide-email" );
});

$( "input[name=shelfurl]" ).focus( function()
{
	showSlide( "#my-slide-good" );
});



////////////////////////////////////////////////////////////////////////////////
// Sends registration formular:
//
function setRegistrationFormState( theState, theMsg )
{
	$( "#my-registration-form"           ).attr( "class",    theState );
	$( "#my-registration-form fieldset"  ).prop( "disabled", theState == "my-sending-state" );
	$( "#my-registration-form .my-jsmsg" ).html( theMsg );
}

function hasHtml5Validation () 
{
	return typeof document.createElement( 'input' ).checkValidity === 'function';
}

$( "#my-registration-form" ).submit( function( event )
{
	if( hasHtml5Validation() )
	{
		if( this.checkValidity() )  // Fokin Safari needs extra-call
		{
			// Google Analytics:
			//   - event names/opts: https://developers.google.com/gtagjs/reference/event
			//   - requires active cookies
			//   - requires absent ad-blocker
			//   - event_action = event name
			//
			// Formspree.io:
			//   - requires valid 'referrer' info.
			// 
			$.ajax(
			{
				dataType: "json",
				method:   "POST",
				url:      $( "#my-registration-form" ).attr( "action" ),
				data: 
				{
					_subject : $( "[name=_subject]" ).val(),
					_replyto : $( "[name=_replyto]" ).val(),
					_format  : $( "[name=_format]"  ).val(),
					shelfurl : $( "[name=shelfurl]" ).val()
					// UA, viewport etc via Google Analytics
				},
				beforeSend: function()
				{
					setRegistrationFormState( "my-sending-state" );
				},
				success: function()
				{
					setRegistrationFormState( "my-success-state" );
					gtag( "event", "sign_up", { event_category: "registration_form", method: "email" });
				},
				error: function( xhr, s, err )
				{
					const m = "Status: " + s + " (" + err + ")";
					setRegistrationFormState( "my-failure-state", m );
					gtag( "event", "exception", { event_category: "registration_form", description: m, fatal: true });
				}
			});
		}
		else
		{
			alert( "Please fill out the form correctly." );
		}
	}
	else
	{
		alert( "Error. Please get a modern browser with proper HTML5 support." );
	}
	
	event.preventDefault();
	return false;
});




// Start:

$( document ).ready( function()
{
	showSlide( "#my-slide-good" );
	$( "#my-right-side" ).fadeIn( 1000, function()
	{
		$( "[name=shelfurl]" ).focus();  // Indicate it's the user's turn
	});
	
});



////////////////////////////////////////////////////////////////////////////////
// Developers:
// 
if( document.location.href.startsWith( "file://" ) )
{
	$( "body" ).keypress( function( event )
	{
		// Switch form states:
		if( event.which == 49 )       // "1"
			setRegistrationFormState( "my-start-state" )
		else if( event.which == 50 )  // "2"
			setRegistrationFormState( "my-sending-state" );
		else if( event.which == 51 )  // "3"
			setRegistrationFormState( "my-success-state" );
		else if( event.which == 52 )  // "4"
			setRegistrationFormState( "my-failure-state" )
	});
}

