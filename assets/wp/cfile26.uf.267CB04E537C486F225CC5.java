package test;

import java.io.BufferedOutputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.PrintStream;
import java.io.UnsupportedEncodingException;
import java.nio.charset.Charset;
import java.util.SortedMap;


/**
 * 가능한 문자 모두 찍어보기.
 *
 */
public class EncodingTest3 {
	
	private static final String[] koreanCharsets = new String[]{
		"EUC-KR",
		"x-IBM949",
		"x-IBM949C",
		"x-windows-949",
	};
	
	public static void main(String[] args) {
		SortedMap<String, Charset> allCharsets = Charset.availableCharsets();
		
		for (String encoding : koreanCharsets) {
			System.out.println(encoding + " processing...");
			PrintStream ps;
			try {
				ps = new PrintStream(new BufferedOutputStream(new FileOutputStream(encoding+".txt")), true, "utf-8");
				ps.print('\ufeff'); // BOM

				Charset cs = allCharsets.get(encoding);
				
				int nHangul = 0;
				for (int c = 32; c <= 0xffff ; c++) {
					String s = ""+(char)c;
					byte[] bb = cs.encode(s).array();
					if (bb.length == 2 && bb[0] == 0x3F && bb[1] == 0x0) {
						continue;
					}
					ps.println(s + "(" + Integer.toHexString(c) +") ");
					if (c >= '가' && c <= '힣') {
						nHangul++;
					}
				}
				System.out.println("nHangul=" + nHangul);
				ps.close();
			} catch (UnsupportedEncodingException e) {
				e.printStackTrace();
			} catch (FileNotFoundException e) {
				e.printStackTrace();
			}
		}
	}
	
	private static final String HEX_TABLE="0123456789ABCDEF";
	
	private static String getBytesString(byte[] bytes) {
		StringBuffer sb = new StringBuffer("");

		for (int i=0; i<bytes.length; i++) {
			sb.append(getHexForByte(bytes[i]));
		}
	
		
		return sb.toString();
	}
	
	private static String getHexForByte(byte b) {
		return ""+HEX_TABLE.charAt((b >> 4) & 0x0F) +HEX_TABLE.charAt(b & 0x0f);
	}

}
