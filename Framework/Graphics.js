function Graphics()
{
	const canv = document.getElementById( "gc" );
	const ctx = canv.getContext( "2d" );
	
	let images = [];
	
	this.ScreenWidth = canv.width;
	this.ScreenHeight = canv.height;
	this.ScreenSize = new Vec2( canv.width,canv.height );
	this.ScreenRect = new Rect( 0,0,canv.width,canv.height );
	this.CanStart = true;
	// 
	this.Start=()=>
	{
		ctx.imageSmoothingEnabled = false;
		ctx.webkitImageSmoothingEnabled = false;
		ctx.mozImageSmoothingEnabled = false;
	}
	
	this.GetCanvas=()=>
	{
		return canv;
	}
	
	this.GetContext=()=>
	{
		return ctx;
	}
	
	this.SetAlpha=( alpha )=>
	{
		ctx.globalAlpha = alpha;
	}
	
	this.LoadImage=( url,async = true )=>
	{
		for( let i = 0; i < images.length; ++i )
		{
			const temp = new Image();
			temp.src = url;
			if( images[i].src == temp.src )
			{
				return i;
			}
		}
		
		images.push( new Image() );
		
		images[images.length - 1].onload=()=>
		{
			this.CanStart = true;
		}
		
		images[images.length - 1].src = url;
		
		return( images.length - 1 );
	}
	
	this.DrawImage=( index,pos = new Vec2( 0,0 ),size = new Vec2( 0,0 ) )=>
	{
		if( isNaN( pos.x ) || isNaN( pos.y ) || isNaN( size.x ) || isNaN( size.y ) )
		{
			console.log( "Drawing image to NaN cancelled!" );
			return false;
		}
		
		if( size.x != 0 && size.y != 0 )
		{
			ctx.drawImage( images[index],pos.x,pos.y,size.x,size.y );
		}
		else
		{
			ctx.drawImage( images[index],pos.x,pos.y );
		}
	}
	
	this.DrawImageClip=( index,pos,clipArea,size )=>
	{
		ctx.drawImage( images[index],
			clipArea.x,clipArea.y,clipArea.width,clipArea.height,
			pos.x,pos.y,size.x,size.y );
	}
	
	this.DrawRect=( pos,size,c )=>
	{
		if( isNaN( pos.x ) || isNaN( pos.y ) || isNaN( size.x ) || isNaN( size.y ) )
		{
			console.log( "Drawing rectangle to NaN cancelled!" );
			return false;
		}
		ctx.fillStyle = c;
		ctx.fillRect( pos.x,pos.y,size.x,size.y );
	}
	
	this.DrawCircle=( pos,radius,c )=>
	{
		if( isNaN( pos.x ) || isNaN( pos.y ) || isNaN( radius ) )
		{
			console.log( "Drawing circle to NaN cancelled!" );
			return false;
		}
		ctx.fillStyle = c;
		
		ctx.beginPath();
		ctx.arc( pos.x,pos.y,radius,0,2 * Math.PI );
		ctx.fill();
	}
	
	this.DrawHollowCircle=( pos,radius,c )=>
	{
		if( isNaN( pos.x ) || isNaN( pos.y ) || isNaN( radius ) )
		{
			console.log( "Drawing circle to NaN cancelled!" );
			return false;
		}
		
		ctx.strokeStyle = c;
		ctx.lineWidth = 2;
		
		ctx.beginPath();
		ctx.arc( pos.x,pos.y,radius,0,2 * Math.PI );
		ctx.stroke();
		// ctx.fill();
	}
	
	this.DrawGrad=( pos,size,colors )=>
	{
		if( isNaN( pos.x ) || isNaN( pos.y ) || isNaN( size.x ) || isNaN( size.y ) )
		{
			console.log( "Drawing gradient rectangle to NaN cancelled!" );
			return false;
		}
		let grad = ctx.createLinearGradient( pos.x,pos.y,pos.x + size.x,pos.y + size.y );
		
		const stopAddAmount = 1.0 / colors.length;
		let amount = 0.0;
		for( let i = 0; i < colors.length; ++i )
		{
			grad.addColorStop( amount,colors[i] );
			amount += stopAddAmount;
		}
		
		ctx.fillStyle = grad;
		ctx.fillRect( pos.x,pos.y,size.x,size.y );
	}
	
	this.DrawText=( pos,font,color,msg )=>
	{
		if( isNaN( pos.x ) || isNaN( pos.y ) )
		{
			console.log( "Drawing text to NaN cancelled!" );
			return false;
		}
		ctx.fillStyle = color;
		ctx.font = font;
		ctx.fillText( msg,pos.x,pos.y );
	}
	
	this.DrawLine=( pos1,pos2,color,lw = 3 )=>
	{
		if( isNaN( pos1.x ) || isNaN( pos2.x ) ||
			isNaN( pos1.y ) || isNaN( pos2.y ) )
		{
			console.log( "Drawing line to NaN failed!" );
		}
		ctx.strokeStyle = color;
		ctx.lineWidth = lw;
		ctx.beginPath(); // Erases previous line.
		ctx.moveTo( pos1.x,pos1.y );
		ctx.lineTo( pos2.x,pos2.y );
		ctx.stroke();
	}
}
