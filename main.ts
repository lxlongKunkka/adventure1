enum ActionKind {
    Walking,
    Idle,
    Jumping,
    Dead,
    WalkingRight,
    WalkingLeft,
    IdleRight,
    IdleLeft,
    JumpRight,
    FallingRight,
    JumpLeft,
    FallingLeft,
    CrouchRight,
    CrouchLeft
}
namespace SpriteKind {
    export const Trap = SpriteKind.create()
    export const Brick = SpriteKind.create()
    export const Cover = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Trap, function (sprite, otherSprite) {
    if (猴子是否活着) {
        猴子是否活着 = false
        music.baDing.play()
        animation.setAction(otherSprite, ActionKind.Walking)
        animation.setAction(sprite, ActionKind.Dead)
    }
})
scene.onHitWall(SpriteKind.Player, function (sprite, location) {
    if (Monkey.tileKindAt(TileDirection.Top, assets.tile`myTile`) && !(是否创建指示牌)) {
        music.baDing.play()
        创建指示牌()
    }
    if (Monkey.tileKindAt(TileDirection.Bottom, assets.tile`myTile11`) && !(是否创建锅盖)) {
        music.baDing.play()
        创建锅盖()
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile6`, function (sprite, location) {
    创建栅栏()
    tiles.setTileAt(location, assets.tile`transparency16`)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Brick, function (sprite, otherSprite) {
    if (sprite.y > otherSprite.y && sprite.vy < 0) {
        tiles.setTileAt(tiles.getTileLocation(otherSprite.x / 16, otherSprite.y / 16), assets.tile`myTile3`)
        tiles.setWallAt(tiles.getTileLocation(otherSprite.x / 16, otherSprite.y / 16), true)
        otherSprite.destroy()
        music.baDing.play()
    }
})
function 初始化地图信息 () {
    animation.setAction(Monkey, ActionKind.IdleRight)
    猴子是否活着 = true
    是否创建指示牌 = false
    是否创建锅盖 = false
    指示牌背后的墙壁 = []
    锅盖墙壁数组 = []
    for (let 值 of tiles.getTilesByType(sprites.dungeon.floorLight0)) {
        tiles.setWallAt(值, true)
    }
    for (let 值2 of tiles.getTilesByType(assets.tile`myTile10`)) {
        tiles.setWallAt(值2, true)
    }
    for (let 值3 of tiles.getTilesByType(sprites.builtin.brick)) {
        tiles.setWallAt(值3, true)
    }
    for (let 值4 of tiles.getTilesByType(assets.tile`myTile4`)) {
        tiles.setWallAt(值4, true)
    }
    for (let 值5 of tiles.getTilesByType(assets.tile`myTile11`)) {
        tiles.setWallAt(值5, true)
    }
    for (let 值6 of tiles.getTilesByType(assets.tile`myTile15`)) {
        tiles.setWallAt(值6, true)
    }
    for (let 值7 of tiles.getTilesByType(assets.tile`myTile`)) {
        tiles.setWallAt(值7, true)
    }
    if (是否有存档点) {
        for (let 值8 of tiles.getTilesByType(assets.tile`myTile0`)) {
            tiles.setTileAt(值8, assets.tile`transparency16`)
        }
        for (let 值9 of tiles.getTilesByType(assets.tile`myTile8`)) {
            tiles.placeOnTile(Monkey, 值9)
            tiles.setTileAt(值9, assets.tile`transparency16`)
        }
    } else {
        for (let 值10 of tiles.getTilesByType(assets.tile`myTile0`)) {
            tiles.placeOnTile(Monkey, 值10)
            tiles.setTileAt(值10, assets.tile`transparency16`)
        }
    }
    for (let 值11 of tiles.getTilesByType(assets.tile`myTile1`)) {
        指示牌背后的墙壁.push(值11)
        tiles.setTileAt(值11, assets.tile`transparency16`)
    }
    for (let 值12 of tiles.getTilesByType(assets.tile`myTile12`)) {
        锅盖墙壁数组.push(值12)
        tiles.setTileAt(值12, assets.tile`transparency16`)
    }
    for (let 值13 of tiles.getTilesByType(assets.tile`myTile3`)) {
        mySprite = sprites.create(img`
            1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
            1 1 1 1 1 1 1 1 1 1 f f 1 1 1 1 
            1 1 1 1 1 1 1 1 1 1 f 1 1 1 1 1 
            1 1 1 1 1 1 1 f f 1 f 1 1 1 1 1 
            1 1 1 1 1 1 1 1 f f f f f 1 1 1 
            1 f f f f f 1 1 1 f 1 1 1 1 1 1 
            1 1 1 f 1 1 1 1 1 f 1 1 1 1 1 1 
            1 1 f f 1 1 f f f f f f f f f 1 
            1 f f 1 1 1 1 1 f 1 1 1 1 1 1 1 
            f f f f f f 1 f f 1 1 1 1 1 1 1 
            1 1 f 1 f 1 1 f f f f f f 1 1 1 
            1 1 f f f 1 1 1 1 1 1 1 f 1 1 1 
            1 1 f 1 1 1 1 1 1 1 1 f 1 1 1 1 
            1 1 1 1 1 1 1 1 1 1 f f 1 1 1 1 
            1 1 1 1 1 1 1 1 1 f f 1 1 1 1 1 
            1 1 1 1 1 1 1 1 1 1 f 1 1 1 1 1 
            `, SpriteKind.Brick)
        tiles.placeOnTile(mySprite, 值13)
        tiles.setTileAt(值13, assets.tile`transparency16`)
        mySprite.setFlag(SpriteFlag.Invisible, true)
    }
    创建云彩()
    创建毒草()
}
function 创建毒草 () {
    mySprite = sprites.create(img`
        ..........88....................
        ...88.....88..............88....
        ...878...878.......88.....88....
        ...8768.8878.......878...878....
        ...8678.8778.88....8768.8878....
        ...887888778.868...8678.8778.88.
        ...8876867688886...887888778.868
        88.88778778867868888876867688886
        87888778768776886888877877886786
        86768676766768878888877876877688
        .8776676767788777688867676676887
        ..877678767687788887667676778877
        ...87678667867888687767876768778
        ...87878668866868668767866786788
        ...86868668866868668787866886686
        ...86866668866868888686866886686
        `, SpriteKind.Trap)
    tiles.placeOnRandomTile(mySprite, assets.tile`myTile5`)
    mySprite.x += -8
    anim = animation.createAnimation(ActionKind.Idle, 1000)
    animation.attachAnimation(mySprite, anim)
    anim.addAnimationFrame(img`
        ..........88....................
        ...88.....88..............88....
        ...878...878.......88.....88....
        ...8768.8878.......878...878....
        ...8678.8778.88....8768.8878....
        ...887888778.868...8678.8778.88.
        ...8876867688886...887888778.868
        88.88778778867868888876867688886
        87888778768776886888877877886786
        86768676766768878888877876877688
        .8776676767788777688867676676887
        ..877678767687788887667676778877
        ...87678667867888687767876768778
        ...87878668866868668767866786788
        ...86868668866868668787866886686
        ...86866668866868888686866886686
        `)
    anim = animation.createAnimation(ActionKind.Walking, 1000)
    animation.attachAnimation(mySprite, anim)
    anim.addAnimationFrame(img`
        ..........22....................
        ...22.....22..............22....
        ...272...272.......22.....22....
        ...2762.2272.......272...272....
        ...2672.2772.22....2762.2272....
        ...227222772.262...2672.2772.22.
        ...2276267622226...227222772.262
        22.22772772267262222276267622226
        27222772762776226222277277226726
        26762676766762272222277276277622
        .2776676767722777622267676676227
        ..277672767627722227667676772277
        ...27672667267222627767276762772
        ...27272662266262662767266726722
        ...26262662266262662727266226626
        ...26266662266262222626266226626
        `)
    animation.setAction(mySprite, ActionKind.Idle)
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Monkey.isHittingTile(CollisionDirection.Bottom)) {
        Monkey.vy = -320
    }
})
function 创建锅盖 () {
    mySprite = sprites.create(img`
        11111111111111111111111111111111111111111111111111111111111111111111111111111111
        1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1
        1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1
        1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1
        1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1
        1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1
        1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1
        1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1
        1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1
        1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1
        1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1
        1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1
        1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1
        1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1
        1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1
        11111111111111111111111111111111111111111111111111111111111111111111111111111111
        `, SpriteKind.Cover)
    tiles.placeOnRandomTile(mySprite, assets.tile`myTile15`)
    mySprite.x += 48
    是否创建锅盖 = true
    mySprite.setFlag(SpriteFlag.Invisible, true)
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile13`, function (sprite, location) {
    game.showLongText("恭喜过关~", DialogLayout.Center)
    game.over(true)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Monkey.isHittingTile(CollisionDirection.Bottom)) {
        Monkey.vy = -320
    }
})
function 创建云彩 () {
    mySprite = sprites.create(img`
        ................................................
        ..............fffff.........fffff...............
        .............ff111fff.....fff111ff..............
        .............f111111ff...ff111111ff.............
        ............ff11111111ffff11111111fff...........
        .......ffffff11111111111111111111111fff.........
        ......ff111111111111111111111111111111ffff......
        ......f1111111111111111111111111111111111ffff...
        ......f11111111111111111111111fffffff1111111f...
        ......ff111111ffffff111111111ff11111ff1111111f..
        .....fff11111ff1111fff111111ff11111111f111111f..
        ....ff111111ff1111111ff11111f111111111f111111f..
        ...ff111111ff11111111111111111111111111111111f..
        ...f1111111111111111111111111111111111111111ff..
        ..ff1111111111111111111111111111111111111111f...
        ..f11111111111111111111111111111111111111111f...
        ..f11111111111111111111111111111f11111111111f...
        ..f1111111111111111111111111111ff11111111111ff..
        ..f11111111111111111f111111111ff1111111111111ff.
        ..ff11111111111111111ff111111ff111111111111111f.
        ...ffff111111111111111ffffffff1111111111111111f.
        ......ff1111111111111111111111111111111111111ff.
        ......ff1111111111111111111111111111111111111f..
        ......f1111111111111111111111111111111111111ff..
        .....f11111111111fff111111111111fff1111111ff....
        .....f1111111111ff.ff1111111111ff..ffffffff.....
        .....ff11111111ff....ff1111111ff................
        ......fff1111ff.......f1111111f.................
        ........ffffff.........ff111fff.................
        ........................fffff...................
        ................................................
        ................................................
        `, SpriteKind.Trap)
    tiles.placeOnRandomTile(mySprite, assets.tile`myTile2`)
    mySprite.x += 8
    anim = animation.createAnimation(ActionKind.Idle, 1000)
    animation.attachAnimation(mySprite, anim)
    anim.addAnimationFrame(img`
        ................................................
        ..............fffff.........fffff...............
        .............ff111fff.....fff111ff..............
        .............f111111ff...ff111111ff.............
        ............ff11111111ffff11111111fff...........
        .......ffffff11111111111111111111111fff.........
        ......ff111111111111111111111111111111ffff......
        ......f1111111111111111111111111111111111ffff...
        ......f11111111111111111111111fffffff1111111f...
        ......ff111111ffffff111111111ff11111ff1111111f..
        .....fff11111ff1111fff111111ff11111111f111111f..
        ....ff111111ff1111111ff11111f111111111f111111f..
        ...ff111111ff11111111111111111111111111111111f..
        ...f1111111111111111111111111111111111111111ff..
        ..ff1111111111111111111111111111111111111111f...
        ..f11111111111111111111111111111111111111111f...
        ..f11111111111111111111111111111f11111111111f...
        ..f1111111111111111111111111111ff11111111111ff..
        ..f11111111111111111f111111111ff1111111111111ff.
        ..ff11111111111111111ff111111ff111111111111111f.
        ...ffff111111111111111ffffffff1111111111111111f.
        ......ff1111111111111111111111111111111111111ff.
        ......ff1111111111111111111111111111111111111f..
        ......f1111111111111111111111111111111111111ff..
        .....f11111111111fff111111111111fff1111111ff....
        .....f1111111111ff.ff1111111111ff..ffffffff.....
        .....ff11111111ff....ff1111111ff................
        ......fff1111ff.......f1111111f.................
        ........ffffff.........ff111fff.................
        ........................fffff...................
        ................................................
        ................................................
        `)
    anim = animation.createAnimation(ActionKind.Walking, 1000)
    animation.attachAnimation(mySprite, anim)
    anim.addAnimationFrame(img`
        ................................................
        ..............22222.........22222...............
        .............22111222.....22211122..............
        .............211111122...2211111122.............
        ............2211111111222211111111222...........
        .......22222211111111111111111111111222.........
        ......221111111111111111111111111111112222......
        ......211111111111111111111111111111111112222...
        ......211111111111111111111111111111111111112...
        ......2211111111111111111111111111111111111112..
        .....22211111222222222221111122222222222111112..
        ....221111111211111111111111121111111111111112..
        ...2211111111221111111111111122111111111111112..
        ...2111111111111111111111111111111111111111122..
        ..2211111111111111111111111111111111111111112...
        ..2111111111111111111111111111111111111111112...
        ..2111111111111111111111111111111111111111112...
        ..21111111111111111111111111111111111111111122..
        ..211111111111111111111111111111111111111111122.
        ..221111111111111111111222222221111111111111112.
        ...22221111111111111111111111111111111111111112.
        ......22111111111111111111111111111111111111122.
        ......2211111111111111111111111111111111111112..
        ......2111111111111111111111111111111111111122..
        .....211111111111222111111111111222111111122....
        .....2111111111122.22111111111122..22222222.....
        .....221111111122....22111111122................
        ......222111122.......211111112.................
        ........222222.........22111222.................
        ........................22222...................
        ................................................
        ................................................
        `)
    animation.setAction(mySprite, ActionKind.Idle)
}
function 初始化关卡信息 () {
    是否有存档点 = false
}
function 创建英雄 () {
    Monkey = sprites.create(img`
        . . . . . . . f f f f f . . . . 
        . . . . . . f e e e e e f . . . 
        . . . . . f e e e d d d d f . . 
        . . . . f f e e d f d d f d c . 
        . . . f d d e e d f d d f d c . 
        . . . c d b e e d d d d e e d c 
        . . . c d b e e d d c d d d d c 
        . . . . c f e e e d d c c c c c 
        . . . . . f f e e e d d d d f . 
        . . . . f e e e e f f f f f . . 
        f f . f e e e e e e f f . . . . 
        f e . f e e f e e f e e f . . . 
        f e . f e e e f e e f e e f . . 
        f e f f e f b b f b d f d b f . 
        f f f f e b d d f d d f d d f . 
        . f f f f f f f f f f f f f . . 
        `, SpriteKind.Player)
    Monkey.ay = 980
    controller.moveSprite(Monkey, 80, 0)
    scene.cameraFollowSprite(Monkey)
    Monkey.z = 10
    Monkey.setFlag(SpriteFlag.ShowPhysics, false)
    anim = animation.createAnimation(ActionKind.IdleRight, 1000)
    animation.attachAnimation(Monkey, anim)
    anim.addAnimationFrame(img`
        . . . . . . . f f f f f . . . . 
        . . . . . . f e e e e e f . . . 
        . . . . . f e e e d d d d f . . 
        . . . . f f e e d f d d f d c . 
        . . . f d d e e d f d d f d c . 
        . . . c d b e e d d d d e e d c 
        . . . c d b e e d d c d d d d c 
        . . . . c f e e e d d c c c c c 
        . . . . . f f e e e d d d d f . 
        . . . . f e e e e f f f f f . . 
        f f . f e e e e e e f f . . . . 
        f e . f e e f e e f e e f . . . 
        f e . f e e e f e e f e e f . . 
        f e f f e f b b f b d f d b f . 
        f f f f e b d d f d d f d d f . 
        . f f f f f f f f f f f f f . . 
        `)
    anim = animation.createAnimation(ActionKind.IdleLeft, 1000)
    animation.attachAnimation(Monkey, anim)
    anim.addAnimationFrame(img`
        . . . . f f f f f . . . . . . . 
        . . . f e e e e e f . . . . . . 
        . . f d d d d e e e f . . . . . 
        . c d f d d f d e e f f . . . . 
        . c d f d d f d e e d d f . . . 
        c d e e d d d d e e b d c . . . 
        c d d d d c d d e e b d c . . . 
        c c c c c d d e e e f c . . . . 
        . f d d d d e e e f f . . . . . 
        . . f f f f f e e e e f . . . . 
        . . . . f f e e e e e e f . f f 
        . . . f e e f e e f e e f . e f 
        . . f e e f e e f e e e f . e f 
        . f b d f d b f b b f e f f e f 
        . f d d f d d f d d b e f f f f 
        . . f f f f f f f f f f f f f . 
        `)
    anim = animation.createAnimation(ActionKind.Dead, 1000)
    animation.attachAnimation(Monkey, anim)
    anim.addAnimationFrame(img`
        . f f f f f f f f f f f f f . . 
        f f f f e b d d f d d f d d f . 
        f e f f e f b b f b d f d b f . 
        f e . f e e e f e e f e e f . . 
        f e . f e e f e e f e e f . . . 
        f f . f e e e e e e f f . . . . 
        . . . . f e e e e f f f f f . . 
        . . . . . f f e e e d d d d f . 
        . . . . c f e e e d d c c c c c 
        . . . c d b e e d d c d d d d c 
        . . . c d b e e d d d d e e d c 
        . . . f d d e e d f d d f d c . 
        . . . . f f e e d f d d f d c . 
        . . . . . f e e e d d d d f . . 
        . . . . . . f e e e e e f . . . 
        . . . . . . . f f f f f . . . . 
        `)
    anim = animation.createAnimation(ActionKind.WalkingRight, 100)
    animation.attachAnimation(Monkey, anim)
    anim.addAnimationFrame(img`
        . . . . . . . f f f f f . . . . 
        . . . . . . f e e e e e f . . . 
        . . . . . f e e e d d d d f . . 
        . . . . f f e e d f d d f d c . 
        . . . f d d e e d f d d f d c . 
        . . . c d b e e d d d d e e d c 
        f f . c d b e e d d c d d d d c 
        f e f . c f e e d d d c c c c c 
        f e f . . f f e e d d d d d f . 
        f e f . f e e e e f f f f f . . 
        f e f f e e e e e e e f . . . . 
        . f f e e e e f e f f e f . . . 
        . . f e e e e f e f f e f . . . 
        . . . f e f f b d f b d f . . . 
        . . . f d b b d d c d d f . . . 
        . . . f f f f f f f f f . . . . 
        `)
    anim.addAnimationFrame(img`
        . . . . . . . f f f f f . . . . 
        . . . . . . f e e e e e f . . . 
        . . . . . f e e e d d d d f . . 
        . . . . . f e e d f d d f d c . 
        . . . . f f e e d f d d f d c . 
        . . . f d d e e d d d d e e d c 
        . . . c d b e e d d c d d d d c 
        f f . c d b e e e d d c c c c c 
        f e f . c f f e e e d d d d f . 
        f e f . f e e e e f f f f f f . 
        f e f f e e e e e e e f f f f . 
        . f f e e e e f e f d d f d d f 
        . . f e e e e f e f b d f b d f 
        . . f e f f f f f f f f f f f f 
        . . f d d c f . . . . . . . . . 
        . . f f f f . . . . . . . . . . 
        `)
    anim.addAnimationFrame(img`
        . . . . . . . f f f f f . . . . 
        . . . . . . f e e e e e f . . . 
        . . . . f f e e e d d d d f . . 
        . . . f d d e e d d d d d d c . 
        . . . c d b e e d f d d f d c . 
        f f . c d b e e d f d d f d d c 
        f e f . c f e e d d d d e e d c 
        f e f . . f e e e d c d d d d c 
        f e f . . f f e e e d c c c f . 
        f e f . f e e e e f f f f f . . 
        . f f f e e e e e e e f . . . . 
        . . f e e e e f e e f e f f . . 
        . . f e e e f f f e e f f e f . 
        . f b f f f f f f c d d b d d f 
        . f d d c f . . f d d d c d d f 
        . . f f f . . . f f f f f f f . 
        `)
    anim.addAnimationFrame(img`
        . . . . . . . f f f f f . . . . 
        . . . . f f f e e e e e f . . . 
        . . . f d d e e e e d d d f . . 
        . . . c d b e e e d d d d d c . 
        . . . c d b e e d d d d d d c . 
        . f f . c f e e d f d d f d d c 
        f e f . . f e e d f d d f d d c 
        f e f . . f e e d d d d e e d c 
        f e f . . f f e e d c d d d f . 
        f e f . f e e e e e d f f f . . 
        . f f f e e e e e e e f . . . . 
        . . f f b e e e e e f f . . . . 
        . . f f d d c e e f f e f . . . 
        . . . . f f f c d d b d d f . . 
        . . . . . f f d d d c d d f . . 
        . . . . . . f f f f f f f . . . 
        `)
    anim = animation.createAnimation(ActionKind.WalkingLeft, 100)
    animation.attachAnimation(Monkey, anim)
    anim.addAnimationFrame(img`
        . . . . f f f f f . . . . . . . 
        . . . f e e e e e f . . . . . . 
        . . f d d d d e e e f . . . . . 
        . c d f d d f d e e f f . . . . 
        . c d f d d f d e e d d f . . . 
        c d e e d d d d e e b d c . . . 
        c d d d d c d d e e b d c . f f 
        c c c c c d d d e e f c . f e f 
        . f d d d d d e e f f . . f e f 
        . . f f f f f e e e e f . f e f 
        . . . . f e e e e e e e f f e f 
        . . . f e f f e f e e e e f f . 
        . . . f e f f e f e e e e f . . 
        . . . f d b f d b f f e f . . . 
        . . . f d d c d d b b d f . . . 
        . . . . f f f f f f f f f . . . 
        `)
    anim.addAnimationFrame(img`
        . . . . f f f f f . . . . . . . 
        . . . f e e e e e f . . . . . . 
        . . f d d d d e e e f . . . . . 
        . c d f d d f d e e f . . . . . 
        . c d f d d f d e e f f . . . . 
        c d e e d d d d e e d d f . . . 
        c d d d d c d d e e b d c . . . 
        c c c c c d d e e e b d c . f f 
        . f d d d d e e e f f c . f e f 
        . f f f f f f e e e e f . f e f 
        . f f f f e e e e e e e f f e f 
        f d d f d d f e f e e e e f f . 
        f d b f d b f e f e e e e f . . 
        f f f f f f f f f f f f e f . . 
        . . . . . . . . . f c d d f . . 
        . . . . . . . . . . f f f f . . 
        `)
    anim.addAnimationFrame(img`
        . . . . f f f f f . . . . . . . 
        . . . f e e e e e f . . . . . . 
        . . f d d d d e e e f f . . . . 
        . c d d d d d d e e d d f . . . 
        . c d f d d f d e e b d c . . . 
        c d d f d d f d e e b d c . f f 
        c d e e d d d d e e f c . f e f 
        c d d d d c d e e e f . . f e f 
        . f c c c d e e e f f . . f e f 
        . . f f f f f e e e e f . f e f 
        . . . . f e e e e e e e f f f . 
        . . f f e f e e f e e e e f . . 
        . f e f f e e f f f e e e f . . 
        f d d b d d c f f f f f f b f . 
        f d d c d d d f . . f c d d f . 
        . f f f f f f f . . . f f f . . 
        `)
    anim.addAnimationFrame(img`
        . . . . f f f f f . . . . . . . 
        . . . f e e e e e f f f . . . . 
        . . f d d d e e e e d d f . . . 
        . c d d d d d e e e b d c . . . 
        . c d d d d d d e e b d c . . . 
        c d d f d d f d e e f c . f f . 
        c d d f d d f d e e f . . f e f 
        c d e e d d d d e e f . . f e f 
        . f d d d c d e e f f . . f e f 
        . . f f f d e e e e e f . f e f 
        . . . . f e e e e e e e f f f . 
        . . . . f f e e e e e b f f . . 
        . . . f e f f e e c d d f f . . 
        . . f d d b d d c f f f . . . . 
        . . f d d c d d d f f . . . . . 
        . . . f f f f f f f . . . . . . 
        `)
    anim = animation.createAnimation(ActionKind.JumpRight, 100)
    animation.attachAnimation(Monkey, anim)
    anim.addAnimationFrame(img`
        . . . . . . . f f f f f . . . . 
        . . . . . . f e e e e e f . . . 
        . . . . . f e e e d d d d f . . 
        . . . . . f e e d f d d f d c . 
        . . . . f f e e d f d d f d c . 
        . . . f d d e e d d d d e e d c 
        . . . c d b e e d d c d d d d c 
        f f . c d b e e e d d c c c c c 
        f e f . c f f e e e d d d d f . 
        f e f . f e e e e f f f f f f . 
        f e f f e e e e e e e f f f f . 
        . f f e e e e f e f d d f d d f 
        . . f e e e e f e f b d f b d f 
        . . f e f f f f f f f f f f f f 
        . . f d d c f . . . . . . . . . 
        . . f f f f . . . . . . . . . . 
        `)
    anim = animation.createAnimation(ActionKind.FallingRight, 100)
    animation.attachAnimation(Monkey, anim)
    anim.addAnimationFrame(img`
        . . . . . . . f f f f f . . . . 
        . . . . f f f e e e e e f . . . 
        . . . f d d e e e e d d d f . . 
        . . . c d b e e e d d d d d c . 
        . . . c d b e e d d d d d d c . 
        . f f . c f e e d f d d f d d c 
        f e f . . f e e d f d d f d d c 
        f e f . . f e e d d d d e e d c 
        f e f . . f f e e d c d d d f . 
        f e f . f e e e e e d f f f . . 
        . f f f e e e e e e e f . . . . 
        . . f f b e e e e e f f . . . . 
        . . f f d d c e e f f e f . . . 
        . . . . f f f c d d b d d f . . 
        . . . . . f f d d d c d d f . . 
        . . . . . . f f f f f f f . . . 
        `)
    anim = animation.createAnimation(ActionKind.JumpLeft, 100)
    animation.attachAnimation(Monkey, anim)
    anim.addAnimationFrame(img`
        . . . . f f f f f . . . . . . . 
        . . . f e e e e e f . . . . . . 
        . . f d d d d e e e f . . . . . 
        . c d f d d f d e e f . . . . . 
        . c d f d d f d e e f f . . . . 
        c d e e d d d d e e d d f . . . 
        c d d d d c d d e e b d c . . . 
        c c c c c d d e e e b d c . f f 
        . f d d d d e e e f f c . f e f 
        . f f f f f f e e e e f . f e f 
        . f f f f e e e e e e e f f e f 
        f d d f d d f e f e e e e f f . 
        f d b f d b f e f e e e e f . . 
        f f f f f f f f f f f f e f . . 
        . . . . . . . . . f c d d f . . 
        . . . . . . . . . . f f f f . . 
        `)
    anim = animation.createAnimation(ActionKind.FallingLeft, 100)
    animation.attachAnimation(Monkey, anim)
    anim.addAnimationFrame(img`
        . . . . f f f f f . . . . . . . 
        . . . f e e e e e f f f . . . . 
        . . f d d d e e e e d d f . . . 
        . c d d d d d e e e b d c . . . 
        . c d d d d d d e e b d c . . . 
        c d d f d d f d e e f c . f f . 
        c d d f d d f d e e f . . f e f 
        c d e e d d d d e e f . . f e f 
        . f d d d c d e e f f . . f e f 
        . . f f f d e e e e e f . f e f 
        . . . . f e e e e e e e f f f . 
        . . . . f f e e e e e b f f . . 
        . . . f e f f e e c d d f f . . 
        . . f d d b d d c f f f . . . . 
        . . f d d c d d d f f . . . . . 
        . . . f f f f f f f . . . . . . 
        `)
    anim = animation.createAnimation(ActionKind.CrouchRight, 100)
    animation.attachAnimation(Monkey, anim)
    anim.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . f f f f f . . . . 
        . . . . . . f e e e e e f . . . 
        . . . . . f e e e d d d d f . . 
        . . . . f f e e d d d d d f . . 
        . . . f d d e e d f f d d d c . 
        . . . c d b e e d d d d e e d c 
        . . . c d b e e d d c d d f f c 
        . . . . f e e e f f f e f d d f 
        . . . . f f f f f e e e f d d f 
        . f f . f f e e e e e f f f f f 
        . f e . f f e e e f f e f f f . 
        . f e f f f b b f f e f d b f . 
        . f e f f b d d f e e f d d f . 
        . . f f f f f f f f f f f f f . 
        `)
    anim = animation.createAnimation(ActionKind.CrouchLeft, 100)
    animation.attachAnimation(Monkey, anim)
    anim.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . f f f f f . . . . . . . 
        . . . f e e e e e f . . . . . . 
        . . f d d d d e e e f . . . . . 
        . . f d d d d d e e f f . . . . 
        . c d d d f f d e e d d f . . . 
        c d e e d d d d e e b d c . . . 
        c f f d d c d d e e b d c . . . 
        f d d f e f f f e e e f . . . . 
        f d d f e e e f f f f f . . . . 
        f f f f f e e e e e f f . f f . 
        . f f f e f f e e e f f . e f . 
        . f b d f e f f b b f f f e f . 
        . f d d f e e f d d b f f e f . 
        . f f f f f f f f f f f f f . . 
        `)
}
function 初始化变量 () {
    scene.setBackgroundImage(img`
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        11111111111111111dddd111111111111111111111111111111111111dddd111111111111111111111111111111111111dddd111111111111111111111111111111111111dddd1111111111111111111
        11111111111ddddddddddd11111111111111111111111111111ddddddddddd11111111111111111111111111111ddddddddddd11111111111111111111111111111ddddddddddd111111111111111111
        11111111dddddddddddddd11111111111111111111111111dddddddddddddd11111111111111111111111111dddddddddddddd11111111111111111111111111dddddddddddddd111111111111111111
        111111dddddddddddddddd111111111111111111111111dddddddddddddddd111111111111111111111111dddddddddddddddd111111111111111111111111dddddddddddddddd111111111111111111
        11111ddddddddddddddddd11111111111111111111111ddddddddddddddddd11111111111111111111111ddddddddddddddddd11111111111111111111111ddddddddddddddddd111111111111111111
        11111ddddddddddddddddd11111111111111111111111ddddddddddddddddd11111111111111111111111ddddddddddddddddd11111111111111111111111ddddddddddddddddd111111111111111111
        1111ddddddddddddddddddd111111111111111111111ddddddddddddddddddd111111111111111111111ddddddddddddddddddd111111111111111111111ddddddddddddddddddd11111111111111111
        1111ddddddddddddddddddd111111111111111111111ddddddddddddddddddd111111111111111111111ddddddddddddddddddd111111111111111111111ddddddddddddddddddd11111111111111111
        111dddddddddddddddddddd111111ddd11111111111dddddddddddddddddddd111111ddd11111111111dddddddddddddddddddd111111ddd11111111111dddddddddddddddddddd111111ddd11111111
        111dddddddddddddddddddd11111ddddd1111111111dddddddddddddddddddd11111ddddd1111111111dddddddddddddddddddd11111ddddd1111111111dddddddddddddddddddd11111ddddd1111111
        11ddddddddddddddddddddd11111ddddd111111111ddddddddddddddddddddd11111ddddd111111111ddddddddddddddddddddd11111ddddd111111111ddddddddddddddddddddd11111ddddd1111111
        11ddddddddddddddddddddd11111ddddd111111111ddddddddddddddddddddd11111ddddd111111111ddddddddddddddddddddd11111ddddd111111111ddddddddddddddddddddd11111ddddd1111111
        11ddddddddddddddddddddd11111dddddd11111111ddddddddddddddddddddd11111dddddd11111111ddddddddddddddddddddd11111dddddd11111111ddddddddddddddddddddd11111dddddd111111
        1dddddddddddddddddddddd11111dddddd1111111dddddddddddddddddddddd11111dddddd1111111dddddddddddddddddddddd11111dddddd1111111dddddddddddddddddddddd11111dddddd111111
        1dddddddddddddddddddddd11111dddddd1111111dddddddddddddddddddddd11111dddddd1111111dddddddddddddddddddddd11111dddddd1111111dddddddddddddddddddddd11111dddddd111111
        1dddddddddddddddddddddd1111ddddddd1111111dddddddddddddddddddddd1111ddddddd1111111dddddddddddddddddddddd1111ddddddd1111111dddddddddddddddddddddd1111ddddddd111111
        ddddddddddddddd6ddddddd1111ddddddd1111ddddddddddddddddd6ddddddd1111ddddddd1111ddddddddddddddddd6ddddddd1111ddddddd1111ddddddddddddddddd6ddddddd1111ddddddd1111dd
        dddddddddddddd66ddddddd1111ddddddd11dddddddddddddddddd66ddddddd1111ddddddd11dddddddddddddddddd66ddddddd1111ddddddd11dddddddddddddddddd66ddddddd1111ddddddd11dddd
        dddddddddddddd66ddddddd1111dddddddd1dddddddddddddddddd66ddddddd1111dddddddd1dddddddddddddddddd66ddddddd1111dddddddd1dddddddddddddddddd66ddddddd1111dddddddd1dddd
        ddddddddddddd6666dddddd1111dddddddddddddddddddddddddd6666dddddd1111dddddddddddddddddddddddddd6666dddddd1111dddddddddddddddddddddddddd6666dddddd1111ddddddddddddd
        ddddddddddd66666ddddddddddddddddddddddddddddddddddd66666ddddddddddddddddddddddddddddddddddd66666ddddddddddddddddddddddddddddddddddd66666dddddddddddddddddddddddd
        ddddddddddddd666ddddddddddddddd9999999ddddddddddddddd666ddddddddddddddd9999999ddddddddddddddd666ddddddddddddddd9999999ddddddddddddddd666ddddddddddddddd9999999dd
        dddddddddddd66666dddddddddddd99999999999dddddddddddd66666dddddddddddd99999999999dddddddddddd66666dddddddddddd99999999999dddddddddddd66666dddddddddddd99999999999
        9ddddddddddd6666666ddddddddd9999999999999ddddddddddd6666666ddddddddd9999999999999ddddddddddd6666666ddddddddd9999999999999ddddddddddd6666666ddddddddd999999999999
        999dddddddd666666ddddddddd99999999999999999dddddddd666666ddddddddd99999999999999999dddddddd666666ddddddddd99999999999999999dddddddd666666ddddddddd99999999999999
        9999ddddd666666666ddddddd9999999999999999999ddddd666666666ddddddd9999999999999999999ddddd666666666ddddddd9999999999999999999ddddd666666666ddddddd999999999999999
        99999dddddd66666666ddddd999999999999999999999dddddd66666666ddddd999999999999999999999dddddd66666666ddddd999999999999999999999dddddd66666666ddddd9999999999999999
        999999dd996666666dddddd99999999999999999999999dd996666666dddddd99999999999999999999999dd996666666dddddd99999999999999999999999dd996666666dddddd99999999999999999
        999999999999666666dddd996999999999999999999999999999666666dddd996999999999999999999999999999666666dddd996999999999999999999999999999666666dddd996999999999999999
        9999999999666666666dd99969999999999999999999999999666666666dd99969999999999999999999999999666666666dd99969999999999999999999999999666666666dd9996999999999999999
        9999999996666666666699966999999999999999999999999666666666669996699999999999999999999999966666666666999669999999999999999999999996666666666699966999999999999999
        9999999666666666669999996699999999999999999999966666666666999999669999999999999999999996666666666699999966999999999999999999999666666666669999996699999999999999
        9999999996666666669999966999999999999999999999999666666666999996699999999999999999999999966666666699999669999999999999999999999996666666669999966999999999999999
        9999999996666666999999666699999999999999999999999666666699999966669999999999999999999999966666669999996666999999999999999999999996666666999999666699999999999999
        9999999966966666666996666669999999999999999999996696666666699666666999999999999999999999669666666669966666699999999999999999999966966666666996666669999999999999
        9999999999666666666699966999999999996999999999999966666666669996699999999999699999999999996666666666999669999999999969999999999999666666666699966999999999996999
        9999999966666666666996666669999999996999999999996666666666699666666999999999699999999999666666666669966666699999999969999999999966666666666996666669999999996999
        9996999666666666666966666666999999966699999699966666666666696666666699999996669999969996666666666669666666669999999666999996999666666666666966666666999999966699
        9996699999666666666666666699999999996699999669999966666666666666669999999999669999966999996666666666666666999999999966999996699999666666666666666699999999996699
        9966999966666666666666666666999999966999996699996666666666666666666699999996699999669999666666666666666666669999999669999966999966666666666666666666999999966999
        9996699666666666666666666666699999666699999669966666666666666666666669999966669999966996666666666666666666666999996666999996699666666666666666666666699999666699
        9966666666666666666666666669999999966669996666666666666666666666666999999996666999666666666666666666666666699999999666699966666666666666666666666669999999966669
        9996666666666666666666666666699999666699999666666666666666666666666669999966669999966666666666666666666666666999996666999996666666666666666666666666699999666699
        9996666666666666666666666666669996666669999666666666666666666666666666999666666999966666666666666666666666666699966666699996666666666666666666666666669996666669
        9966666666666666666666666666999999666699996666666666666666666666666699999966669999666666666666666666666666669999996666999966666666666666666666666666999999666699
        9666666666666666666666666666669966666669966666666666666666666666666666996666666996666666666666666666666666666699666666699666666666666666666666666666669966666669
        9966666666666666666666666666666996666666996666666666666666666666666666699666666699666666666666666666666666666669966666669966666666666666666666666666666996666666
        9966666666666666666666666666669966666666996666666666666666666666666666996666666699666666666666666666666666666699666666669966666666666666666666666666669966666666
        6666666666666666666666666666666966666666666666666666666666666666666666696666666666666666666666666666666666666669666666666666666666666666666666666666666966666666
        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
        `)
    effects.clouds.startScreenEffect()
    是否有存档点 = false
    当前关卡 = 1
    关卡总量 = 6
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Monkey.isHittingTile(CollisionDirection.Bottom)) {
        Monkey.vy = -320
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile8`, function (sprite, location) {
    是否有存档点 = true
    tiles.setTileAt(location, assets.tile`transparency16`)
})
function 更新地图 () {
    删除精灵()
    if (当前关卡 == 1) {
        tiles.setTilemap(tilemap`级别1`)
    } else if (当前关卡 == 2) {
    	
    } else if (当前关卡 == 3) {
    	
    }
    初始化地图信息()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Cover, function (sprite, otherSprite) {
    for (let 值14 of 锅盖墙壁数组) {
        tiles.setTileAt(值14, assets.tile`myTile10`)
        tiles.setWallAt(值14, true)
    }
    projectile = sprites.createProjectileFromSide(img`
        ..........fffcc...fffffff.
        ..........fbbbbcffbbbbbbbf
        ...........fbffbbbbb111bbf
        ...........ffbbbbff11111bf
        .........ffcbbbbbff1cccc1f
        ........fcccbcbcbb1c1c1cff
        ccccc..fcccbcbcbbb1333ccf.
        cbbddcfccccbcbcbbb1c333c..
        .ccbddcccccbbbbbbb1c333c..
        ..ccbbccccccbbbbb11c333c..
        ..fccbfccccccbbbb11c133cc.
        ..fccfcbbcccccbbbc11c31cc.
        .fcbbf.cdddddfbbbc111111c.
        .fbbf...cdddfbbdbf1111cc..
        fbbf.....ccfbbdbfffccc....
        fff........fffff..........
        ..........fffcc...fffffff.
        ..........fbbbbcffbbbbbbbf
        ...........fbffbbbbb111bbf
        ...........ffbbbbff11111bf
        .........ffcbbbbbff1cccc1f
        ........fcccbcbcbb1c1c1cff
        ccccc..fcccbcbcbbb1333ccf.
        cbbddcfccccbcbcbbb1c333c..
        .ccbddcccccbbbbbbb1c333c..
        ..ccbbccccccbbbbb11c333c..
        ..fccbfccccccbbbb11c133cc.
        ..fccfcbbcccccbbbc11c31cc.
        .fcbbf.cdddddfbbbc111111c.
        .fbbf...cdddfbbdbf1111cc..
        fbbf.....ccfbbdbfffccc....
        fff........fffff..........
        `, 100, 0)
    projectile.top = otherSprite.bottom
    projectile.setFlag(SpriteFlag.GhostThroughWalls, true)
    projectile.setKind(SpriteKind.Trap)
})
function play_song () {
    music.setVolume(80)
    // C5
    timer.background(function () {
        music.playTone(523, 372)
    })
    // C3
    music.playTone(130, 373)
    // G4
    timer.background(function () {
        music.playTone(391, 372)
    })
    // G3
    music.playTone(195, 373)
    // C5
    timer.background(function () {
        music.playTone(523, 709.5)
    })
    // C3
    music.playTone(130, 710)
    // G3
    music.playTone(195, 317)
    // G4
    music.playTone(391, 335)
    // G#4
    timer.background(function () {
        music.playTone(415, 279)
    })
    // F3
    music.playTone(174, 279)
    // G#4
    music.playTone(415, 92)
    // G#4
    timer.background(function () {
        music.playTone(415, 235.5)
    })
    // C4
    music.playTone(261, 235)
    // A#4
    music.playTone(466, 235)
    // G#4
    music.playTone(415, 210)
    // G4
    timer.background(function () {
        music.playTone(391, 709.5)
    })
    // C3
    music.playTone(130, 710)
    // G3
    music.playTone(195, 317)
    // D#4
    music.playTone(311, 335)
    // F4
    timer.background(function () {
        music.playTone(349, 279)
    })
    // F3
    music.playTone(174, 279)
    // F4
    music.playTone(349, 92)
    // F4
    timer.background(function () {
        music.playTone(349, 235.5)
    })
    // C4
    music.playTone(261, 235)
    // G4
    music.playTone(391, 235)
    // F4
    music.playTone(349, 210)
    // D#4
    timer.background(function () {
        music.playTone(311, 532.5)
    })
    // C3
    music.playTone(130, 532)
    // D4
    music.playTone(293, 148)
    // C4
    timer.background(function () {
        music.playTone(261, 532.5)
    })
    // G3
    music.playTone(195, 532)
    // C#4
    music.playTone(277, 148)
    // D4
    timer.background(function () {
        music.playTone(293, 532.5)
    })
    // D3
    music.playTone(146, 532)
    // D4
    music.playTone(293, 148)
    // D4
    timer.background(function () {
        music.playTone(293, 235.5)
    })
    // G#3
    music.playTone(207, 235)
    // C#4
    music.playTone(277, 235)
    // D4
    music.playTone(293, 210)
    // G4
    timer.background(function () {
        music.playTone(391, 709.5)
    })
    // G2
    music.playTone(97, 710)
    // F3
    music.playTone(174, 673)
    // C5
    timer.background(function () {
        music.playTone(523, 372)
    })
    // C3
    music.playTone(130, 373)
    // G4
    timer.background(function () {
        music.playTone(391, 372)
    })
    // G3
    music.playTone(195, 373)
    // C5
    timer.background(function () {
        music.playTone(523, 709.5)
    })
    // C3
    music.playTone(130, 710)
    // G3
    music.playTone(195, 317)
    // G4
    music.playTone(391, 335)
    // G#4
    timer.background(function () {
        music.playTone(415, 235.5)
    })
    // F3
    music.playTone(174, 235)
    // G4
    music.playTone(391, 235)
    // G#4
    music.playTone(415, 210)
    // A#4
    timer.background(function () {
        music.playTone(466, 532.5)
    })
    // C4
    music.playTone(261, 532)
    // G#4
    music.playTone(415, 92)
    // G4
    timer.background(function () {
        music.playTone(391, 709.5)
    })
    // C3
    music.playTone(130, 710)
    // G3
    music.playTone(195, 317)
    // D#4
    music.playTone(311, 335)
    // F4
    timer.background(function () {
        music.playTone(349, 235.5)
    })
    // C3
    music.playTone(130, 235)
    // G4
    music.playTone(391, 235)
    // G#4
    music.playTone(415, 210)
    // G4
    timer.background(function () {
        music.playTone(391, 532.5)
    })
    // G3
    music.playTone(195, 532)
    // F4
    music.playTone(349, 148)
    // G4
    timer.background(function () {
        music.playTone(391, 235.5)
    })
    // F3
    music.playTone(174, 235)
    // C5
    music.playTone(523, 235)
    // D5
    music.playTone(587, 210)
    // D#5
    timer.background(function () {
        music.playTone(622, 532.5)
    })
    // C4
    music.playTone(261, 532)
    // C5
    music.playTone(523, 148)
    // F#4
    timer.background(function () {
        music.playTone(369, 372)
    })
    // D5
    timer.background(function () {
        music.playTone(587, 372)
    })
    // A3
    music.playTone(220, 373)
    // F4
    timer.background(function () {
        music.playTone(349, 372)
    })
    // G4
    timer.background(function () {
        music.playTone(391, 372)
    })
    // B3
    music.playTone(246, 373)
    // C5
    timer.background(function () {
        music.playTone(523, 709.5)
    })
    // G3
    music.playTone(195, 710)
    // A#4
    music.playTone(466, 532)
    // G#4
    music.playTone(415, 176)
    // G4
    music.playTone(391, 710)
    // G4
    timer.background(function () {
        music.playTone(391, 372)
    })
    // A#3
    music.playTone(233, 373)
    // G#4
    music.playTone(415, 176)
    // A#4
    music.playTone(466, 710)
    // G4
    timer.background(function () {
        music.playTone(391, 372)
    })
    // A#3
    music.playTone(233, 373)
    // D#4
    music.playTone(311, 176)
    // F4
    music.playTone(349, 532)
    // D#4
    music.playTone(311, 176)
    // D4
    timer.background(function () {
        music.playTone(293, 372)
    })
    // A#3
    music.playTone(233, 373)
    // C4
    music.playTone(261, 176)
    // A#3
    timer.background(function () {
        music.playTone(233, 316.5)
    })
    // G#3
    music.playTone(207, 317)
    // A#3
    music.playTone(233, 354)
    // D#4
    music.playTone(311, 710)
    // D#4
    timer.background(function () {
        music.playTone(311, 372)
    })
    // A#3
    music.playTone(233, 373)
    // F4
    music.playTone(349, 176)
    // G4
    music.playTone(391, 710)
    // D#4
    timer.background(function () {
        music.playTone(311, 372)
    })
    // A#3
    music.playTone(233, 373)
    // F4
    timer.background(function () {
        music.playTone(349, 316.5)
    })
    // A#3
    music.playTone(233, 317)
    // F4
    music.playTone(349, 176)
    // G4
    music.playTone(391, 176)
    // F4
    timer.background(function () {
        music.playTone(349, 316.5)
    })
    // A#3
    music.playTone(233, 317)
    // G4
    music.playTone(391, 354)
    // G#4
    music.playTone(415, 710)
    // G#4
    timer.background(function () {
        music.playTone(415, 372)
    })
    // G#3
    music.playTone(207, 373)
    // A#4
    music.playTone(466, 176)
    // G4
    music.playTone(391, 710)
    // D#4
    timer.background(function () {
        music.playTone(311, 372)
    })
    // A#3
    music.playTone(233, 373)
    // F4
    music.playTone(349, 710)
    // G4
    timer.background(function () {
        music.playTone(391, 372)
    })
    // A#3
    music.playTone(233, 373)
    // D#4
    timer.background(function () {
        music.playTone(311, 372)
    })
    // G3
    music.playTone(195, 373)
    // F4
    timer.background(function () {
        music.playTone(349, 316.5)
    })
    // F3
    music.playTone(174, 317)
    // F4
    music.playTone(349, 176)
    // G4
    music.playTone(391, 176)
    // A4
    timer.background(function () {
        music.playTone(440, 709.5)
    })
    // F3
    music.playTone(174, 710)
    // C5
    music.playTone(523, 710)
    // A#4
    timer.background(function () {
        music.playTone(466, 1422)
    })
    // A#3
    music.playTone(233, 1423)
    // G#4
    timer.background(function () {
        music.playTone(415, 184.5)
    })
    // F3
    timer.background(function () {
        music.playTone(174, 184.5)
    })
    // A#3
    music.playTone(233, 185)
    // G4
    timer.background(function () {
        music.playTone(391, 316.5)
    })
    // A#3
    music.playTone(233, 317)
    // G4
    music.playTone(391, 176)
    // G#4
    music.playTone(415, 176)
    // A#4
    music.playTone(466, 710)
    // G4
    timer.background(function () {
        music.playTone(391, 372)
    })
    // G3
    music.playTone(195, 373)
    // F4
    timer.background(function () {
        music.playTone(349, 372)
    })
    // A#3
    music.playTone(233, 373)
    // B3
    music.playTone(246, 373)
    // D#4
    timer.background(function () {
        music.playTone(311, 372)
    })
    // G3
    music.playTone(195, 373)
    // F4
    music.playTone(349, 176)
    // G4
    music.playTone(391, 710)
    // D#4
    timer.background(function () {
        music.playTone(311, 372)
    })
    // G3
    music.playTone(195, 373)
    // D4
    timer.background(function () {
        music.playTone(293, 372)
    })
    // A#3
    music.playTone(233, 373)
    // A#3
    music.playTone(233, 373)
    // C4
    music.playTone(261, 710)
    // C4
    timer.background(function () {
        music.playTone(261, 372)
    })
    // G#3
    music.playTone(207, 373)
    // D4
    music.playTone(293, 176)
    // D#4
    music.playTone(311, 710)
    // G#4
    timer.background(function () {
        music.playTone(415, 372)
    })
    // G#3
    music.playTone(207, 373)
    // G4
    music.playTone(391, 710)
    // F4
    timer.background(function () {
        music.playTone(349, 372)
    })
    // F3
    music.playTone(174, 373)
    // G4
    music.playTone(391, 176)
    // D#4
    timer.background(function () {
        music.playTone(311, 316.5)
    })
    // G3
    music.playTone(195, 317)
    // D#4
    music.playTone(311, 354)
    // G4
    music.playTone(391, 532)
    // D#4
    music.playTone(311, 176)
    // A#3
    timer.background(function () {
        music.playTone(233, 372)
    })
    // F3
    music.playTone(174, 373)
    // G4
    music.playTone(391, 176)
    // F4
    music.playTone(349, 532)
    // D#4
    music.playTone(311, 176)
    // D4
    timer.background(function () {
        music.playTone(293, 372)
    })
    // F3
    music.playTone(174, 373)
    // F4
    music.playTone(349, 176)
    // D#4
    timer.background(function () {
        music.playTone(311, 709.5)
    })
    // A#3
    music.playTone(233, 710)
    // D4
    timer.background(function () {
        music.playTone(293, 1422)
    })
    // A#3
    music.playTone(233, 1423)
}
function 创建指示牌 () {
    是否创建指示牌 = true
    mySprite = sprites.create(img`
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        f111111111111111111111111111111111111111111111111111111111111111111111111111111f
        f111111111111111111111111111111111111111111111111111111111111111111111111111111f
        f111111111111111111111111111111111111111111111111111111111111111111111111111111f
        f111111111111111111111111111111111111111ffff11111111111111ffff11111111111111111f
        f111111111111111111111111111111111111ffffffffff11111111ffffffff1111111111ff1111f
        f1111111111111111111111111111111111fffffffffffff111111fffffffffff1111111ffff111f
        f1111111111115151111111111111111111fffffffffffff1111ffffff1111fff1111111ffff111f
        f11111111111f555ff1111111111111111fff1111111ffff111fffff111111ffff11111fffff111f
        f1111111111f152516f11111111111111fff111111111111111ffff11111111fff11111fffff111f
        f111111111f16666616f1111111111111ff111111111111111ffff111111111fff1111fffff1111f
        f111111111f66ffff61f111111111111ff1111111111111111fff1111111111fff1111fffff1111f
        f111111111f6ffddff6f111111111111ff1111111111111111fff1111111111fff111fffff11111f
        f11111111f6fdfddfdf6f11111111111ff111111111111111fff11111111111fff111ffff111111f
        f11111111f6fd3dd3df6f11111111111ff111111111111111ff111111111111ff111ffff1111111f
        f11111111f66fddddf66f1111111111fff111111111111111ff11111111111fff111ffff1111111f
        f1111111f66f3ffff3f66f111111111fff111111111111111ff11111111111fff11ffff11111111f
        f11111111ffd353353dff1111111111ff111111111111111fff1111111111fff111fff111111111f
        f11111111fddf3553fddf1111111111ff111111111111111fff111111111ffff11fff1111111111f
        f111111111ff333333ff11111111111ff1111111ffffff11fff111111111fff111ff11111111111f
        f111111111f33533533f11111111111ff111111111fffff1fff11111111ffff11fff11111111111f
        f111111111ffffffffff11111111111ff11111111111fff1fff1111111ffff111ff111111111111f
        f11111111111ff11ff1111111111111ff1111111111ffff1fff111111ffff111ff1111111111111f
        f111111111111111111111111111111ffff111111fffff11fff11111ffff1111ff1111111111111f
        f1111111111111111111111111111111ffffffffffffff11fff111fffff11111ff1111111111111f
        f11111111111111111111111111111111fffffffffffff11ffffffffff111111111111111111111f
        f11111111111111111111111111111111111111111ffff1111ffffff111111f1111111111111111f
        f1111111111111111111111111111111111111111111ff111111111111111ffff11111111111111f
        f1111111111111111111111111111111111111111111ff111111111111111ffff11111111111111f
        f111111111111111111111111111111111111111111111111111111111111ffff11111111111111f
        f111111111111111111111111111111111111111111111111111111111111111111111111111111f
        f111111111111111111111111111111111111111111111111111111111111111111111111111111f
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        `, SpriteKind.Trap)
    tiles.placeOnRandomTile(mySprite, assets.tile`myTile`)
    mySprite.x += 64
    mySprite.y += -7
    anim = animation.createAnimation(ActionKind.Idle, 1000)
    animation.attachAnimation(mySprite, anim)
    anim.addAnimationFrame(img`
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        f111111111111111111111111111111111111111111111111111111111111111111111111111111f
        f111111111111111111111111111111111111111111111111111111111111111111111111111111f
        f111111111111111111111111111111111111111111111111111111111111111111111111111111f
        f111111111111111111111111111111111111111ffff11111111111111ffff11111111111111111f
        f111111111111111111111111111111111111ffffffffff11111111ffffffff1111111111ff1111f
        f1111111111111111111111111111111111fffffffffffff111111fffffffffff1111111ffff111f
        f1111111111115151111111111111111111fffffffffffff1111ffffff1111fff1111111ffff111f
        f11111111111f555ff1111111111111111fff1111111ffff111fffff111111ffff11111fffff111f
        f1111111111f152516f11111111111111fff111111111111111ffff11111111fff11111fffff111f
        f111111111f16666616f1111111111111ff111111111111111ffff111111111fff1111fffff1111f
        f111111111f66ffff61f111111111111ff1111111111111111fff1111111111fff1111fffff1111f
        f111111111f6ffddff6f111111111111ff1111111111111111fff1111111111fff111fffff11111f
        f11111111f6fdfddfdf6f11111111111ff111111111111111fff11111111111fff111ffff111111f
        f11111111f6fd3dd3df6f11111111111ff111111111111111ff111111111111ff111ffff1111111f
        f11111111f66fddddf66f1111111111fff111111111111111ff11111111111fff111ffff1111111f
        f1111111f66f3ffff3f66f111111111fff111111111111111ff11111111111fff11ffff11111111f
        f11111111ffd353353dff1111111111ff111111111111111fff1111111111fff111fff111111111f
        f11111111fddf3553fddf1111111111ff111111111111111fff111111111ffff11fff1111111111f
        f111111111ff333333ff11111111111ff1111111ffffff11fff111111111fff111ff11111111111f
        f111111111f33533533f11111111111ff111111111fffff1fff11111111ffff11fff11111111111f
        f111111111ffffffffff11111111111ff11111111111fff1fff1111111ffff111ff111111111111f
        f11111111111ff11ff1111111111111ff1111111111ffff1fff111111ffff111ff1111111111111f
        f111111111111111111111111111111ffff111111fffff11fff11111ffff1111ff1111111111111f
        f1111111111111111111111111111111ffffffffffffff11fff111fffff11111ff1111111111111f
        f11111111111111111111111111111111fffffffffffff11ffffffffff111111111111111111111f
        f11111111111111111111111111111111111111111ffff1111ffffff111111f1111111111111111f
        f1111111111111111111111111111111111111111111ff111111111111111ffff11111111111111f
        f1111111111111111111111111111111111111111111ff111111111111111ffff11111111111111f
        f111111111111111111111111111111111111111111111111111111111111ffff11111111111111f
        f111111111111111111111111111111111111111111111111111111111111111111111111111111f
        f111111111111111111111111111111111111111111111111111111111111111111111111111111f
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        `)
    anim = animation.createAnimation(ActionKind.Walking, 1000)
    animation.attachAnimation(mySprite, anim)
    anim.addAnimationFrame(img`
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        f111111111111111111111111111111111111111111111111111111111111111111111111111111f
        f111111111111111111111111111111111111111111111111111111111111111111111111111111f
        f111111111111111111111111111111111111111111111111111111111111111111111111111111f
        f111111111111111111111111111111111111111ffff11111111111111ffff11111111111111111f
        f111111111111111111111111111111111111ffffffffff11111111ffffffff1111111111ff1111f
        f1111111111111111111111111111111111fffffffffffff111111fffffffffff1111111ffff111f
        f1111111111115151111111111111111111fffffffffffff1111ffffff1111fff1111111ffff111f
        f11111111111f555ff1111111111111111fff1111111ffff111fffff111111ffff11111fffff111f
        f1111111111f152516f11111111111111fff111111111111111ffff11111111fff11111fffff111f
        f111111111f16666616f1111111111111ff111111111111111ffff111111111fff1111fffff1111f
        f111111111f66ffff61f111111111111ff1111111111111111fff1111111111fff1111fffff1111f
        f111111111f6ffddff6f111111111111ff1111111111111111fff1111111111fff111fffff11111f
        f11111111f6fdfddfdf6f11111111111ff111111111111111fff11111111111fff111ffff111111f
        f11111111f6fd3dd3df6f11111111111ff111111111111111ff111111111111ff111ffff1111111f
        f11111111f66fddddf66f1111111111fff111111111111111ff11111111111fff111ffff1111111f
        f1111111f66f3ffff3f66f111111111fff111111111111111ff11111111111fff11ffff11111111f
        f11111111ffd353353dff1111111111ff111111111111111fff1111111111fff111fff111111111f
        f11111111fddf3553fddf1111111111ff111111111111111fff111111111ffff11fff1111111111f
        f111111111ff333333ff11111111111ff1111111ffffff11fff111111111fff111ff11111111111f
        f111111111f33533533f11111111111ff111111111fffff1fff11111111ffff11fff11111111111f
        f111111111ffffffffff11111111111ff11111111111fff1fff1111111ffff111ff111111111111f
        f11111111111ff11ff1111111111111ff1111111111ffff1fff111111ffff111ff1111111111111f
        f111111111111111111111111111111ffff111111fffff11fff11111ffff1111ff1111111111111f
        f1111111111111111111111111111111ffffffffffffff11fff111fffff11111ff1111111111111f
        f11111111111111111111111111111111fffffffffffff11ffffffffff111111111111111111111f
        f11111111111111111111111111111111111111111ffff1111ffffff111111f1111111111111111f
        f1111111111111111111111111111111111111111111ff111111111111111ffff11111111111111f
        f1111111111111111111111111111111111111111111ff111111111111111ffff11111111111111f
        f111111111111111111111111111111111111111111111111111111111111ffff11111111111111f
        f111111111111111111111111111111111111111111111111111111111111111111111111111111f
        f111111111111111111111111111111111111111111111111111111111111111111111111111111f
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        f1111fff1111fff1111fff1111f1111111f1111f1111ff11111f111111f11111ff1111ff1111ff1f
        ff11ff.f111ff.f111ff.f111fff11111fff11ff111fff1111fff1111fff111fff1111ff111fff1f
        .f11f..ff1ff..ff11f..ff11f..f11ff..f1ffff11f.ff11ff.ff11ff.ff1ff.ff11ff.f1ff.fff
        .ffff...f1f....f1f....f1ff..ffff...f1f..f1f...ffff...ff1f...f1f...ffff..fff..ff.
        ..ff....ff.....ff.....fff...ff.....ff...fff....ff.....ff....ff.....ff....ff..ff.
        `)
    animation.setAction(mySprite, ActionKind.Idle)
    for (let 值15 of 指示牌背后的墙壁) {
        tiles.setWallAt(值15, true)
    }
}
function 创建栅栏 () {
    mySprite = sprites.create(img`
        fff..........................................................................fff
        f11ff......................................................................ff11f
        f1111ff..................................................................ff1111f
        f111111ff..............................................................ff111111f
        f1111ff..................................................................ff1111f
        f11ff......................................................................ff11f
        fff..........................................................................fff
        f11ff......................................................................ff11f
        f1111ff..................................................................ff1111f
        f111111ff..............................................................ff111111f
        f1111ff..................................................................ff1111f
        f11ff......................................................................ff11f
        fff..........................................................................fff
        f11ff......................................................................ff11f
        f1111ff..................................................................ff1111f
        f111111ff..............................................................ff111111f
        f1111ff..................................................................ff1111f
        f11ff......................................................................ff11f
        fff..........................................................................fff
        f11ff......................................................................ff11f
        f1111ff..................................................................ff1111f
        f111111ff..............................................................ff111111f
        f1111ff..................................................................ff1111f
        f11ff......................................................................ff11f
        fff..........................................................................fff
        f11ff......................................................................ff11f
        f1111ff..................................................................ff1111f
        f111111ff..............................................................ff111111f
        f1111ff..................................................................ff1111f
        f11ff......................................................................ff11f
        fff..........................................................................fff
        f11ff......................................................................ff11f
        f1111ff..................................................................ff1111f
        f111111ff..............................................................ff111111f
        f1111ff..................................................................ff1111f
        f11ff......................................................................ff11f
        fff..........................................................................fff
        f11ff......................................................................ff11f
        f1111ff..................................................................ff1111f
        f111111ff..............................................................ff111111f
        f1111ff..................................................................ff1111f
        f11ff......................................................................ff11f
        fff..........................................................................fff
        f11ff......................................................................ff11f
        f1111ff..................................................................ff1111f
        f111111ff..............................................................ff111111f
        f1111ff..................................................................ff1111f
        f11ff......................................................................ff11f
        `, SpriteKind.Trap)
    tiles.placeOnRandomTile(mySprite, assets.tile`myTile6`)
    mySprite.y += -16
}
function 删除精灵 () {
    for (let 值16 of sprites.allOfKind(SpriteKind.Trap)) {
        值16.destroy()
    }
    for (let 值17 of sprites.allOfKind(SpriteKind.Cover)) {
        值17.destroy()
    }
    for (let 值18 of sprites.allOfKind(SpriteKind.Brick)) {
        值18.destroy()
    }
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile14`, function (sprite, location) {
    tiles.setTileAt(location, assets.tile`transparency16`)
})
let 猴子面向左吗 = false
let projectile: Sprite = null
let 关卡总量 = 0
let 当前关卡 = 0
let anim: animation.Animation = null
let mySprite: Sprite = null
let 是否有存档点 = false
let 锅盖墙壁数组: tiles.Location[] = []
let 指示牌背后的墙壁: tiles.Location[] = []
let 是否创建锅盖 = false
let 是否创建指示牌 = false
let Monkey: Sprite = null
let 猴子是否活着 = false
初始化变量()
创建英雄()
更新地图()
game.showLongText("你能拯救公主吗？", DialogLayout.Center)
game.onUpdate(function () {
    if (猴子是否活着) {
        if (Monkey.vx < 0) {
            猴子面向左吗 = true
        } else if (Monkey.vx > 0) {
            猴子面向左吗 = false
        }
    }
    if (controller.down.isPressed()) {
        if (猴子面向左吗) {
            animation.setAction(Monkey, ActionKind.CrouchLeft)
        } else {
            animation.setAction(Monkey, ActionKind.CrouchRight)
        }
    } else if (Monkey.vy < 0 && !(Monkey.isHittingTile(CollisionDirection.Bottom))) {
        if (猴子面向左吗) {
            animation.setAction(Monkey, ActionKind.JumpLeft)
        } else {
            animation.setAction(Monkey, ActionKind.JumpRight)
        }
    } else if (Monkey.vy > 0 && !(Monkey.isHittingTile(CollisionDirection.Bottom))) {
        if (猴子面向左吗) {
            animation.setAction(Monkey, ActionKind.FallingLeft)
        } else {
            animation.setAction(Monkey, ActionKind.FallingRight)
        }
    } else if (Monkey.vx < 0) {
        animation.setAction(Monkey, ActionKind.WalkingLeft)
    } else if (Monkey.vx > 0) {
        animation.setAction(Monkey, ActionKind.WalkingRight)
    } else {
        if (猴子面向左吗) {
            animation.setAction(Monkey, ActionKind.IdleLeft)
        } else {
            animation.setAction(Monkey, ActionKind.IdleRight)
        }
    }
})
game.onUpdate(function () {
    if (!(猴子是否活着) && Monkey.isHittingTile(CollisionDirection.Bottom)) {
        game.showLongText("猴骑士挂了~", DialogLayout.Top)
        更新地图()
    }
    if (猴子是否活着 && Monkey.y > 160) {
        animation.setAction(Monkey, ActionKind.Dead)
        猴子是否活着 = false
    }
})
forever(function () {
    play_song()
})
