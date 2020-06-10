sh make.sh
rm -rf ~/.local/share/kwin/scripts/cimon-tiler*
plasmapkg2 --type kwinscript -i cimon-tiler-v*.kwinscript
qdbus org.kde.KWin /KWin reconfigure
mkdir -p ~/.local/share/kservices5
cp ~/.local/share/kwin/scripts/cimon-tiler/metadata.desktop ~/.local/share/kservices5/kwin-script-cimon-tiler.desktop
kwin_x11 --replace >/dev/null 2>&1 &
