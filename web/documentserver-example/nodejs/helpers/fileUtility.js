/**
 *
 * (c) Copyright Ascensio System SIA 2020
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

var configServer = require('config').get('server');
var siteUrl = configServer.get('siteUrl');
var tempStorageUrl = siteUrl + configServer.get('tempStorageUrl');

var fileUtility = {};

/** get file name from the given url */
fileUtility.getFileName = function (url, withoutExtension) {
    if (!url) return "";

    var filename;

    if (tempStorageUrl && url.indexOf(tempStorageUrl) == 0) {  /** if the temporary storage url exists and the link begins with it */
        var params = getUrlParams(url);
        filename = params == null ? null : params["filename"];  /** if the url parameters exist, we get file name from this parameters */
    } else {
        var parts = url.toLowerCase().split("/");
        fileName = parts.pop();  /** otherwise, get the file name from the last part of the url */
    }

    /** get file name without extension */
    if (withoutExtension) {
        var ext = fileUtility.getFileExtension(fileName);
        return fileName.replace(ext, "");
    }

    return fileName;
};

/** get file extension from the given url */
fileUtility.getFileExtension = function (url, withoutDot) {
    if (!url) return null;

    var fileName = fileUtility.getFileName(url);  /** get file name from the given url */

    var parts = fileName.toLowerCase().split(".");

    return withoutDot ? parts.pop() : "." + parts.pop();  /** get the extension from the file name with or without dot */
};

/** get file type from the given url */
fileUtility.getFileType = function (url) {
    var ext = fileUtility.getFileExtension(url);  /** get the file extension from the given url */

    if (fileUtility.documentExts.indexOf(ext) != -1) return fileUtility.fileType.text;  /** text type for document extensions */
    if (fileUtility.spreadsheetExts.indexOf(ext) != -1) return fileUtility.fileType.spreadsheet; /** spreadsheet type for spreadsheet extensions */
    if (fileUtility.presentationExts.indexOf(ext) != -1) return fileUtility.fileType.presentation;  /** presentation type for presentation extensions */

    return fileUtility.fileType.text;  /** the default file type is text */
}

fileUtility.fileType = {
    text: "text",
    spreadsheet: "spreadsheet",
    presentation: "presentation"
}

/** the document extension list */
fileUtility.documentExts = [".doc", ".docx", ".docm", ".dot", ".dotx", ".dotm", ".odt", ".fodt", ".ott", ".rtf", ".txt", ".html", ".htm", ".mht", ".pdf", ".djvu", ".fb2", ".epub", ".xps"];

/** the spreadsheet extension list */
fileUtility.spreadsheetExts = [".xls", ".xlsx", ".xlsm", ".xlt", ".xltx", ".xltm", ".ods", ".fods", ".ots", ".csv"];

/** the presentation extension list */
fileUtility.presentationExts = [".pps", ".ppsx", ".ppsm", ".ppt", ".pptx", ".pptm", ".pot", ".potx", ".potm", ".odp", ".fodp", ".otp"];

/** get url parameters */
function getUrlParams(url) {
    try {
        var query = url.split("?").pop();  /** take all the parameters which are placed after ? sign in the file url */
        var params = query.split("&");  /** parameters are separated by & sign */
        var map = {};  /** write parameters and their values to the map dictionary */
        for (var i = 0; i < params.length; i++) {
            var parts = param.split("=");
            map[parts[0]] = parts[1];
        }
        return map;
    }
    catch (ex) {
        return null;
    }
}

/** save all the functions to the fileUtility module to export it later in other files */
module.exports = fileUtility;
