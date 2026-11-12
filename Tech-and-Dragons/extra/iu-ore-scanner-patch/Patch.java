import org.objectweb.asm.*;
import org.objectweb.asm.tree.*;
import java.nio.file.*;
public class Patch {
  public static void main(String[] a) throws Exception {
    byte[] in = Files.readAllBytes(Paths.get(a[0]));
    ClassNode cn = new ClassNode(); new ClassReader(in).accept(cn, 0);
    int n = 0; int rr = 0;
    for (MethodNode m : cn.methods) {
      if (!m.name.equals("getDataChunk")) continue;
      for (AbstractInsnNode i = m.instructions.getFirst(); i != null; i = i.getNext()) {
        if (i.getOpcode() == Opcodes.ICONST_0 && i.getNext() instanceof VarInsnNode && i.getNext().getOpcode() == Opcodes.ISTORE && ((VarInsnNode) i.getNext()).var == 4) {
          InsnList rep = new InsnList();
          rep.add(new VarInsnNode(Opcodes.ALOAD, 0));
          rep.add(new MethodInsnNode(Opcodes.INVOKEINTERFACE, "net/minecraft/world/level/LevelHeightAccessor", "m_141937_", "()I", true));
          m.instructions.insertBefore(i, rep);
          AbstractInsnNode old = i; i = i.getPrevious(); m.instructions.remove(old);
          n++;
        }
        if (i instanceof MethodInsnNode && ((MethodInsnNode) i).name.equals("replace") && ((MethodInsnNode) i).owner.equals("java/util/Map")) {
          MethodInsnNode r = new MethodInsnNode(Opcodes.INVOKESTATIC, "com/denfop/items/TdOreColors", "replace", "(Ljava/util/Map;Ljava/lang/Object;Ljava/lang/Object;)Ljava/lang/Object;", false);
          m.instructions.set(i, r); i = r; rr++;
        }
      }
    }
    int k = 0;
    for (MethodNode m : cn.methods) {
      if (!m.name.equals("computeOreColor")) continue;
      for (AbstractInsnNode i = m.instructions.getFirst(); i != null; i = i.getNext()) {
        if (i.getOpcode() == Opcodes.ICONST_M1 && i.getNext() != null && i.getNext().getOpcode() == Opcodes.IRETURN) {
          InsnList rep = new InsnList();
          rep.add(new VarInsnNode(Opcodes.ALOAD, 0));
          rep.add(new MethodInsnNode(Opcodes.INVOKESTATIC, "com/denfop/items/TdOreColors", "color", "(Lnet/minecraft/world/level/block/state/BlockState;)I", false));
          m.instructions.insertBefore(i, rep);
          AbstractInsnNode old = i; i = i.getPrevious(); m.instructions.remove(old);
          k++;
        }
      }
    }
    if (n != 1 || k != 1 || rr != 1) throw new RuntimeException("patched " + n + " " + k + " " + rr);
    ClassWriter cw = new ClassWriter(ClassWriter.COMPUTE_MAXS);
    cn.accept(cw);
    Files.write(Paths.get(a[1]), cw.toByteArray());
    System.out.println("patched ok");
  }
}
