const WindowState = {
	VERTICALLY_MAXIMIZED: 0,
	HORIZONTALLY_MAXIMIZED: 1,
	MAXIMIZED:2,
	TILED_TOP: 3,
	TILED_BOTTOM: 4,
	TILED_LEFT:5,
	TILED_RIGHT:6,
	TILED_TOP_LEFT: 7,
	TILED_TOP_RIGHT: 8,
	TILED_BOTTOM_LEFT: 9,
	TILED_BOTTOM_RIGHT: 10,
	TILED_NONE: 11
}


function getScreenGeometry() {
	return workspace.clientArea(KWin.PlacementArea, workspace.activeScreen, workspace.Desktop);
}

function getClientGeometryOnScreen() {
	const clientGeometry = workspace.activeClient.geometry;
	const screenGeometry = getScreenGeometry();
	clientGeometry.x -= screenGeometry.x;
	clientGeometry.y -= screenGeometry.y;
	return clientGeometry;
}

function getWindowState() {
	const screenGeometry = getScreenGeometry();
	const clientGeometry = getClientGeometryOnScreen();

	const halfHeight = (screenGeometry.height / 2);
	const halfWidth = (screenGeometry.width / 2);

	const verticallyMax = clientGeometry.height === screenGeometry.height;
	const horizontallyMax = clientGeometry.width === screenGeometry.width;
	const tiledToTop = clientGeometry.height === halfHeight && clientGeometry.y === 0;
	const tiledToBottom = clientGeometry.height === halfHeight && clientGeometry.y === halfHeight;
	const tiledToLeft = clientGeometry.width === halfWidth && clientGeometry.x === 0;
	const tiledToRight = clientGeometry.width === halfWidth && clientGeometry.x === halfWidth;

	if(tiledToRight && verticallyMax)
		return WindowState.TILED_RIGHT;

	if(tiledToLeft && verticallyMax)
		return WindowState.TILED_LEFT;

	if(tiledToBottom && tiledToLeft)
	 	return WindowState.TILED_BOTTOM_LEFT;

	if(tiledToBottom && tiledToRight)
		return WindowState.TILED_BOTTOM_RIGHT;

	if(tiledToBottom && horizontallyMax)
		return WindowState.TILED_BOTTOM;

	if(tiledToTop && tiledToLeft)
		return WindowState.TILED_TOP_LEFT;

	if(tiledToTop && tiledToRight)
	 return WindowState.TILED_TOP_RIGHT;

	if(tiledToTop && horizontallyMax)
		return WindowState.TILED_TOP;

	if(horizontallyMax && verticallyMax)
		return WindowState.MAXIMIZED;

	if (verticallyMax)
		return WindowState.VERTICALLY_MAXIMIZED;

	if (horizontallyMax) {
		return WindowState.HORIZONTALLY_MAXIMIZED;
	}

	return WindowState.TILED_NONE;
}

const onUpKey = function() {

	switch(getWindowState()) {
		case WindowState.TILED_LEFT:
			workspace.slotWindowQuickTileTopLeft();
			break;
		case WindowState.TILED_RIGHT:
			workspace.slotWindowQuickTileTopRight();
			break;
		case WindowState.TILED_BOTTOM:
			workspace.slotWindowQuickTileBottom();
			break;
		case WindowState.TILED_BOTTOM_LEFT:
			workspace.slotWindowQuickTileLeft();
			break;
		case WindowState.TILED_BOTTOM_RIGHT:
			workspace.slotWindowQuickTileRight();
			break;
		case WindowState.MAXIMIZED:
			workspace.slotWindowQuickTileTop();
			// workspace.slotWindowQuickTileTop();
			break;
		case WindowState.TILED_TOP:
			workspace.slotWindowMaximize();
			break;
		case WindowState.TILED_NONE:
			workspace.slotWindowQuickTileTop();
			break;
		//default:
			//workspace.slotWindowNoBorder()
			//workspace.slotWindowQuickTileTop();
	}

}

const onDownKey = function() {

	switch(getWindowState()) {
		case WindowState.TILED_LEFT:
			workspace.slotWindowQuickTileBottomLeft();
			break;
		case WindowState.TILED_RIGHT:
			workspace.slotWindowQuickTileBottomRight();
			break;
		case WindowState.TILED_TOP:
			workspace.slotWindowQuickTileTop();
			break;
		case WindowState.TILED_TOP_LEFT:
			workspace.slotWindowQuickTileLeft();
			break;
		case WindowState.TILED_TOP_RIGHT:
			workspace.slotWindowQuickTileRight();
			break;
		case WindowState.MAXIMIZED:
			workspace.slotWindowQuickTileBottom();
			//workspace.slotWindowQuickTileBottom();
			break;
		case WindowState.TILED_NONE:
			workspace.slotWindowQuickTileBottom();
			break;
		//default:
			//workspace.slotWindowNoBorder()
			//workspace.slotWindowQuickTileBottom();
	}
}

const onLeftKey = function() {

	switch(getWindowState()) {
		case WindowState.TILED_TOP:
			workspace.slotWindowQuickTileTopLeft();
			break;
		case WindowState.TILED_BOTTOM:
			workspace.slotWindowQuickTileBottomLeft();
			break;
		case WindowState.TILED_TOP_RIGHT:
			workspace.slotWindowQuickTileTop();
			break;
		case WindowState.TILED_BOTTOM_RIGHT:
			workspace.slotWindowQuickTileBottom();
			break;
		case WindowState.TILED_RIGHT:
			workspace.slotWindowQuickTileRight();
			break;
		case WindowState.MAXIMIZED:
			workspace.slotWindowQuickTileLeft();
			//workspace.slotWindowQuickTileLeft();
			break;
		case WindowState.TILED_NONE:
			workspace.slotWindowQuickTileLeft();
		break;
		//default:
			//workspace.slotWindowNoBorder()
			//workspace.slotWindowQuickTileLeft();
	}
}

const onRightKey = function() {

	switch(getWindowState()) {
		case WindowState.TILED_TOP:
			workspace.slotWindowQuickTileTopRight();
			break;
		case WindowState.TILED_BOTTOM:
			workspace.slotWindowQuickTileBottomRight();
			break;
		case WindowState.TILED_TOP_LEFT:
			workspace.slotWindowQuickTileTop();
			break;
		case WindowState.TILED_BOTTOM_LEFT:
			workspace.slotWindowQuickTileBottom();
			break;
		case WindowState.TILED_LEFT:
			workspace.slotWindowQuickTileLeft();
			break;
		case WindowState.MAXIMIZED:
			workspace.slotWindowQuickTileRight();
			//workspace.slotWindowQuickTileRight();
			break;
		case WindowState.TILED_NONE:
			workspace.slotWindowQuickTileRight();
			break;
		//default:
			//workspace.slotWindowNoBorder()
			//workspace.slotWindowQuickTileRight();
	}

}

const shortcutPrefix = "Cimon Tiler "
registerShortcut(shortcutPrefix + "Up", shortcutPrefix + "Up", "Meta+Up", onUpKey);
registerShortcut(shortcutPrefix + "Down", shortcutPrefix + "Down", "Meta+Down", onDownKey);
registerShortcut(shortcutPrefix + "Left", shortcutPrefix + "Left", "Meta+Left", onLeftKey);
registerShortcut(shortcutPrefix + "Right", shortcutPrefix + "Right", "Meta+Right", onRightKey);