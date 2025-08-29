// Replace with your details
const FULL_NAME = 'Hemanth_Sankar'; // lowercase, underscores
const DOB = '14082004'; // ddmmyyyy
const EMAIL = 'sankar.22bce20295@vitapstudent.ac.in';
const ROLL_NUMBER = '22BCE20295';

function isNumber(str) {
  return /^-?\d+$/.test(str);
}

function isAlpha(str) {
  return /^[a-zA-Z]+$/.test(str);
}

function isSpecial(str) {
  return !isNumber(str) && !isAlpha(str);
}

function alternatingCaps(str) {
  let res = '';
  let upper = true;
  for (let i = str.length - 1; i >= 0; i--) {
    let ch = str[i];
    if (/[a-zA-Z]/.test(ch)) {
      res += upper ? ch.toUpperCase() : ch.toLowerCase();
      upper = !upper;
    }
  }
  return res;
}

export default function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const data = req.body.data || [];
    let even_numbers = [], odd_numbers = [], alphabets = [], special_characters = [], sum = 0, alpha_concat = '';
    
    data.forEach(item => {
      if (isNumber(item)) {
        let num = parseInt(item, 10);
        if (num % 2 === 0) {
          even_numbers.push(item);
        } else {
          odd_numbers.push(item);
        }
        sum += num;
      } else if (isAlpha(item)) {
        alphabets.push(item.toUpperCase());
        alpha_concat += item;
      } else if (isSpecial(item)) {
        special_characters.push(item);
      }
    });
    
    const concat_string = alternatingCaps(alpha_concat);
    
    res.status(200).json({
      is_success: true,
      user_id: `${FULL_NAME}_${DOB}`,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: sum.toString(),
      concat_string
    });
  } catch (e) {
    res.status(200).json({
      is_success: false,
      user_id: `${FULL_NAME}_${DOB}`
    });
  }
}
