// 原地交换函数，而非用临时数组
function swap(arr, a, b) {
  [arr[a], arr[b]]=[arr[b], arr[a]];
}

function quick(arr, left, right) {
  let index;
  if (arr.length > 1) {
    index=partition(arr, left, right);
    if (left < index-1) {
      quick(arr, left, index-1);
    }
    if (index < right) {
      quick(arr, index, right);
    }
  }
  return arr;
}

function quickSort(arr) {
  return quick(arr, 0, arr.length-1);
}

// 划分操作函数
function partition(arr, left, right) {
  // 用index取中间值而非splice
  const pivot=arr[Math.floor((left+right)/2)];
  let i=left;
  let j=right;

  while(i <= j) {
    while(compare(arr[i], pivot) === -1) {
      i++;
    }
    while(compare(arr[j], pivot) === 1) {
      j--;
    }
    if (i <= j) {
      swap(arr, i, j);
      i++;
      j--;
    }
  }
  return i;
}

function compare(a, b) {
  if (a === b) {
    return 0;
  }
  return a < b ? -1 : 1;
}

let arr=[3, 8, 0, 1, 4, 6, 5, 2, 7, 9];
console.log(quickSort(arr));
