test("hello test", function() {
    ok(1 == "1", "Passed!");
});

test("a basic test example", function() {
    var value = "hello";
    equal(value, "hello", "We expect value to be hello");
});

test( "ok test", function() {
    ok( true, "true succeeds" );
    ok( "non-empty", "non-empty string succeeds" );
    ok( false, "false fails" );
    ok( 0, "0 fails" );
    ok( NaN, "NaN fails" );
    ok( "", "empty string fails" );
    ok( null, "null fails" );
    ok( undefined, "undefined fails" );
});

test( "a test", function() {
    expect( 2 );
 
    function calc( x, operation ) {
        return operation( x );
    }
 
    var result = calc( 2, function( x ) {
    ok( true, "calc() calls operation function" );
        return x * x;
    });
 
    equal( result, 4, "2 square equals 4" );
});

module( "group a" );
test( "a basic test example", function() {
    ok( true, "this test is fine" );
});
test( "a basic test example 2", function() {
    ok( false, "this test is fine" );
});
 
module( "group b" );
test( "a basic test example 3", function() {
    ok( true, "this test is fine" );
});
test( "a basic test example 4", function() {
    ok( false, "this test is fine" );
});