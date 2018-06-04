function Keyboard()
{
	let keyMap = [];
	// 
	this.Start=()=>
	{
		onkeydown = onkeyup=( e )=>
		{
			keyMap[e.keyCode] = ( e.type == 'keydown' );
		}
	}
	
	this.KeyDown=( key )=>
	{
		if( typeof( key ) === 'string' )
		{
			key = key.charCodeAt( 0 );
		}
		
		return keyMap[key];
	}
	
	this.AnyKey=()=>
	{
		return nKeysPressed > 0;
	}
}