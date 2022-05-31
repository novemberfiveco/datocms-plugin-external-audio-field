# External Audio Field • [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE.txt)

A DatoCMS plugin that allows content editors to easily embed [Soundcloud](https://soundcloud.com/), [Mixcloud](https://www.mixcloud.com/) and [Spotify](https://www.spotify.com/nl/) tracks and playlists.

Via the [oEmbed](https://oembed.com/) standard we'll fetch the embed and meta data for the track. All the information you select is available via the [Content Delivery Api](https://www.datocms.com/docs/content-delivery-api).

Created By [November Five](https://www.novemberfive.co/)

## Installation

Install the plugin by following the DatoCMS guide: [Installing Marketplace Plugins](https://www.datocms.com/docs/general-concepts/plugins#installing-marketplace-plugins).

After installation no configuration is required!

## Usage

This is a JSON field extension. So you can use by adding a JSON field:

1. On the model/block you want to add the field to click `New field`
2. In the popup modal select the `JSON` button.
3. Give it a sensible name
4. Select the tab `Presentation`
5. In the field editor dropdown select: `External Audio Field`

In the record field you just copy paste and audio url from one of the supported providers (Soundcloud, Mixcloud, Spotify) and configure it the way you want. Each provider has some different players/options which you can select.

You should end up with something like this:

![External Audio Field result](docs/preview.png)

Do you know some other options that I forgot? Check the [Contributing](CONTRIBUTING.md) guide on how to make suggestion for improvements of this plugin! Or you can make a PR if you want.

## Contributing

- **Reporting a bug**: [Open an issue](/issues/new?assignees=&labels=bug&template=--bug_report.md&title=) explaining your application's setup and the bug you're encountering.

- **Suggesting an improvement**: [Open an issue](https://github.com/novemberfiveco/datocms-plugin-external-audio-field/issues/new?assignees=&labels=&template=---bug-report.md&title=) explaining your improvement or feature so we can discuss and learn more.

- **Submitting code changes**: For small fixes, feel free to [open a pull request](https://github.com/novemberfiveco/datocms-plugin-external-audio-field/pulls) with a description of your changes. For large changes, please first [open an issue](https://github.com/novemberfiveco/datocms-plugin-external-audio-field/issues/new?assignees=&labels=&template=---bug-report.md&title=) so we can discuss if and how the changes should be implemented.

For more information check the [CONTRIBUTING.md](CONTRIBUTING.md) document.

## License

Copyright (c) [November Five BVBA](https://novemberfive.co). All rights reserved.

Licensed under the [MIT](LICENSE.txt) License.
