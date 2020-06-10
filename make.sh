if [ ! -d "build" ] 
then
    mkdir build
fi
rm -rf build/*
zip -r build/cimon-tiler-v$(cat metadata.desktop | grep X-KDE-PluginInfo-Version= | awk -F'=' '{print $2}').kwinscript * -x "build/*"
