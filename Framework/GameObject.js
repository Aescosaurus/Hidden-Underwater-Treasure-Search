function GameObject()
{
	this.Pos = new Vec2( 0,0 );
	this.Size = new Vec2( 50,50 );
	this.Hitbox = new Rect( 0,0,0,0 );
	// 
	this.Draw=( gfx )=>
	{
		gfx.DrawRect( this.Pos,this.Size,"#F00" );
	}
	
	this.MoveTo=( newPos )=>
	{
		this.Pos = newPos;
	}
	
	this.MoveBy=( amount )=>
	{
		this.Pos += amount;
	}
	
	this.SetSize=( newSize )=>
	{
		this.Size = newSize;
		this.Hitbox.width = newSize.x;
		this.Hitbox.height = newSize.y;
	}
	
	this.GetPos=()=>
	{
		return this.Pos;
	}
	
	this.GetSize=()=>
	{
		return this.Size;
	}
	
	this.GetRect=()=>
	{
		this.Hitbox.MoveTo( this.Pos );
		return this.Hitbox;
	}
	
	this.Expose=()=>
	{
		console.log( "-----------" );
		console.log( "GAME OBJECT" );
		console.log( "-----------" );
		console.log( "POS: " + "x: " + this.Pos.x + " y: " + this.Pos.y );
		console.log( "SIZE: " + "w: " + this.Size.x + " h: " + this.Size.y );
		console.log( "RECT: " + "x: " + this.Hitbox.x + " y: " + this.Hitbox.y +
			" w: " + this.Hitbox.width + " h: " + this.Hitbox.height );
	}
}