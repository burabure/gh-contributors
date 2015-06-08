import R from 'ramda';

const oauthParams = 'client_id=939bf47a930e482c8807&client_secret=d51c9b7155f228d8a8f0443776af55ec413a3a68';

/*
 * get :: String -> [Object]
 */
export function get(query) {
  return _getPromise(`//api.github.com/${query}?per_page=100&${oauthParams}`)
    .then( r => {
      if (r.getResponseHeader('Link')) {
        const linkHeader            = parseLinkHeader(r.getResponseHeader('Link'));
        const lastPage              = parseInt(linkHeader.last.replace(/.*page=(\d)/, '$1'), 10);
        const pagingUri             = linkHeader.last.replace(/(.*page=)\d/, '$1');
        const pageNumbersArray      = R.range(1, lastPage + 1);
        const pageNumbersToPromises = R.map( n => _getPromise(`${pagingUri}${n}`) );

        return Promise.all(pageNumbersToPromises(pageNumbersArray));
      } else {
        return [r];
      }
    })
    .then( rs => R.chain( x => JSON.parse(x.response), rs) )
    .catch( err => {
      console.log(`Error getting //api.github.com/${query}`, err);
      return false;
    });
}

/*
 * getUsersProfiles :: [String] -> [Object]
 */
export function getUsersProfiles(userNames) {
  const userNamesToPromises = R.map( u => _getPromise(`//api.github.com/users/${u}?${oauthParams}`) );

  return Promise.all(userNamesToPromises(userNames))
    .then( rs => R.chain( x => JSON.parse(x.response), rs) )
    .catch( err => console.log('Error getting //api.github.com/users/...', err) );
}

/*
 * parseLinkHeader :: String -> Object
 */
export function parseLinkHeader(header) {
  if (header.length === 0) {
    throw new Error("input must not be of zero length");
  }

  const parts = header.split(',');

  const objectify = function(acc, value) {
    const section = value.split(';');
    if (section.length !== 2) {
      throw new Error("section could not be split on ';'");
    }
    const url = section[0].replace(/<(.*)>/, '$1').trim();
    const name = section[1].replace(/rel="(.*)"/, '$1').trim();
    acc[name] = url;
    return acc;
  };

  return R.reduceIndexed(objectify, {}, parts);
}


/*********/
/* UTILS */
/*********/

function _getPromise(url) {
  return new Promise(function(resolve, reject) {
    var req = new XMLHttpRequest();
    req.open('GET', url);
    req.onload = function() {
      if (req.status === 200) {
        resolve(req);
      }
      else {
        reject([Error(req.statusText), req]);
      }
    };
    req.onerror = function() {
      reject(Error("Network Error"));
    };
    req.send();
  });
}
